const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
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
      //maxLength: [25, "Password must not be more than 25 characters"],
    },
    photo: {
      type: String,
      required: [false, "Please provide a Image"],
      default: "https://1.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: Number,
      default: "+387",
    },
    bio: {
      type: String,
      maxLength: [250, "Password must not be more than 250 characters"],
      default: "About me",
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt password before saving in db

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    return next
  }
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
