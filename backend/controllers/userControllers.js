const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//Register user
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
    password,
  });

  //Call token
  const token = generateToken(user._id);

  //Send cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, password, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      password,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Login user
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  //Validate user

  if (!password || !email) {
    res.status(400);
    throw new Error("Please provide email and password");
  }
  //Check if user exists in db
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  //Check password
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);

  //Send cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1 day
    sameSite: "none",
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { _id, name, password, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      password,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//Logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), //Make token expire
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out " });
});

//Get user data

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//Get login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
};
