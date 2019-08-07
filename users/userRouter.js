const express = 'express';

const router = require('express').Router();

const Users = require('./userDb')
const Posts = require('../posts/postDb')


router.post('/users', (req, res) => {
    const userInfo = req.body
    Users.insert(userInfo)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ error: 'Posts could not be retrieved.'})
        })
});

router.post('/:id/posts', (req, res) => {

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

router.get('/:id', (req, res) => {
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
    const {id} = req.params
    Posts.get(id)
    
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(error => {
                    res.status(500).json({ error: 'Could not find post.'})
                })
       
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Users.remove(id)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: 'User could not be deleted. '})
        })
});

router.put('/:id', (req, res) => {
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

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
