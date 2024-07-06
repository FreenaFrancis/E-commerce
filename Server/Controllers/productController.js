const { default: slugify } = require('slugify')
const productModel=require('../models/productModel')
const fs=require('fs')
const router = require('../routes/authRoute')
const categoryModel=require('../models/CategoryModel')
const orderModel=require('../models/OrderModel')
const braintree = require('braintree');
const dotenv=require('dotenv')
dotenv.config()

// // payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "j2by2x47fpq4f8hn",
//   publicKey: "6cdf4py5hjtwb5jq",
//   privateKey: "95d9a1894ba4d3012bf9632b9c4473c1 ",
// });


// const createProductController=async(req,res)=>{
// try{
// const {name,slug,description,price,category,quantity,shipping}=req.fields
// const {photo}=req.files
// // validation
// switch(true){
//     case !name:
//         return res.status(500).send({error:"Name is required"})
//         case !slug:
//             return res.status(500).send({error:"Slug is required"})
//             case !name:
//                 return res.status(500).send({error:"Name is required"})
//                 case !description:
//                     return res.status(500).send({error:"description is required"})
//                     case !price:
//                         return res.status(500).send({error:"price is required"})
//                         case !category:
//                             return res.status(500).send({error:"category is required"})
//                             case !shipping:
//                                 return res.status(500).send({error:"shipping is required"})
//                                 case !quantity:
//                                     return res.status(500).send({error:"quantity is required"})
//                                     case !photo && photo.size > 1000000:
//                                         return res.status(500).send({error:"photo is required and size should be less than 1mb"})
// }

// const product=await new productModel({...req.fields,slug:slugify(name)})
// if(photo){
//     product.photo.data=fs.readFileSync(photo.path)
//     product.photo.contentType=photo.type
// }
// await product.save()
// res.status(201).send({
//     success:true,
//     message:"product created successfully",
//     product
// })

// }catch(error){
//     console.log(error);
//     res.status(500).send({
//         success:false,
//         error,
//         message:"error in creating product"
//     })
//  }
// }


const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};


// get product

const getProductController=async(req,res)=>{
try{
const products=await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
res.status(200).send({
   
        success:true,
        message:"product all products",
        products,
        countTotal:products.length,
})
}catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in getting product"
    }) 
}
}

// get single product

const getSingleController=async(req,res)=>{
try{
const product=await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
res.status(200).send({
   
    success:true,
    message:"get single products",
    product,
   
})
}catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in getting product"
    }) 
}
}

// getphoto

// const productPhotoController=async(req,res)=>{
// try{
// const product = await productModel.findById(req.params.pid).select('photo')
// if(product.photo.data){
//     res.set('Content-type',product.photo.contentType)
//     return res.status(200).send(product.photo.data)
   
// }
// }catch(error){
//     console.log(error);
//     res.status(500).send({
//         success:false,
//         error,
//         message:"error in getting product"
//     })    
// }
// }

// const productPhotoController = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("photo");
//     if (product.photo.data) {
//       res.set("Content-type", product.photo.contentType);
//       return res.status(200).send(product.photo.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr while getting photo",
//       error,
//     });
//   }
// };

const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product && product.photo && product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      res.status(404).send({ message: "Photo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

// deleteproduct

const deleteProductController=async(req,res)=>{
    try{
await productModel.findByIdAndDelete(req.params.pid).select('-photo')
res.status(200).send({
    success:true,
    message:"product deleted successfully"
})
    }
    catch(error){
        console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in getting product"
    })     
    }
}

// update product
// const updateProductController = async (req, res) => {
//     try {
//       const { name, slug, description, price, category, quantity, shipping } = req.fields;
//       const { photo } = req.files;
  
//       // Validation
//       switch (true) {
//         case !name:
//           return res.status(400).send({ error: "Name is required" });
//         case !slug:
//           return res.status(400).send({ error: "Slug is required" });
//         case !description:
//           return res.status(400).send({ error: "Description is required" });
//         case !price:
//           return res.status(400).send({ error: "Price is required" });
//         case !category:
//           return res.status(400).send({ error: "Category is required" });
//         case !quantity:
//           return res.status(400).send({ error: "Quantity is required" });
//         case photo && photo.size > 1000000:
//           return res.status(400).send({ error: "Photo size should be less than 1MB" });
//       }
  
