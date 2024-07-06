import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/auth/orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            {
              orders.map((o, i) => (
                <div className='border shadow mb-3' key={i}>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope='row'>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
<div className='container'>
                  <div className='col-md-12'>
                    {o.products.map(p => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
