const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownermodel');

router.get('/admin', async (req, res) => {
    let success =req.flash("success");
    res.render("createproducts.ejs", {success});
});


    router.post("/create", async (req,res)=>{
        let owners = await ownerModel.find();
    if(owners.length > 0) {
        return res
        .status(500)
        .send("you have no permission to create new owner");
    }
    
    let {fullname, email, password} = req.body;
    let createdOwner=await ownerModel.create({
        fullname,
        email,
        password,
    });
    res.status(201).send("we can create new owner now");
    });

module.exports = router;