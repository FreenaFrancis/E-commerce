// import React, { useEffect, useState } from 'react';
// import Layout from '../components/Layout/Layout';
// import AdminMenu from '../components/Layout/AdminMenu';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import CategoryForm from '../components/Form/CategoryForm';

// function CreateCategory() {
//   const [categories, setCategories] = useState([]);
// const [name,setName]=useState('')
// const[visible,setVisible]=useState('')

// // handleform
// const handleSubmit=async(e)=>{
//   e.preventDefault()
//   try{
// const {data}=await axios.post('http://localhost:5000/api/v1/category/create-category',{name})
// if(data?.success){
//   toast.success(`${name} is created` )
// }else{
//   toast.error(data.message)
// }
//   }catch(error){
//     console.log(error);
//     toast.error("something went wrong")
//   }
// }

//   // Get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/v1/category/get-category');
//       if (data.success) {
//         setCategories(data.category); // assuming data.categories contains the list of categories
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   return (
//     <Layout title={'Dashboard - Create Category'}>
//       <div className='container-fluid m-3 p-3'>
//         <div className='row'>
//           <div className='col-md-3'>
//             <AdminMenu />
//           </div>

// {/* form */}

// <div className='col-md-9'>
//   <h1>ManageCategory</h1>
//   <div className='p-3'>
//     <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
//   </div>
// </div>

//           <div className='col-md-9'>
//             <h1>Create Category</h1>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th scope="col">Name</th>
//                   <th scope="col">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories?.map((c) => (
//                   <tr key={c.id}>
//                     <td>{c.name}</td>
//                     <td>
//                       {/* Add actions like edit/delete here */}
//                       <button className="btn btn-sm btn-primary">Edit</button>
//                       <button className="btn btn-sm btn-danger">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default CreateCategory;


import React, { useEffect, useState } from "react";


import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../components/Form/CategoryForm";
import Layout from "../components/Layout/Layout";
import AdminMenu from "../components/Layout/AdminMenu";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    
    <Layout title={"Dashboard - Create Category"}>
     
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              {/* <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              /> */}
              <CategoryForm handleSubmit={handleSubmit}
                value={name}
                setValue={setName}/>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;