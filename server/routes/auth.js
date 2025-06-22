const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json("User registered");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!user || !isMatch) return res.status(401).json("Invalid credentials");

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
    res.json({token,user: {_id: user._id,username: user.username,isAdmin: user.isAdmin}
});

  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
