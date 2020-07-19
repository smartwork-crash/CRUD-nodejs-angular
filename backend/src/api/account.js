const express = require('express');
const router = express.Router();
const BaseRepository = require('../db/BaseRepository');
const dbQuery = new BaseRepository('accounts');


router.get('/list', async (req, res, next) => {
    try {

        let result = await dbQuery.list()
        result.toArray((err, result) => {
            if (err) res.sendStatus(500).send(err);;
            res.send(result);

        })
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let result = await dbQuery.findById(id);
        res.send(result);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }

});

router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        let result = await dbQuery.add(req.body)
        res.send(result);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let result = await dbQuery.edit(id,req.body);
        res.send(result);
    }
    catch(err){
        res.sendStatus(500).send(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await dbQuery.delete(id);
        res.send(result);
    }
    catch(err) {
        res.sendStatus(500).send(err);
    }
});

module.exports = router;