// const userModel = require("../models/userModel");
// const { hashPassword, comparePassword, generateToken } = require("../helpers/authHelper");

// const registerController = async (req, res) => {
//     try {
//         const { name, email, password, phone, address,answer } = req.body;

//         // Validation
//         if (!name || !email || !password || !phone || !address || !answer) {
//             return res.status(400).send({ error: "All fields are required" });
//         }

//         // Check existing user
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(409).send({
//                 success: false,
//                 message: "User already exists"
//             });
//         }

//         // Hash password
//         const hashedPassword = await hashPassword(password);

//         // Register user
//         const user = await new userModel({ name, email, phone, address, password: hashedPassword,answer }).save();
//         res.status(201).send({
//             success: true,
//             message: "User registered successfully"
//         });
//         console.log(user);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//             success: false,
//             message: "Error in registration",
//             error: err.message // Send error message to client
//         });
//     }
// };

// const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validation
//         if (!email || !password) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Email and password are required"
//             });
//         }

//         // Check user existence
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Email is not registered"
//             });
//         }

//         // Compare passwords
//         const match = await comparePassword(password, user.password);
//         if (!match) {
//             return res.status(401).send({
//                 success: false,
//                 message: "Invalid password"
//             });
//         }

//         // Generate token
//         const token = generateToken(user.id);

//         // Send success response with token
//         res.status(200).send({
//             success: true,
//             message: "Login successful",
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 address: user.address
//             },
//             token
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error in login",
//             error: error.message // Send error message to client
//         });
//     }
// };

// // forgetpassowrd
// const forgetPasswordController=async(req,res)=>{
// try{
// const {email,answer,newPassword}=req.body
// if(!email){
//     res.status(400).send({message:"email is required"})
// }
// if(!answer){
//     res.status(400).send({message:"answer is required"})

// }
// if(!newPassword){
//     res.status(400).send({message:"newPassword is required"})
// }

// // check 
// const user=await userModel.findOne({email,answer})
// // validation
// if(!user){
//      return res.status(404).send({
//         success:false,
//         message:'wrong email or ANswer'
//      })
// }
// const hashed=await hashPassword(newPassword)
// await userModel.findByIdAndUpdate(user._id,{password:hashed})
// res.status(200).send({
//     success:true,
//     message:"passowrd reset successfully"
// })
// }
// catch(error){
//     console.log(error);
//     res.status(500).send({
//         success:false,
//         message:"something went wrong",
//         error

//     })
// }
// }

// // test contoroller
// const testController=(req,res)=>{
//     try{
//     res.send("protectes")
//     console.log('protected Route');
//     }
//     catch(error){
//         console.log(error);
//         res.send({error:error})
//     }
// }

// module.exports = { registerController, loginController,testController,forgetPasswordController };


const userModel = require("../models/userModel");
const { hashPassword, comparePassword, generateToken } = require("../helpers/authHelper");
const orderModel = require("../models/OrderModel");

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({ error: "All fields are required" });
        }

        // Check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Register user
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();
        res.status(201).send({
            success: true,
            message: "User registered successfully"
        });
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error: err.message // Send error message to client
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check user existence
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate token
        const token = generateToken(user.id);

        // Send success response with token
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role

            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error: error.message // Send error message to client
        });
    }
};

// forgetPasswordController
const forgetPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            return res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.status(400).send({ message: "New password is required" });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            });
        }

        // Hash the new password and update the user's password
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });

        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message // Send error message to client
        });
    }
};

// testController
const testController = (req, res) => {
    try {
        res.send("Protected route");
        console.log('Protected Route');
    } catch (error) {
        console.log(error);
        res.send({ error: error });
    }
};

// update-controller
const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


//   get order
// const getOrdersController = async (req, res) => {
//     try {
// const orders=await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name")
// res.json(orders)
//     }catch(error){
//         res.status(500).send({
//             success: false,
//             message: "Error WHile getting orders",
//             error,
//           });  
//     }
// }


// //  get all order
// const getAllOrdersController = async (req, res) => {
//     try {
//       const orders = await orderModel
//         .find({})
//         .populate("products", "-photo")
//         .populate("buyer", "name")
//         .sort({ createdAt: "-1" });
//       res.json(orders);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Error WHile Geting Orders",
//         error,
//       });
//     }
//   };

const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate('products', '-photo')
        .populate('buyer', 'name')
        .sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Error while getting orders',
        error,
      });
    }
  };

//   getOrderStatus

const orderstatusController=async(req,res)=>{
    try{
const {orderId}=req.params
const {status}=req.body
const orders = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
res.json(orders)
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting orders',
            error,
        
    })
}}
  

module.exports = { registerController, loginController, testController, forgetPasswordController,updateProfileController,getOrdersController,getAllOrdersController,orderstatusController }
