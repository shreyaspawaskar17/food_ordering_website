const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const jwtSecret = "mynameisshreyasthisismernprojectoffodd"
router.post("/createuser", [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'incorrect password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, location } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      password: secPassword,
      email: email,
      location: location,
      address: null // Address is now set from location field
    });

    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

  router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let email = req.body.email;
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }
  
      const pwdCompare = await bcrypt.compare(req.body.password, userdata.password);
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }
  
      const data = {
        user: {
          id: userdata.id
        }
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });
  
  router.get('/userRole', async (req, res) => {
    try {
      const userEmail = req.query.email;
  
      if (!userEmail) {
        return res.status(400).json({ error: 'Email address is required' });
      }
  
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ role: user.role });
    } catch (error) {
      console.error('Error fetching user role:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.post("/checkout", async (req, res) => {
    const { userId, address } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.address.push(address);
      await user.save();
  
      res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
      console.error("Error adding address:", error);
      res.status(500).json({ success: false, message: "Failed to add address" });
    }
  });
module.exports = router;