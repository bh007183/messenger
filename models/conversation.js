
module.exports = function (sequelize, DataTypes) {
    const Conversation = sequelize.define('Conversation', {
      // Model attributes are defined here
     
    
      
      participants: {
        type: DataTypes.STRING
      },
      
     
    }, {
      // Other model options go here
    });
    Conversation.associate = function(models){
        Conversation.belongsToMany(models.User, {through: "Join", constraints: false})
        Conversation.hasMany(models.Message)


    }
    return Conversation
    
    }