import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password must be up to 6 characters"],
    maxLength: [30, "Password must not be more than 30 characters"],
  },
  photo: {
    type: String,
    required: [false, "Please provide a Image"],
    default:'https://1.ibb.co/4pDNDk1/avatar.png'
  },
  phone: {
    type: Number,
    default:'+387'
  },
  bio: {
    type: String,
    maxLength:[250, "Password must not be more than 250 characters"],
    default:'About me'
  },
},{
    timestamps:true
});

const User = mongoose.model("User", userSchema);
module.exports = User;
