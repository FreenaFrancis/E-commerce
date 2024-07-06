import React, { useState, useEffect } from 'react';
import AdminMenu from '../components/Layout/AdminMenu';
import Layout from '../components/Layout/Layout';
import moment from 'moment';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Select } from 'antd';
const { Option } = Select;

function AdminOrder() {
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/auth/all-orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, value) => {
    try {
      const {data}=await axios.put(`http://localhost:5000/api/v1/auth/order-status/${orderId}`, {
        status: value
      });
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'All orders data'}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All orders</h1>
          {orders.map((o, i) => (
            <div className='border shadow mb-3' key={o._id || i}>
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
                    <td>
                      <Select
                        defaultValue={o?.status}
                        onChange={(value) => handleStatusChange(o._id, value)}
                      >
                        {status.map((s, idx) => (
                          <Option key={idx} value={s}>{s}</Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className='container'>
                <div className='col-md-12'>
                  {o.products.map((p) => (
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
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrder;
