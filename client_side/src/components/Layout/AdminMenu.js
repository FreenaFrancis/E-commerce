import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
  return (
    <div>
     
      <div className='text-center'>
      <div className="list-group">
      <h2>Admin Panel</h2>
        <NavLink 
          to="/dashboard/admin/create-category" 
          className="list-group-item list-group-item-action" 
          activeClassName="active"
          aria-current="true"
        >
        Create Category
        </NavLink>
        <NavLink 
          to="/dashboard/admin/create-product" 
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
        Create Product
        </NavLink>

        <NavLink 
          to="/dashboard/admin/products" 
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
        Products
        </NavLink>

        <NavLink 
          to="/dashboard/admin/orders" 
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
      All Orders
        </NavLink>
{/* 
        <NavLink 
          to="/dashboard/admin/users" 
          className="list-group-item list-group-item-action"
          activeClassName="active"
        >
         Users
        </NavLink> */}
       
      </div>
      </div>
    </div>
  );
}

export default AdminMenu;
