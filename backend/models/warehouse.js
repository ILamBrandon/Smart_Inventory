// backend/models/warehouse.js
module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define('Warehouse', {
      name: { type: DataTypes.STRING, allowNull: false },
      location: DataTypes.STRING
    });
    return Warehouse;
  };
  