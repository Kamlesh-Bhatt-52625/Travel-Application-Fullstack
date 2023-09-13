const authController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
authController.post("/register", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(404).json({ msg: "Email has been already registered" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hashedPassword });
    await user.save();

    const { password, ...others } = user;
    const token = createToken(user);

    return res.status(201).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Create Token Function
const createToken = (user) => {
  const payload = {
    id: user._id.toString(),
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

module.exports = authController;
