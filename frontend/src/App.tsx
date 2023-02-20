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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
