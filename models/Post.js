const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// create fields/columns for Post model
Post.init(
  {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      post_url: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isUrl: true
          }
      },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'user',
              key: 'id'
          }
      },
      category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'category',
            key: 'id'
          }
      }
  },
  {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
  }
);

  
  module.exports = Post;
  