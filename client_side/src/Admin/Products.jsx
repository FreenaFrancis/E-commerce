// import React, { useEffect, useState } from 'react';
// import AdminMenu from '../components/Layout/AdminMenu';
// import Layout from '../components/Layout/Layout';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function Products() {
//     const [products, setProducts] = useState([]);

//     // Get all products
//     const getAllProducts = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:5000/api/v1/product/get-product');
//             if (data && data.Products) {
//                 setProducts(data.Products); // Ensure products is always an array
//                 console.log(data.Products); // Log the products array
//             } else {
//                 setProducts([]);
//                 toast.error("No products found");
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Something went wrong");
//         }
//     };

//     useEffect(() => {
//         getAllProducts();
//     }, []);

//     return (
//         <Layout>
//             <div className='row'>
//                 <div className='col-md-3'>
//                     <AdminMenu />
//                 </div>
//                 <div className='col-md-9'>
//                     <h1 className='text-center'>All Products</h1>
//                     <div className='d-flex flex-wrap'>
//                         {products.length > 0 ? (
//                             products.map((p) => (
//                                 <Card className='m-2' style={{ width: '18rem' }} key={p._id}>
//                                     <Card.Img variant="top" src={p.photo} alt={p.name} />
//                                     <Card.Body>
//                                         <Card.Title>{p.name}</Card.Title>
//                                         <Card.Text>{p.description}</Card.Text>
//                                         <Button variant="primary">Go somewhere</Button>
//                                     </Card.Body>
//                                 </Card>
//                             ))
//                         ) : (
//                             <p className='text-center'>No products available</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default Products;



import React, { useEffect, useState } from 'react';
import AdminMenu from '../components/Layout/AdminMenu';
import Layout from '../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
