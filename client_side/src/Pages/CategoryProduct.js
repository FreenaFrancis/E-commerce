import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function CategoryProduct() {
  const [products,setProducts]=useState([])
  const[category,setCategory]=useState([])
  const params=useParams()
  const navigate=useNavigate()
useEffect(()=>{

  if(params?.slug)getProductByCategory()
},[params?.slug])

  const getProductByCategory=async()=>{
    try{
const {data}= await axios.get(`http://localhost:5000/api/v1/product/product-category/${params.slug}`)
setProducts(data?.products)
setCategory(data?.category)
    }catch(error){
      console.log(error);
    }
  }
  return (
   <Layout>
    <div className='container'>
     <h1 className='text-center'>{category?.name}</h1>

     <h6>{products?.length}result found</h6>
     <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
    </div>
   </Layout>
  )
}

export default CategoryProduct