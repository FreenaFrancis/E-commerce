const express=require('express')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const {createProductController, getProductController, getSingleController, productPhotoController, deleteProductController, updateProductController, productFilterController, productCountController, productListController, seacrhProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController} = require('../Controllers/productController')
const router=express.Router()
const formidable=require('express-formidable')

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

// get product

router.get('/get-product',getProductController)

// single product

router.get('/get-product/:slug',getSingleController)

// get photo
// router.get('/product-photo/:pid',productPhotoController)
router.get('/product-photo/:pid', productPhotoController);

// delet product

router.delete('/delete-product/:pid',deleteProductController)

// update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

// filter produtc

router.post('/product-filters',productFilterController)

// product count
router.get('/product-count',productCountController)

// product per page

router.get('/product-list/:page',productListController)
// seacrh product

router.get('/search/:keyword',seacrhProductController)
// similar product
router.get('/related-product/:pid/:cid',relatedProductController)

// category wise product

router.get('/product-category/:slug',productCategoryController)


// payments
// token
router.get('/braintree/token',braintreeTokenController)

// payments
router.post('/braintree/payment',requireSignIn, brainTreePaymentController)

// payments
module.exports=router