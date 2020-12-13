// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

router.get('/api/projects', async (req, res, next) => {
    try {
        const data = await Projects.get();
        res.status(200).json(data);
    }
    catch(err) {
        next(err);
    }
})

router.get('/api/projects/:id', async (req, res, next) => {
    try {
        const data = await Projects.get(req.params.id);
        res.status(200).json(data);
    }
    catch(err) {
        next(err);
    }
})

router.get('/api/projects/:id/actions', async(req, res, next) => {
    try {
        const data = await Projects.getProjectActions(req.params.id);
        res.status(200).json(data);
    }
    catch(err) {
        next(err);
    }
})

router.post('/api/projects', (req, res) => {
    if(!req.body.description || !req.body.name) {
        res.status(400).json({
            message: 'We need a description and name',
        })
    }
    Projects.insert({
        description: req.body.description,
        name: req.body.name
    })
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.put('/api/projects/:id', (req, res) => {
    if(!req.body.description || !req.body.name) {
        res.status(400).json({
            message: 'We need a description and name',
        })
    }

    Projects.update(req.params.id, {
        description: req.body.description,
        name: req.body.name
    })
        .then(post => res.status(200).json(post))
        .catch(err => res.status(400).json(err))

})

router.delete('/api/projects/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(() => res.status(200).json({message: 'gone now'}))
        .catch(err => res.status(500).json(err))
})

module.exports = router;