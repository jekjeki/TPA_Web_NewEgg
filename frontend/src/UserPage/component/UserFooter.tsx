import React from 'react'
import { Link } from 'react-router-dom'
import './style/userfooter.scss'

export default function () {
  return (
    <div className='user-footer'>
        <div className='top-footer'>
            <div className='wrap-footer-menu'>
                <div className='customer-service'>
                    <div className='header'>
                        <h4>CUSTOMER SERVICE</h4>
                    </div>
                    <div className='body'>
                        <p>Help Center</p>
                        <p>Track an Order</p>
                        <p>Return an Item</p>
                        <p>Return Policy</p>
                        <p>Privacy & Security</p>
                        <p>Feedback</p>
                    </div>
                </div>
                <div className='my-account'>
                    <div className='header'>
                        <h4>MY ACCOUNT</h4>
                    </div>
                    <div className='body'>
                        <p>Login/Register</p>
                        <p>Order History</p>
                        <p>Returns History</p>
                        <p>Address Book</p>
                        <p>Wish Lists</p>
                        <p>My Build List</p>
                        <p>My Build Showcase</p>
                        <p>Email Notifications</p>
                        <p>Subscriptions Orders</p>
                        <p>Auto Notifications</p>
                    </div>
                </div>
                <div className='company-information'>
                    <div className='header'>
                        <h4>COMPANY INFORMATION</h4>
                    </div>
                    <div className='body'>
                        <p>About Newegg</p>
                        <p>Investor Relations</p>
                        <p>Awards/Rankings</p>
                        <p>Hours and Locations</p>
                        <p>Press Inquiress</p>
                        <p>Newegg Careers</p>
                        <p>Newsroom</p>
                        <p>Neweeg insider</p>
                        <p>Calif. Transparencyin Supply Chains Act</p>
                        <p>Cigna MRF</p>
                    </div>
                </div>
                <div className='tools'>
                    <div className='header'>
                        <h4>TOOLS & RESOURCES</h4>
                    </div>
                    <div className='body'>
                        <p>Sell on Neweeg</p>
                        <p>For Your Business</p>
                        <p>Newegg Partner Services</p>
                        <p>Become an Affiliate</p>
                        <p>Newegg Creators</p>
                        <p>Site Map</p>
                        <p>Shop by Brand</p>
                        <p>Rebates</p>
                        <p>Mobile Apps</p>
                    </div>
                </div>
                <div className='shop-our-brands'>
                    <div className='header'>
                        <h4>SHOP OUR BRANDS</h4>
                    </div>
                    <div className='body'>
                        <p>Newegg Business</p>
                        <p>Newegg global</p>
                        <p>ABS</p>
                        <p>Rosewill</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='bottom-footer'>
            <div className='copyright'>
                <div>
                    <p>© 2000-2023 Newegg Inc.  All rights reserved.</p>
                </div>
                <div className='wrap-link'>
                    <Link to={'#'}>Terms & Conditions</Link>
                    <Link to={'#'}>Privacy Policy</Link>
                    <Link to={'#'}>Cookie Preferences</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
