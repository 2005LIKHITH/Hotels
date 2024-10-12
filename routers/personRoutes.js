const express = require('express');
const router = express.Router();

const Person = require('../models/Person');

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log("Data Fetched")
        res.status(200).json(data);
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"})
    }
})
router.post('/', async (req, res) => {
    try{
        const data = await req.body;
        const newPerson = new Person(data);
        const res = await newPerson.save();

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = router