const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    //get attributes from posts
    attributes: ['id', 'title', 'contents', 'created_at'],
    //order posts by newest created
    order: [['created_at', 'DESC']],
    // including associated models
    include: [
      {   // comments associated with the post
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //user that created the comment
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {   // user that created the post
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postData => {
      // map out all posts and serialize them to be formatted
      const posts = postData.map(post => post.get({ plain: true }));
      // call homepage handlebard template and send post data
      res.render('homepage',  {
        posts,
        loggedIn: req.session.loggedIn
      } );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  } // call login template from handlebars
  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    //get attributes from post
    attributes: ['id', 'title', 'contents', 'created_at'],
    //order posts by newest created
    order: [['created_at', 'DESC']],
    // including associated models
    include: [
      {   // comments associated with the post
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //user that created the comment
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {   // user that created the post
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // serialize post data
      const post = postData.get({ plain: true });
      // call single-post template from handlebars
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;