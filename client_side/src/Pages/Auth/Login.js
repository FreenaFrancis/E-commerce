import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';



function Login() {
  
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[auth,setAuth]=useAuth()


const navigate=useNavigate()
const location=useLocation()

const handleSubmit= async(e)=>{
    e.preventDefault();
   try{
    const res=await axios.post("http://localhost:5000/api/v1/auth/login",{email,password})
    if(res.data.success){
      toast.success(res.data.message)
      setAuth({
        ...auth,
        user:res.data.user, 
        token:res.data.token
      })
      localStorage.setItem('auth',JSON.stringify(res.data))
      navigate(location.state || '/')
    }else{
      toast.error(res.data.message)
    }
    console.log(email,password);
    toast.success("Register successfully")
   }catch(error){
    console.log(error);
    toast.error("something went wrong")
   }
  }

  return (
    <Layout title="register">
    <div className="register">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      
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
      
        <button type="submit" className="btn btn-primary">Submit</button>
        <div className='mb-4'>
        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forget Password</button></div>
      </form>
    </div>
  </Layout>

  )
}

export default Login