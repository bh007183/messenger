module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
      
      firstandlast:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      
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
        // User.hasMany(models.Conversation)
        User.belongsToMany(models.Conversation, {through: "Join", constraints: false})
        
      };
    return User
    }