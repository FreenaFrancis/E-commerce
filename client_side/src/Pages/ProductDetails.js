import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  // Initial product details fetch
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  // Fetch product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch product details.');
    }
  };

  // Fetch similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch related products.');
    }
  };

  return (
    <Layout>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className='row container'>
        <div className='col-md-6'>
          {product?._id && (
            <img
              src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              width={'300'}
              height={'400'}
            />
          )}
        </div>
        <div className='col-md-6'>
          <h1 className='text-center'>Product details</h1>
          <h6>Name: {product?.name}</h6>
          <h6>Description: {product?.description}</h6>
          <h6>Price: {product?.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <button className='btn btn-secondary ms-1'>Add to cart</button>
        </div>
      </div>
      <hr />
      <div className='row container'>
        <h1>Similar products</h1>
        {relatedProducts.length < 1 ? (
          <p className='text-center'>No similar products found</p>
        ) : (
          <div className='d-flex flex-wrap'>
            {relatedProducts.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-secondary ms-1">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ProductDetails;
