const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// Configure AWS using environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// ---------- S3 Setup ----------
const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      // Create a unique filename using a timestamp
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Endpoint to upload a file to S3
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    message: 'File uploaded successfully',
    fileUrl: req.file.location,
  });
});

// ---------- SQS Setup ----------
const sqs = new AWS.SQS();

router.post('/sqs', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: message,
  };

  try {
    const data = await sqs.sendMessage(params).promise();
    res.json({ message: 'SQS message sent successfully', MessageId: data.MessageId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- Lambda Setup ----------
const lambda = new AWS.Lambda();

router.post('/lambda/trigger', async (req, res) => {
  const params = {
    FunctionName: process.env.LAMBDA_FUNCTION_NAME, // Lambda function name or ARN
    InvocationType: 'RequestResponse', // Synchronous invocation
    Payload: JSON.stringify(req.body || {}), // Optional: pass the request body as payload
  };

  try {
    const data = await lambda.invoke(params).promise();
    // The response payload is returned as a string
    res.json({ message: 'Lambda function invoked successfully', result: data.Payload });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------- CloudWatch Setup ----------
const cloudwatch = new AWS.CloudWatch();

router.get('/cloudwatch/metrics', async (req, res) => {
  // Example: fetch custom metric "LowStockCount" from namespace "SmartInventoryMetrics"
  const params = {
    StartTime: new Date(new Date() - 60 * 60 * 1000), // 1 hour ago
    EndTime: new Date(),
    MetricName: 'LowStockCount',
    Namespace: 'SmartInventoryMetrics',
    Period: 60,
    Statistics: ['Average'],
  };

  try {
    const data = await cloudwatch.getMetricStatistics(params).promise();
    res.json({ message: 'CloudWatch metrics fetched successfully', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
