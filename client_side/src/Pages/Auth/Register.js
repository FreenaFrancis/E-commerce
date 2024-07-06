import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../../styles/AuthStyles.css";
function Register() {

const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[phone,setPhone]=useState('')
const[address,setAddress]=useState('')
const[answer,setAnswer]=useState('')
const navigate=useNavigate()
const handleSubmit= async(e)=>{
  e.preventDefault();
 try{
  const res=await axios.post("http://localhost:5000/api/v1/auth/register",{name,email,address,phone,password,answer})
  if(res.data.success){
    toast.success(res.data.message)
    navigate('/login')
  }else{
    toast.error(res.data.message)
  }
  console.log(name,email,address,phone,password);
  toast.success("Register successfully")
 }catch(error){
  console.log(error);
  toast.error("something went wrong")
 }
}
  return (
    <Layout title="register">
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputName" placeholder='enter your name' value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder='enter your email' value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='enter password' value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="exampleInputAddress" placeholder='enter address' value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
            <input type="tel" className="form-control" id="exampleInputPhone" placeholder='enter phone number' value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">Answer</label>
            <input type="tel" className="form-control" id="exampleInputPhone" placeholder='what is your favorite sports' value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" >Submit</button>
   
        </form>
      </div>
    </Layout>
  );
}

export default Register;
