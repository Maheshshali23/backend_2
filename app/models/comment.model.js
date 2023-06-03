module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
      "Comment",
      {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: "Comments",
      }
    );
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Blog, { foreignKey: 'blogId' });
    };
  
    return Comment;
  };
  