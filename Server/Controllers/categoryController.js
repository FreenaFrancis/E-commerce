const categoryModel=require('../models/CategoryModel')
const slugify=require('slugify')
const createCategoryController=async(req,res)=>{
    try{
const {name}=req.body
if(!name){
    return res.status(401).send({message:"Name is requires"})
}
const existingCategory=await categoryModel.findOne({name})
if(existingCategory){
    return res.status(200).send({
       success:true,
       message:"Category ALready exisyt"
    })
}

const category=await new categoryModel({name, slug:slugify(name)}).save()
res.status(201).send({
    success:true,
    message:"new category created",
    category
})
    }catch(err){
console.log(err);
res.status(500).send({
    success:false,
    err,
    message:"Error in category"
})
    }
}


// update category

const updateCategoryController=async (req,res)=>{
try{
const {name} = req.body
const {id}=req.params
    const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    res.status(200).send({
        success:true,
        message:"new category created",
        category
    }) 

}catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"Error in updating category"
    })
}
}

// get all category

const categoryController=async(req,res)=>{

    try{

        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"all categoy",
            category
        }) 
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in getting  category"
        })
    }
}

// single category 

const singleCategoryController=async(req,res)=>{
try{
// const {id}=req.params
const category=await categoryModel.findOne({slug:req.params.slug})
res.status(200).send({
    success:true,
    message:"get single category successfully",
    category
}) 
}
catch(error){
    console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in getting  category"
        })  
}
}

// delete category

const deletecategoryController=async(req,res)=>{
try{
const {id}=req.params
const category=await categoryModel.findByIdAndDelete(id)
res.status(200).send({
    success:true,
    message:" deletedcategory successfully",
    category
}) 
}catch(error){
    console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in deleting  category"
        })  
}
}

module.exports={createCategoryController,updateCategoryController,categoryController,singleCategoryController,deletecategoryController}