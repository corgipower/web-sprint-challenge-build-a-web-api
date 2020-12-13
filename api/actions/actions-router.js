// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

router.get('/api/actions', async (req, res, next) => {
    try {
        const data = await Actions.get();
        res.status(200).json(data);
    }
    catch(err) {
        next(err);
    }
})

router.get('/api/actions/:id', async (req, res, next) => {
    try {
        const data = await Actions.get(req.params.id);
        res.status(200).json(data);
    }
    catch(err) {
        next(err);
    }
})

router.post('/api/actions', (req, res) => {
    if(!req.body.description || !req.body.notes) {
        res.status(400).json({
            message: 'We need a description and notes',
        })
    }
    Actions.insert({
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes
    })
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.put('/api/actions/:id', (req, res) => {
    if(!req.body.description || !req.body.notes) {
        res.status(400).json({
            message: 'We need a description and notes',
        })
    }

    Actions.update(req.params.id, {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes
    })
        .then(post => res.status(200).json(post))
        .catch(err => res.status(400).json(err))

})

router.delete('/api/actions/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(() => res.status(200).json({message: 'gone now'}))
        .catch(err => res.status(500).json(err))
})
module.exports = router;