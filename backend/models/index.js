// backend/models/index.js (updated)
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Existing models
db.Product = require('./product')(sequelize, Sequelize);
db.Supplier = require('./supplier')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);

// New models
db.User = require('./user')(sequelize, Sequelize);
db.Warehouse = require('./warehouse')(sequelize, Sequelize);
db.Notification = require('./notification')(sequelize, Sequelize);

// Define associations
db.Product.belongsToMany(db.Supplier, { through: 'ProductSuppliers' });
db.Supplier.belongsToMany(db.Product, { through: 'ProductSuppliers' });

db.Product.hasMany(db.Order, { foreignKey: 'productId' });
db.Order.belongsTo(db.Product, { foreignKey: 'productId' });

db.Supplier.hasMany(db.Order, { foreignKey: 'supplierId' });
db.Order.belongsTo(db.Supplier, { foreignKey: 'supplierId' });

// Example: associate products with a warehouse
db.Warehouse.hasMany(db.Product, { foreignKey: 'warehouseId' });
db.Product.belongsTo(db.Warehouse, { foreignKey: 'warehouseId' });

module.exports = db;
