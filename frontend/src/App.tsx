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
import ForgotPassword from './Page/ForgotPassword';
import PublicWishlist from './UserPage/Wishlist/PublicWishlist';
import Followwishlist from './UserPage/Wishlist/Followwishlist';
import HelpCenter from './UserPage/FooterComponent/HelpCenter';
import ReturnPolicy from './UserPage/FooterComponent/ReturnPolicy';
import PrivacySecurity from './UserPage/FooterComponent/PrivacySecurity';
import Feedback from './UserPage/FooterComponent/Feedback';
import AddressBook from './UserPage/FooterComponent/AddressBook';
import InvestorRelation from './UserPage/FooterComponent/InvestorRelation';
import AboutNewegg from './UserPage/FooterComponent/AboutNewegg';
import AwardRanking from './UserPage/FooterComponent/AwardRanking';
import PublicWishlistDetail from './UserPage/Wishlist/publicwishlistdetail/PublicWishlistDetail';
import UserWishlistDet from './UserPage/Wishlist/userwishlistdetail/UserWishlistDet';
import ShopPage from './UserPage/ShopPage/ShopPage';
import ShopProductPage from './UserPage/ShopPage/ShopProductPage';
import ShopReviewPage from './UserPage/ShopPage/ShopReviewPage';
import ShopAboutPage from './UserPage/ShopPage/ShopAboutPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
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

           {/**
            * wishlist 
            */}
           <Route path='/detail-product/:id' element={<DetailProductUser />}/>
           <Route path='/wish-list' element={<WishList />}/>
           <Route path='/public-wishlists' element={<PublicWishlist />} />

            {/* Follow wishlist  */}
            <Route path='/follow-wishlist' element={<Followwishlist />} />
            
            {/* 
            Footer Component 
           */}
            <Route path='/help-center' element={<HelpCenter />} />
            <Route path='/return-policy' element={<ReturnPolicy />}/>
            <Route path='/privacy-security' element={<PrivacySecurity />}/>
            <Route path='/feedback' element={<Feedback />}/>
            <Route path='/address-book' element={<AddressBook/>}/>
            <Route path='/investor-relation' element={<InvestorRelation />}/>
            <Route path='/about-newegg' element={<AboutNewegg />}/>
            <Route path='/award-ranking' element={<AwardRanking />} />

            {/* Public Wishlist Detail  */}
           <Route path='/public-wishlist-detail/:wishlistid' element={<PublicWishlistDetail />} />

           {/* User wishlist detail  */}
           <Route path='/user-wishlist-detail/:wihslistid' element={<UserWishlistDet />} />
        
           {/* Shop Home Page */}
           <Route path='/shop-home-page/:shopid' element={<ShopPage />} />

           {/* Shop Product Page */}
           <Route path='/get-products-in-product-page/:shopid' element={ <ShopProductPage />} />
            
            {/* Shop Review Page  */}
            <Route path='/shop-review-page/:shopid' element={<ShopReviewPage />} />

            {/* Shop ABout Page  */}
            <Route path='/shop-about-page/:shopid' element={<ShopAboutPage /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
