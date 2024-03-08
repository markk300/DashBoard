const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill required filds");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be 6 or more characters");
  }

  //Check if email of user already exists in db
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has alredy been registered");
  }

  
 //Create a user
  const user = await User.create({
    name,
    email,
    password
  });
  
  //Generate token 
  const token = generateToken(user._id)

  //Send cookie
  res.cookie("token",token, {
    path:"/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1 day
    sameSite: "none",
    secure:true
  })

  if (user) {
    const { _id, name, password, email, photo, phone, bio, } = user;
    res.status(201).json({
      _id,
      name,
      email,
      password,
      photo,
      phone,
      bio,
      token
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
};
