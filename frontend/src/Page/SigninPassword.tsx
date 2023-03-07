import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NewEggLogo from '../asset/logo/logo-newegg.png'
import '../style/SigninEmail.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function SigninPassword() {

    const location = useLocation()
    const navigate = useNavigate()
    const [password, setPasword] = useState('')
    const [status, setStatus] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [role, setRole] = useState('')

    const [shopId, setShopId] = useState('')
    const [shopName, setShopName] = useState('')
    const [shopEmail, setShopEmail] = useState('')
    const [shopToken, setShopToken] = useState('')
    const [shopStatus, setShopStatus] = useState('')

    const LoginApp = async () => {
        await fetch('http://localhost:8000/api/auth/login', {
            method: "POST",
            body: JSON.stringify({
                email: location.state.email,
                password: password
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setStatus(data.status)
            setAccessToken(data.access_token)
            setRole(data.role)
            localStorage.setItem("token", data.access_token)
        })

        if(role==='user')
        {
            navigate('/',{state: {firstname: location.state.firstname, lastname: location.state.lastname, access_token: accessToken}})
            return 
        }

        if(role==='admin')
        {
            navigate('/admin-dashboard', {state: {firstname: location.state.firstname, lastname: location.state.lastname, role:role , access_token: accessToken}})
            return 
        }

        await fetch("http://localhost:8000/api/auth/login-shop", {
            method: 'POST',
            body: JSON.stringify({
                shopemail: location.state.email,
                shoppassword: password
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>res.json())
        .then((data) => {
            console.log(data)
            setShopId(data.shopid)
            setShopName(data.shopname)
            setShopEmail(data.shopemail)
            setShopToken(data.access_token)
            setShopStatus(data.shopstatus)
            
        })
        if(shopStatus === 'active')
        {
            sessionStorage.setItem('access_token', shopToken)
        navigate('/shop-dashboard-page', {state: {shopid:shopId, shopname: shopName, shopemail: shopEmail, shoptoken: shopToken, shopstatus:shopStatus}})
        }

        
    }

  return (
    <div>
        <div className='signinpassword-wrap-page'>
            <div className='wrap-pw-signin-comp'>
                <div className='wrap-image-pw-signin'>
                    <img src={NewEggLogo} alt='newegg' />
                </div>
                <div className='wrap-title-pw-signin'>
                    <p>Sign in</p>
                </div>
                <div className='wrap-back-signin' onClick={()=>navigate('/signin')}>
                    <div>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div>
                        {location.state.email}
                    </div>
                </div>
                <div className='wrap-pw-input-signin'>
                    <input type={'password'} placeholder='Password' value={password} onChange={(e)=>setPasword(e.target.value)} />
                </div>
                <div className='wrap-btn-login'>
                    <button onClick={()=>LoginApp()}>LOG IN</button>
                </div>  
            </div>
        </div>
    </div>
  )
}
