import React from 'react'
import Layout from '../components/Layout/Layout'
import UseCategory from '../hooks/UseCategory'
import { Link } from 'react-router-dom'
function Categories() {
    const categories=UseCategory()
  return (
    <Layout title={'All categories'}>
<div className='container'>
<div className='row'>
    {categories.map(c=>(
    <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'>
    <Link to={'/category/:slug'} className='btn btn-primary'>{c.name}</Link>
</div>
    ))}

</div>
</div>
    </Layout>
  )
}

export default Categories