// routes/account.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { isLoggedIn } = require('../middlewares/isLoggedin');
const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const productModel = require('../models/productmodel');


// view account page
router.get('/', isLoggedIn, accountController.getAccountPage);

// update profile (name, username, age, email) -- simple example
router.post('/update', isLoggedIn, accountController.updateProfile);

// change password (optional) - expects { currentPassword, newPassword }
router.post('/change-password', isLoggedIn, accountController.changePassword);

// delete account
router.post('/delete', isLoggedIn, accountController.deleteAccount);

// logout (clear cookie)
router.get('/logout', accountController.logout);

module.exports = router;
