const express = require('express');
const router = express.Router();
const Food = require('../models/FoodItem'); // Adjust the path to your Food model
const User = require('../models/User');
// Route to add a new food item
router.post('/AddFoodItem', async (req, res) => {
    const { email, categoryName, name, img, description, fullPlateCost, halfPlateCost } = req.body;
  
    try {
      // Validate the user's email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid user email" });
      }
  
      // Check if the user is an admin
      if (user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized access" });
      }
  
      const newFoodItem = new Food({
        categoryName,
        name,
        img,
        description,
        options: [
          { size: 'full', price: fullPlateCost },
          { size: 'half', price: halfPlateCost }
        ]
      });
  
      const savedFoodItem = await newFoodItem.save();
      res.status(201).json(savedFoodItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;