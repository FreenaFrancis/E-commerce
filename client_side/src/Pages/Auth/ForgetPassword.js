// import React, { useState } from 'react'
// import Layout from '../../components/Layout/Layout'
// import axios from 'axios'
// import toast from 'react-hot-toast';
// // import { useAuth } from '../../context/auth';
// import { useLocation, useNavigate } from 'react-router-dom';
// function ForgetPassword() {
//     const[email,setEmail]=useState('')
// const[newpassword,setNewPassword]=useState('')
// const[answer,setAnswer]=useState('')
// // const[auth,setAuth]=useAuth()


// const navigate=useNavigate()
// // const location=useLocation()

// const handleSubmit= async(e)=>{
//     e.preventDefault();
//    try{
//     const res=await axios.post("http://localhost:5000/api/v1/auth/forget-password",{email,newpassword,answer})
//     if(res.data.success){
//       toast.success(res.data.message)
//     //   setAuth({
//     //     ...auth,
//     //     user:res.data.user, 
//     //     token:res.data.token
//     //   })
//     //   localStorage.setItem('auth',JSON.stringify(res.data))
//       navigate('/login')
//     }else{ 
//       toast.error(res.data.message)
//     }
//     console.log(email,newpassword);
//     toast.success("Register successfully")
//    }catch(error){
//     console.log(error);
//     toast.error("something went wrong")
//    }
//   }
//   return (
   
//     <Layout>
//          <div className="register">
//       <h1>Reset passowrd</h1>
//       <form onSubmit={handleSubmit}>
      
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
//           <input type="email" className="form-control" id="exampleInputEmail1" placeholder='enter your email' value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//           required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//           <input type="password" className="form-control" id="exampleInputPassword1" placeholder='enter password' value={newpassword}
//           onChange={(e)=>setNewPassword(e.target.value)}
//           required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">Answer</label>
//           <input type="text" className="form-control" id="exampleInputEmail1" placeholder='enter your secret answer' value={answer}
//           onChange={(e)=>setAnswer(e.target.value)}
//           required
//           />
//         </div>
      
//         <button type="submit" className="btn btn-primary">Reset</button>
//         {/* <div className='mb-4'>
//         <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forget Password</button></div> */}
//       </form>
//     </div>
//     </Layout>
//   )
// }

// export default ForgetPassword


import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/forget-password", { email, newPassword, answer });
            if (res.data.success) {
                toast.success(res.data.message);
                alert("password reset successfully")
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="register">
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">Secret Answer</label>
                        <input
                            type="text"
                            className="form-control"
                            id="answer"
                            placeholder="Enter your secret answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    );
}

export default ForgetPassword;
