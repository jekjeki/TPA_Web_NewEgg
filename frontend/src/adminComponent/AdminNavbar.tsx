import React from 'react'
import './style/adminNavbar.scss'
import { Link } from 'react-router-dom'

export default function AdminNavbar() {
  return (
    <div className='admin-navbar'>
        <div>
            <p><Link to={'/management-menu'}>Manage</Link></p>
        </div>
        <div>
            <p>View Report</p>
        </div>
    </div>
  )
}
