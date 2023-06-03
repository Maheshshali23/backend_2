module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define(
    'Blog',
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Blogs',
    }
  );

  // Define associations or additional methods for the Blog model if needed

  return Blog;
};
