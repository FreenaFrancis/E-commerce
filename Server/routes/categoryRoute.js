const express=require('express')
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware')
const { createCategoryController, updateCategoryController, categoryController, singleCtaegoryController, singleCategoryController, deletecategoryController } = require('../Controllers/categoryController')
const router=express.Router()

// routes

router.post("/create-category",requireSignIn,isAdmin,createCategoryController )

// update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController )

// get category

router.get('/get-category',categoryController)

// single category

router.get('/single-category/:slug',singleCategoryController)

// delete category

router.delete('/delete-category/:id',requireSignIn,isAdmin,deletecategoryController)

module.exports=router