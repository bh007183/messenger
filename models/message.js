
module.exports = function (sequelize, DataTypes) {
    const Message = sequelize.define('Message', {
      // Model attributes are defined here
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      participants: {
        type: DataTypes.STRING
      },
      author: {
        type: DataTypes.STRING
      }
     
    }, {
      // Other model options go here
    });
    Message.associate = function(models){
      Message.belongsTo(models.Conversation)
    }
    return Message
    
    }