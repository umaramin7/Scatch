const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedin');
const productModel = require('../models/productmodel');
const userModel = require('../models/usermodel');
const router = express.Router();



router.get('/', (req, res,next) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('index', { error , success,loggedin : false});

});
router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    let success = req.flash('success');
    res.render("shop", { products , success }); // <-- variable ka naam 'products' hi ho
  } catch (err) {
    console.log("Error loading shop:", err);
    res.send("Something went wrong while loading shop page");
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user= await userModel.findOne({email : req.user.email}).populate('cart');
  
  res.render('cart',{user, products: user.cart});
});
router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  let user= await userModel.findOne({email : req.user.email})
  user.cart.push(req.params.id);
  await user.save();
  req.flash('success', 'Product added to cart successfully');
  res.redirect('/shop');
});


module.exports = router;