const express = 'express';

const router = require('express').Router();

const Users = require('./userDb')
const Posts = require('../posts/postDb')


router.post('/', (req, res) => {
    const userInfo = req.body
    Users.insert(userInfo)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: 'Posts could not be retrieved.'})
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const { id } = req.params
    const body = req.body
    console.log(req.body.text)
    Posts.insert({text: body.text, user_id: id})

        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: 'Cannot add post, sorry.'})
        })
});

router.get('/', (req, res) => {
    Users.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: 'The users could not be retrieved.'})
        })
});

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params
    Users.getById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: 'specific user could not be found' })
        })
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params
        Users.getUserPosts(id)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(error => {
                res.status(500)
            })
    
});

router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params
    Users.remove(id)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: 'User could not be deleted. '})
        })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const { id } = req.params
    const changes = req.body
    Users.update(id, changes)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: 'User could not be updated. '})
        })
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params
    Users.getById(id) 
        .then(user => {
            req.user = user
            next()
        })
        .catch(error => {
            res.status(400).json({ error: 'error'})
        })
        
};

function validateUser(req, res, next) {
    const body = req.body
    if (!body) {
        res.status(400).json({ message: 'missing user data.'})
    }
    if (!body.name) {
        res.status(400).json({ message: 'missing required name field'})
    } 
    else {
        next()
    }
};

function validatePost(req, res, next) {
    const body = req.body
    if (!body) {
        res.status(400).json({ message: 'missing post data.'})
    } 
    if (!body.text) {
        res.status(400).json({ message: 'missing required text field.'})
    }
    else {
        next()
    }
};

module.exports = router;
