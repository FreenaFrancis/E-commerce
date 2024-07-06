
import './App.css';
// import Layout from './Components/Layout/Layout';
import About from './Pages/About';
import Contact from './Pages/Contact';

import { Route,Routes } from 'react-router-dom';
import Policy from './Pages/Policy';
import Pagenotfound from './Pages/Pagenotfound';
import Register from './Pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Auth/Login';
import HomePage from './Pages/Home';
import DashBoard from './Pages/user/DashBoard';
import PrivateRoute from './components/Routes/Private';
import ForgetPassword from './Pages/Auth/ForgetPassword';
import AdminDashboard from './Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import CreateCategory from './Admin/CreateCategory';
import CreateProduct from './Admin/CreateProduct';
import Users from './Admin/Users';
import Profile from './Pages/user/Profile';
import Orders from './Pages/user/Orders';
import Products from './Admin/Products';
import UpdateProduct from './Admin/UpdateProduct';
import Searches from './Pages/Searches';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';
import AdminOrder from './Admin/AdminOrder';

function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/search' element={<Searches/>}></Route>
    <Route path='/product/:slug' element={<ProductDetails/>}></Route>
    <Route path='/category' element={<Categories/>}></Route>
    <Route path='/category/:slug' element={<CategoryProduct/>}></Route>
<Route path='/cart' element={<CartPage/>}></Route>

    <Route path='/dashboard' element={<PrivateRoute/>}>
    <Route path='user' element={<DashBoard/>}></Route>
    <Route path='user/profile' element={<Profile/>}></Route>
    <Route path='user/orders' element={<Orders/>}></Route>
    </Route>

    <Route path='/dashboard' element={<AdminRoute/>}>
    <Route path='admin' element={<AdminDashboard/>}></Route>
    <Route path='admin/create-category' element={<CreateCategory/>}></Route>
    <Route path='admin/create-product' element={<CreateProduct/>}></Route>
    <Route path='admin/users' element={<Users/>}></Route>
    <Route path='admin/products' element={<Products/>}></Route>
    <Route path="admin/product/:slug" element={<UpdateProduct />} />
    <Route path='admin/orders' element={<AdminOrder/>}/>
    </Route>

    <Route path='/register' element={<Register/>}></Route>
    <Route path='/forgot-password' element={<ForgetPassword/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/about' element={<About/>}></Route>    
    <Route path='/contact' element={<Contact/>}></Route>    
    <Route path='/policy' element={<Policy/>}></Route>
   
    <Route path='*' element={<Pagenotfound/>}></Route>
  </Routes>
  </>
  );
}

export default App;
