import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UseCategory() {
  const[categories,setCategories]=useState([])
  const getCategories=async()=>{
    try{
const {data}=await axios.get(`http://localhost:5000/api/v1/category/get-category`)
setCategories(data?.category)
    }catch(error){
        console.log(error);
    }
  }  

  useEffect(()=>{
    getCategories()
  },[])
  return categories
}
