import React from 'react'
import AdminNavbar from '../../../adminComponent/AdminNavbar'
import './style/shopDashboard.scss'
import { Link } from 'react-router-dom'

export default function ShopDashboard() {
  return (
    <div>
        <AdminNavbar />
        <div className='wrap-shop-dashboard-menu'>
            <div className='menus'>
                <div className='wrap-title'>
                    <h3>Shop menus</h3>
                </div>
                <Link to={'/add-shop'}>
                    <div className='wrap-add-shop'>
                        <p>Add Shop</p>
                    </div>
                </Link>
                <Link to={'/view-all-shops'}>
                    <div className='wrap-view-shop'>
                        <p>View Shops</p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}
