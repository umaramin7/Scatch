// controllers/accountController.js
const userModel = require('../models/usermodel');
const productModel = require('../models/productmodel');
const bcrypt = require('bcrypt');

module.exports.getAccountPage = async (req, res) => {
  try {
    // req.user should already be populated by isLoggedIn middleware
    const user = await userModel.findById(req.user._id);
 // populate posts if you have them
    // pass flash messages too if you use connect-flash
    const error = req.flash ? req.flash('error') : [];
    const success = req.flash ? req.flash('success') : [];
    res.render('account', { user, error, success });
  } catch (err) {
    console.error('Account page error:', err);
    if (req.flash) req.flash('error','Something went wrong');
    return res.redirect('/');
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { name, username, age, email } = req.body;
    // Basic validation can be added
    const user = await userModel.findById(req.user._id);
    if (!user) {
      if (req.flash) req.flash('error','User not found');
      return res.redirect('/account');
    }
    user.name = name || user.name;
    user.username = username || user.username;
    user.age = age ? Number(age) : user.age;
    // if email update, you might want to check uniqueness
    if (email && email !== user.email) {
      const exists = await userModel.findOne({ email });
      if (exists) {
        if (req.flash) req.flash('error','Email already in use');
        return res.redirect('/account');
      }
      user.email = email;
    }
    await user.save();
    if (req.flash) req.flash('success','Profile updated');
    res.redirect('/account');
  } catch (err) {
    console.error('updateProfile error:', err);
    if (req.flash) req.flash('error', err.message || 'Could not update profile');
    res.redirect('/account');
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      if (req.flash) req.flash('error','Please provide both current and new password');
      return res.redirect('/account');
    }
    const user = await userModel.findById(req.user._id);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      if (req.flash) req.flash('error','Current password is incorrect');
      return res.redirect('/account');
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    if (req.flash) req.flash('success','Password changed successfully');
    res.redirect('/account');
  } catch (err) {
    console.error('changePassword error:', err);
    if (req.flash) req.flash('error', 'Could not change password');
    res.redirect('/account');
  }
};

module.exports.deleteAccount = async (req, res) => {
  try {
    // optional: require password confirmation
    await userModel.findByIdAndDelete(req.user._id);
    // clear cookie / session
    res.clearCookie('token');
    if (req.flash) req.flash('success','Account deleted');
    res.redirect('/');
  } catch (err) {
    console.error('deleteAccount error:', err);
    if (req.flash) req.flash('error','Could not delete account');
    res.redirect('/account');
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('token');
  if (req.flash) req.flash('success','Logged out');
  res.redirect('/');
};
