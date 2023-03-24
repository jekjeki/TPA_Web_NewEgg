import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NewEggLogo from '../asset/logo/logo-newegg.png'
import './style/forgotpassword.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBackward } from '@fortawesome/free-solid-svg-icons'

export default function ForgotPassword() {

  let location = useLocation()

  const [inputCode, setInputCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [shopid, setShopid] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate()

  //get data
  const getData = () => {
    console.log(location.state.email)
    console.log(location.state.code)

  }

  //validate code 
  const validateCode = async () => {
    if(inputCode === location.state.code)
    {
      await fetch("http://localhost:8000/api/auth/onetime-signin-user", {
        method: 'POST',
        body: JSON.stringify({
          email: location.state.email,
        }),
        headers: {
          'Content-type':'application/json;charset=UTF-8'
        }
      })
      .then((res)=>res.json())
      .then((data)=>{
        setFirstName(data.firstname)
        setRole(data.role)
      })

      // chc first name 
      if(role === 'user'){

        navigate('/')
        return 
      }

      if(role === 'admin')
      {
        navigate('/admin-dashboard')
        return 
      }

      await fetch("http://localhost:8000/api/auth/onetime-signin-shop", {
        method: 'POST',
        body: JSON.stringify({
          shopemail: location.state.email
        }),
        headers: {
          'Content-type':'application/json;charset=UTF-8'
        }
      })
      .then((res)=>res.json())
      .then((data)=>{
        setShopid(data.shopid)
      })

      if(shopid !== ''){
        navigate('/shop-dashboard-page')

        return 
      }

    }
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <div>
        <div className='sign-in-wrap-forgot-pass'>
            <div className='wrap-logo'>
                <img className='logo' src={NewEggLogo} alt="NewEggLogo" />
            </div>
            <div className='wrap-title'>
              <h3>One-Time Code</h3>
            </div>
            <div className='txt'>
              <p>Enter the code that has been sent to</p>
            </div>
            <div className='email-back'>
              <div className='wrap-email'>
                <Link to={'/signin'}>
                  <FontAwesomeIcon icon={faArrowLeft} className='back-icon' />
                  <p>{location.state.email}</p>
                </Link>
              </div>
            </div>
            <div className='wrap-input-code'>
              <div className='wrap-2-input-code'>
                <div className='header-input-code'>
                  <p>input verify code:</p>
                </div>
                <div className='input-code'>
                  <input value={inputCode} onChange={(e)=>setInputCode(e.target.value)} />
                </div>
                <div className='txt2'>
                  <p>
                    Wrong email? Go back and enter the correct
                    information to reeive the code
                  </p>
                </div>
              </div>
            </div>
            <div className='wrap-btn'>
              <button onClick={()=>validateCode()}>SIGN IN</button>
            </div>
            <div>
              <p>A 6-Digit code has just been sent. Please wait a bit before requesting a new one.</p>
            </div>
        </div>
    </div>
  )
}
