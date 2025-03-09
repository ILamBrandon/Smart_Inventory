// backend/models/user.js
const bcrypt = require('bcrypt'); // new dependency (add bcrypt to package.json)
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        // In production, store hashed passwords. 
        // Use bcrypt.hash() before saving.
      },
      role: { type: DataTypes.STRING, defaultValue: 'employee' } // admin, manager, employee
    });

    // Hook to hash password before saving
    User.beforeCreate(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    });
    
    return User;
};
