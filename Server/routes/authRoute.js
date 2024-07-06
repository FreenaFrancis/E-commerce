const express=require('express')
const mongoose = require('mongoose');
const { registerController, loginController, testController, forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderstatusController } = require('../Controllers/authControllers')
const {requireSignIn, isAdmin} =require('../middleware/authMiddleware');
// const { braintreeTokenController } = require('../Controllers/productController');
const router=express.Router()

// routing
// register

router.post('/register',registerController)

// login post
router.post('/login',loginController)

// test routes
router.get('/test', requireSignIn,isAdmin, testController)
// forget pasword


router.post('/forget-password',forgetPasswordController)
// protected route -user
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true}) 
})

// protected route -admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true}) 
})

// update profile
router.put('/update-profile',requireSignIn,updateProfileController)

// get orders

router.get("/orders",requireSignIn,getOrdersController)

// all orders

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// orderstatusupdate
router.put("/order-status/:orderId", requireSignIn, isAdmin,orderstatusController)

module.exports = router;


