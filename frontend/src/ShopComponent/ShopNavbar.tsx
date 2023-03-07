import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style/navbarstyle.scss'
import { Link } from 'react-router-dom'

export default function ShopNavbar({props}:{props:any}){

  const [click, setClick] = useState(false)
  const navigate = useNavigate()

  const logoutStore = async () => {
    await fetch("http://localhost:8000/api/store/store-logout", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>res.json())
    navigate('/')
  }

  return (
    <div className='wrap-shop-navbar'>
        <div>
            <Link to={'/shop-dashboard-page'} state={props}><p>Store NewEgg Dashboard</p></Link>
        </div>
        <div>
            <p onClick={()=>setClick(!click)} className='email-login'>{props}</p>
            {
              click && (
                <div>
                  <p className='logout' onClick={logoutStore}>Logout</p>
                </div>
              )
            }
        </div>
    </div>
  )
}
