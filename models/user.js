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
        validate: { isEmail: true },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    
    },
    image:{
      type: DataTypes.STRING, 

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
        User.belongsToMany(models.Conversation, {through: "Join", constraints: true, onDelete: 'cascade', hooks: true})
        User.belongsToMany(User, {as: "Friends", through: "JoinFriend", constraints: true, onDelete: 'cascade', hooks: true })
        
      };
    return User
    }