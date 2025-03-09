module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, defaultValue: 'pending' }
    });
    return Order;
  };
  