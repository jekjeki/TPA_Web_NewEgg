import React from 'react';
import './App.scss';
import Signin from './Page/Signin';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Page/Signup';
import SigninPassword from './Page/SigninPassword';
import Home from './Page/Home';
import AdminDashboard from './Page/Admin/AdminDashboard';
import ManagementMenu from './Page/Admin/ManagementMenu';
import AddVoucher from './AdminManagementPage/Page/AddVoucher';
import ListUsers from './AdminManagementPage/Page/ListUsers';
import BlastEmail from './AdminManagementPage/Page/BlastEmail';
import ShopDashboard from './AdminManagementPage/Page/Shops/ShopDashboard';
import AddShop from './AdminManagementPage/Page/Shops/AddShop';
import ViewAllShop from './AdminManagementPage/Page/Shops/ViewAllShop';
import ShopDashboardPage from './ShopPage/ShopDashboardPage';
import Promotion from './AdminManagementPage/Page/Promotion/Promotion';
import ProductPage from './ShopPage/SubShopPage/ProductPage';
import AddProduct from './ShopPage/SubShopPage/AddProduct';
import ViewProduct from './ShopPage/SubShopPage/ViewProduct';
import UpdateProduct from './ShopPage/SubShopPage/UpdateProduct';
import UpdateShopInformation from './ShopPage/SubShopPage/UpdateShopInformation';
import DetailProductUser from './UserPage/component/DetailProductUser';
import WishList from './UserPage/Wishlist/WishList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin-password' element={<SigninPassword />} />
          <Route path='/' element={<Home />}/>
          <Route path='/admin-dashboard' element={<AdminDashboard />}/>
          <Route path='/management-menu' element={<ManagementMenu />}/>
          {/* Management menu admin */}
          <Route path='/vouchers-add-view' element={<AddVoucher />} />
          <Route path='/list-users' element={<ListUsers />} />
          <Route path='/blast-email' element={<BlastEmail />}/>
          <Route path='/shop-dashboard' element={<ShopDashboard />}/>
          <Route path='/add-shop' element={<AddShop />} />
          <Route path='/view-all-shops' element={<ViewAllShop /> } />
          <Route path='/manage-promotions' element={<Promotion />}/>
 

          {/**
           * shop dashboard page 
           */}
           <Route path='/shop-dashboard-page' element={<ShopDashboardPage />} />
           <Route path='/product-page' element={<ProductPage />}/>
           <Route path='/add-product' element={<AddProduct />}/>
           <Route path='/store-view-product' element={<ViewProduct />}/>
           <Route path='/update-product/:id' element={<UpdateProduct />}/>
           <Route path='/update-shop-information' element={<UpdateShopInformation />}/>
           <Route path='/detail-product/:id' element={<DetailProductUser />}/>
           <Route path='/wish-list' element={<WishList />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
