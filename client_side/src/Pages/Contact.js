import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi'
function Contact() {
  return (
   <Layout title={'Contact us'}>
  <div className='row contactus'>
    <div className='col-md-7'>
      <img src='/images/contactus.jpeg' alt='contactus' style={{width:'100%'}}/>
    </div>

    <div className='col-md-4'>
      <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
      <p className='text-justify mt-2'>
        any query and info about product feel free to call anytime 
      </p>
      <p className='mt-3'>
        <BiMailSend/>:www.help@gmail.com
      </p>
      <p className='mt-3'>
        <BiPhoneCall/>:887868787
      </p>
      <p className='mt-3'>
        <BiSupport/>:1800-00000-0000(tool free)
      </p>
    </div>
  </div>
   </Layout>
  )
}

export default Contact