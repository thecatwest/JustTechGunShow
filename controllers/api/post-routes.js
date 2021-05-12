const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
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
    .then( postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        //get attributes from post
        attributes: ['id', 'title', 'contents', 'created_at'],
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
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create post
router.post('/', withAuth, (req, res) => {
    Post.create({
                title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id,
        category_id: req.body.category_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a post based off its id
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            contents: req.body.contents
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a post by id
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;