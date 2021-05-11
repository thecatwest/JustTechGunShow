const router = require('express').Router();
const {User, Post, Comment} = require('../models');

router.get ('/', (req, res) => {
    Post.findAll({
        where: {    // use the ID from the session
            user_id: req.session.user_id
        },
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
          // call homepage handlebars template and send post data
          res.render('dashboard',  {
            posts,
            loggedIn: true
          } );
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'contents', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        const post = postData.get({plain: true});
        res.render('edit-post', {post, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;