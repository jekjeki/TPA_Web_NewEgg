import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ShopNavbar from '../../ShopComponent/ShopNavbar'
import './style/productpage.scss'

export default function ProductPage() {
    
    const location = useLocation()
    const [loginEmail, setLoginEmail] = useState()
    const [shopId, setShopId] = useState('')
    const data = location.state

    //get current login data 
    const currUser = async () => {
        const response = await axios.get('http://localhost:8000/api/store/get-login-store', {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
        setLoginEmail(response.data.data.store.shopemail)
        setShopId(response.data.data.store.shopid)
      }

      useEffect(()=>{
        currUser()
      }, [])

  return (
    <div>
        <ShopNavbar props={loginEmail} />
        <div className='wrap-product-page'>
            <div className='wrap-title'>
                <h3>Product Page</h3>
            </div>
            <div className='body-product'>
                <div className='wrap-menu'>
                    <div className='wrap-inside'>
                        <div className='add-product'>
                            <Link to={'/add-product'} state={data}><p>Add Product</p></Link>
                        </div>
                        <div className='view-product'>
                            <Link to={'/store-view-product'} state={data}><p>View Product</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
