// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const Category = require('./Category');
// 

// create association user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
  });
  
  // a post can only have one user 
  Post.belongsTo(User, {
    foreignKey: 'user_id'
  });

//models associations for Comment 
Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });

   //models associations for Comment 
   Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });

  Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });

  User.hasMany(Comment, {
    foreignKey: 'user_id'
  });

  Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });

//category 
Category.hasMany(Post, {
    foreignKey: 'post_id'
}); 

Post.belongsTo(Category, {
    foreignKey: 'category_id'
});


// export all models 
module.exports = { User, Post, Comment, Category };