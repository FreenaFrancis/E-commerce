// import React, { useEffect, useState } from 'react';
// import Layout from '../components/Layout/Layout';
// import { useCart } from '../context/Cart';
// import { useAuth } from '../context/auth';
// import { useNavigate } from 'react-router-dom';
// import DropIn from 'braintree-web-drop-in-react'
// import axios from 'axios';
// function CartPage() {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const[clientToken,setClientToken]=useState("")
//   const navigate = useNavigate();
//  const[instance,setInstance]=useState("")
//  const[loading,setLoading]=useState(false)
// // total price
// let totalPrice=()=>{
//   try{
//     let total=0;
//     cart?.map((item)=>{
//       total=total+item.price
//     })
//     return total.toLocaleString("en-US",{
//       style:'currency',
//       currency:"USD"
//     })
//   }
//   catch(error){
//     console.log(error);
//   }
// }

//   // remove Item
//   const removeCartItem=(pid)=>{
//     try{
// let myCart=[...cart]
// let index=myCart.findIndex(item=>item._id === pid)
// myCart.splice(index,1)
// setCart(myCart)
// localStorage.setItem("cart",JSON.stringify(myCart))
//     }
//     catch(error){
//       console.log(error);
//     }
//   }



//   // get payment GtaeWay
//   const getToken=async()=>{
//     try{
// const {data}=axios.get('http://localhost:5000/api/v1/product/braintree/token')
// setClientToken(data?.clientToken)
//     }catch(error){
//       console.log(error);
//     }
//   }

//   useEffect(()=>{
//     getToken()
//   },[auth?.token])


//   // make payment
//   const handlePayment=()=>{

//   }
//   return (
//     <Layout>
//       <div className='container'>
//         <div className='row'> 
//           <div className='col-md-12'>
//             <h1 className='text-center bg-light p-2'>
//               {`hello ${auth?.token && auth?.user?.name}`}</h1>
//             {auth?.token ? (
//               cart?.length  ? (
//                 <h4>{`you have ${cart?.length} items in your cart`}</h4>
//               ) : (
//                 <h4>your cart is empty</h4>
//               )
//             ) : (
//               <h4>please login to checkout</h4>
//             )}
//           </div>
//         </div>
//         <div className='row'>
// <div className='col-md-9'>
// {cart?.map(p => (
//   <div className='row m-2 card flex-row'>
//     <div className='col-md-4'>
//     <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                   width="100px"
//                   height={'150px'}
//                 />
//     </div>
// <div className='col-md-8'>
//   <p>{p.name}</p>
//   <p>{p.description.substring(0,30)}</p>
//   <p>{p.price}</p>
//   {/* <p>{p.quantity}</p> */}
//   <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove</button>
// </div>
//   </div>
// ))}
// </div>
// <div className='col-md-3'>
// <h2>cart Summary</h2>
// <p>Total | Checkout | Payment</p>
// <hr></hr>
// <h4>Total :{totalPrice()}</h4>
// {auth?.user?.address ? (
//   <>
//   <div className='mb-3'>
//     <h5>Current Addres</h5>
//     <h5>{auth?.user?.address}</h5>
//     <button className='btn btn-outline-warning'
//     onClick={()=>navigate('/dashboard/user/profile')}
//     >Update Address</button>
//   </div>
//   </>
// ):(
//   <div className='mb-3'>
//     {
//       auth?.token ? (
//         <button className='btn btn-outline-warning'     onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
//       ):(
//         <button className='btn btn-outline-warning'     onClick={()=>navigate('/login',{
//           state:"/cart"
//         })}>please login to checkout</button>
//       )
//     }
    
//     </div>
// )}


// {/* payement */}

// <div className='mt-2'>
//   <DropIn
//   options={{
//     authorization:clientToken,
//     paypal:{
//       flow:"vault"
//     }
//   }}
//   onInstance={instance => setInstance(instance)}
//   />
//   <button className='btn btn-primary' onClick={handlePayment}>Make payment</button>
// </div>
// </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default CartPage;  


import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import toast from 'react-hot-toast';

function CartPage() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: 'currency',
        currency: "USD",
      });
    } catch (error) {
      console.error(error);
      return "Error calculating total";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.error(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/product/braintree/token');
      setClientToken(data.clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('http://localhost:5000/api/v1/product/braintree/payment', {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success("Payment completed successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Payment failed");
    }
  };

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            {auth?.token ? (
              cart.length ? (
                <h4>{`You have ${cart.length} items in your cart`}</h4>
              ) : (
                <h4>Your cart is empty</h4>
              )
            ) : (
              <h4>Please login to checkout</h4>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-md-9'>
            {cart.map(p => (
              <div className='row m-2 card flex-row' key={p._id}>
                <div className='col-md-4'>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height='150px'
                  />
                </div>
                <div className='col-md-8'>
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>{p.price}</p>
                  <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-3'>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className='mb-3'>
                <h5>Current Address</h5>
                <h5>{auth.user.address}</h5>
                <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
              </div>
            ) : (
              <div className='mb-3'>
                {auth?.token ? (
                  <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                ) : (
                  <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: "/cart" })}>Please login to checkout</button>
                )}
              </div>
            )}

            {/* Payment */}
            <div className='mt-2'>
              {clientToken && cart.length > 0 && (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className='btn btn-primary'
                    onClick={handlePayment}
                    disabled={!instance || loading || !auth?.user?.address}
                  >
                    {loading ? 'Processing...' : 'Make Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
