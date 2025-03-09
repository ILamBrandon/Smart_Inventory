module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT,
      quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      reorderThreshold: { type: DataTypes.INTEGER, defaultValue: 10 },
    });
    return Product;
  };
  