module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
      
      username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      connections: {
        type: DataTypes.STRING,
        defaultValue: "[]"
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    
    },

    isOnline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    
    }
    
    }, {
      // Other model options go here
    });
    User.associate = function(models) {
        User.hasMany(models.Conversation)
      };
    return User
    }