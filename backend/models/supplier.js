module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
      name: { type: DataTypes.STRING, allowNull: false },
      contact: DataTypes.STRING,
      email: DataTypes.STRING,
    });
    return Supplier;
  };
  