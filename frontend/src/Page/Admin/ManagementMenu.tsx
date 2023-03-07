import React from 'react'
import AdminNavbar from '../../adminComponent/AdminNavbar'
import './style/managementMenu.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAd, faShop, faStar, faStore, faTicket, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

export default function ManagementMenu() {
  return (
    <div>
        <AdminNavbar />
        <div className='wrap-management-menu'>
            <div className='box-menu add-voucher'>
                <FontAwesomeIcon icon={faTicket} className='ticket' />
                <div>
                    <p><Link to={'/vouchers-add-view'}>Add Voucher</Link></p>
                </div>
            </div>
            <div className='box-menu-2'>
                <FontAwesomeIcon icon={faUsers} className='users' />
                <div>
                    <p><Link to={'/list-users'}>List Users</Link></p>
                </div>
            </div>
            <div className='box-menu-3'>
                <FontAwesomeIcon icon={faShop} className='shops' />
                <div>
                    <p><Link to={'/shop-dashboard'}>Shops</Link></p>
                </div>
            </div>
            <div className='box-menu-4'>
                <FontAwesomeIcon icon={faStar} className='stars'/>
                <div>
                    <p><Link to={'#'}>Reviews</Link></p>
                </div>
            </div>
            <div className='box-menu-5'>
                <FontAwesomeIcon icon={faAd} className='advertise' />
                <div>
                    <p><Link to={'/manage-promotions'}>Promotions</Link></p>
                </div>
            </div>
            <div className='box-menu-6'>
                <FontAwesomeIcon icon={faEnvelope} className='email' />
                <div>
                    <p><Link to={'/blast-email'}>Blast Emails</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}
