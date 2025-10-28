const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/");
        } else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "User registered successfully");
          return res.redirect("/");
        }
      });
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
};


module.exports.loginUser=async function(req,res){
    
        try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "User does not exist");
      return res.redirect("/");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
    let token = generateToken(user);
    res.cookie("token", token);
    req.flash("success", "User logged in successfully");
    return res.redirect("/shop"); // ✅ yahi correct route hai
  } else {
    req.flash("error", "Invalid credentials");
    return res.redirect("/");
  }
    });
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
    
    
};
module.exports.logout=function(req,res){
    res.cookie('token','');
    res.redirect('/');
};