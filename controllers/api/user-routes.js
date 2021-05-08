const router = require('express').Router();
const {User, Post, Comment} = require('../../models/User');
const { use } = require('../home-routes');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                // whatever attributes from post model
            },
            {
                model: Comment,
                //attributes from comment mdoel
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No user found'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    User.create({
        // needed attributes based on model
    })
    .then(userData => {
        req.session.save(() => {
            // save attributes to session

            res.json(userData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;