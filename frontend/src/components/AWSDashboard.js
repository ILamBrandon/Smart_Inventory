import React, { useState } from 'react';
import axios from 'axios';

function AWSDashboard() {
  // S3 Upload state
  const [file, setFile] = useState(null);
  const [s3Status, setS3Status] = useState('');

  // SQS state
  const [sqsMessage, setSqsMessage] = useState('');
  const [sqsStatus, setSqsStatus] = useState('');

  // Lambda state
  const [lambdaResponse, setLambdaResponse] = useState('');

  // CloudWatch state
  const [cloudWatchMetrics, setCloudWatchMetrics] = useState(null);

  // --- S3 Upload Handler ---
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:5001/api/aws/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setS3Status(`Upload successful: ${res.data.fileUrl}`);
    } catch (err) {
      console.error(err);
      setS3Status('Upload failed.');
    }
  };

  // --- SQS Handler ---
  const handleSqsSend = async () => {
    if (!sqsMessage) return;
    try {
      const res = await axios.post('http://localhost:5001/api/aws/sqs', { message: sqsMessage });
      setSqsStatus(`SQS message sent successfully (ID: ${res.data.MessageId})`);
    } catch (error) {
      console.error(error);
      setSqsStatus('Error sending SQS message.');
    }
  };

  // --- Lambda Handler ---
  const handleLambdaTrigger = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/aws/lambda/trigger', {});
      setLambdaResponse(`Lambda response: ${res.data.result}`);
    } catch (error) {
      console.error(error);
      setLambdaResponse('Error triggering Lambda.');
    }
  };

  // --- CloudWatch Handler ---
  const fetchCloudWatchMetrics = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/aws/cloudwatch/metrics');
      setCloudWatchMetrics(res.data.data);
    } catch (error) {
      console.error(error);
      setCloudWatchMetrics('Error fetching CloudWatch metrics.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>AWS Integration Dashboard</h2>
      
      <section style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h3>S3 File Upload</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
        {s3Status && <p>{s3Status}</p>}
      </section>

      <section style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h3>SQS Test Message</h3>
        <input
          type="text"
          placeholder="Enter SQS message"
          value={sqsMessage}
          onChange={(e) => setSqsMessage(e.target.value)}
        />
        <button onClick={handleSqsSend}>Send SQS Message</button>
        {sqsStatus && <p>{sqsStatus}</p>}
      </section>

      <section style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h3>Lambda Trigger Test</h3>
        <button onClick={handleLambdaTrigger}>Trigger Lambda Function</button>
        {lambdaResponse && <p>{lambdaResponse}</p>}
      </section>

      <section style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h3>CloudWatch Metrics</h3>
        <button onClick={fetchCloudWatchMetrics}>Fetch Metrics</button>
        {cloudWatchMetrics && (
          <pre style={{ textAlign: 'left', background: '#f4f4f4', padding: '1rem' }}>
            {typeof cloudWatchMetrics === 'string'
              ? cloudWatchMetrics
              : JSON.stringify(cloudWatchMetrics, null, 2)}
          </pre>
        )}
      </section>
    </div>
  );
}

export default AWSDashboard;