//       const updatedProduct = await productModel.findByIdAndUpdate(
//         req.params.pid,
//         {
//           ...req.fields,
//           slug: slugify(name)
//         },
//         { new: true }
//       );
  
//       if (photo) {
//         updatedProduct.photo.data = fs.readFileSync(photo.path);
//         updatedProduct.photo.contentType = photo.type;
//       }
  
//       await updatedProduct.save();
  
//       res.status(200).send({
//         success: true,
//         message: "Product updated successfully",
//         product: updatedProduct
//       });
  
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         error,
//         message: "Error in updating product"
//       });
//     }
//   };

const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
  

// filterproduct

const productFilterController=async(req,res)=>{
try{

  const {checked,radio}=req.body;
  let args={}
  if(checked.length>0) args.category=checked
  if(radio.length) args.price ={$gte : radio[0], $lte:radio[1]};
  const products= await productModel.find(args);
  res.status(200).send({
    success:true,
    products,
  })
}catch(error){
  console.log(error);
  res.status(400).send({
    success:false,
    error,
    message:"error in filtering dta"
  })
}
}


// prodct count

const productCountController=async(req,res)=>{
  try{
const total= await productModel.find({}).estimatedDocumentCount()
res.status(200).send({
  success:true,
  total,
})
  }catch(error){
    console.log(error);
    res.status(400).send({
      success:false,
      error,
      message:"error in filtering dta"
    }) 
  }
}


// product page list

const productListController=async(req,res)=>{
  try{
const perPage=6
const page=req.params.page ? req.params.page : 1
const products=await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
res.status(200).send({
  success:true,
  products
})
  }catch(error){
    console.log(error);
    res.status(400).send({
      success:false,
      error,
      message:"error in filtering dta"
    }) 
  }
}

// seacrh product
const seacrhProductController=async(req,res)=>{
  try{
const {keyword}=req.params
const result = await productModel.find({
  $or: [
    {name:{$regex : keyword,$options:"i"}},
    {description:{$regex : keyword,$options:"i"}}
  ]
}).select("-photo")
res.json(result)
  }catch(error){
    console.log(error);
    res.status(400).send({
      success:false,
      error,
      message:"error in filtering dta"
    }) 
  }
}


// similar product
const relatedProductController=async(req,res)=>{
  try{
const {pid,cid}=req.params
const products=await productModel.find({
  category:cid,
  _id:{$ne:pid}
}).select("-photo").limit(3).populate('category')
res.status(200).send({
  success:true,
  products
})
  }catch(error){
    console.log(error);
    res.status(400).send({
      success:false,
      error,
      message:"error in getting similar products"
    }) 
  }
}


// get products by category

const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


// productController gateway

const braintreeTokenController=async(req,res)=>{
  try{
gateway.clientToken.generate({},function(err,response){
if(err){
  console.log(err);
  res.status(400).send(err)
}else{
  res.send(response)
}

})
  }
  catch(error){
    console.log(error);
  }
}


const brainTreePaymentController=async(req,res)=>{
  try{
const {cart,nonce}=req.body
let total=0
cart.map(i => {
  total += i.price
})
let newTranscation=gateway.transaction.sale({
  amount:total,
  paymentMethodNonce:nonce,
  options:{
    submitForSettlement:true
  }
  
},
function(error,result){
  if(result){
    const order= new orderModel({
products:cart,
payment:result,
buyer:req.user._id
    }).save()
    res.json({ok:true})
  }else{
    res.status(500).send(error)
  }
}

)
  }catch(error){
console.log(error);
  }
}
module.exports={createProductController, getProductController,getSingleController, productPhotoController,deleteProductController,
  updateProductController,productFilterController,productCountController,productListController,seacrhProductController,relatedProductController,productCategoryController,
braintreeTokenController,brainTreePaymentController
}