// backend/models/notification.js
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
      message: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false }, // e.g. "low_stock", "order_delay"
      isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
    return Notification;
  };
  