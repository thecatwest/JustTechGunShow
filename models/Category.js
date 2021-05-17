// // upper
// // lower
// // cardio
// // recovery
// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");

// class Category extends Model {}

// Category.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     category_description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1],
//       },
//     },
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "category",
//   }
// );

// module.exports = Category;
