const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
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
        const newMenuItem = new MenuItem(data);
        const res = await newMenuItem.save();
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.put('/:name', async (req, res) => {
    try {
        const getName = req.params.name;

    
        console.log("Parameters received:", req.params);

        // Find the menu item by name
        const menuItem = await MenuItem.findOne({ name: getName });

        // If not found, send a 404 response
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Update the menu item with the new data
        const updatedItem = await MenuItem.findByIdAndUpdate(menuItem._id, req.body, { new: true });

        // Send the updated item as response
        res.status(200).json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete('/:name', async (req, res) => {
    try {
        const getName = req.params.name;
        const menuItem = await MenuItem.findOne({ name: getName });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await MenuItem.deleteOne({ name: getName });
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router