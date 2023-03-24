import React, { useEffect, useState } from 'react'
import NewEggLogo from '../asset/logo/logo-newegg.png'
import {Link, useNavigate} from 'react-router-dom'
import googleLogo from '../asset/svg/googlesvg.svg'
import appleLogo from '../asset/svg/applelogo.svg'
import FooterLogin from '../component/FooterLogin'
import './style/signinstyle.scss'

export default function Signin() {

    const [loginEmail, setLoginEmail] = useState('')
    const [status, setStatus] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole]= useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const [shopEmail, setShopEmail] = useState('')
    const [shopName, setShopName] = useState('')
    const [shopEmailStatus, setShopEmailStatus] = useState('')
    const [shopId, setShopId] = useState('')

    const [emailErr, setEmailErr] = useState<boolean>(false)

    const navigate = useNavigate()

    let nextInputPassword = async () => {
        await fetch('http://localhost:8000/api/auth/signinemail', {
            method: "POST",
            body: JSON.stringify({
                email: loginEmail
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setStatus(data.status)
            setEmail(data.email_valid)
            setRole(data.role)
            setFirstname(data.firstname)
            setLastname(data.lastname)

        })

        if(status=='success')
        {
            navigate('/signin-password', {state: {email:email, role: role, firstname: firstname, lastname: lastname}})
            return
        }

        await fetch('http://localhost:8000/api/auth/signinemail-shop',{
            method: 'POST',
            body: JSON.stringify({
                shopemail: loginEmail                 
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setShopEmail(data.shop_email)
            setShopName(data.shop_name)
            setShopEmailStatus(data.status)
            setShopId(data.shop_id)
        })

        if(shopEmailStatus === 'success')
        {
            navigate('/signin-password', {state: {email:shopEmail, shopname: shopName, shopid: shopId}})
            return;
        }
        
    }

    //send code user email
    const sendEmailCode = async () => {
        await fetch("http://localhost:8000/api/auth/forgot-password", {
            method: 'POST',
            body: JSON.stringify({
                email: loginEmail
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.data.email_forget.email)
            console.log(data.data.email_forget.verif_code)

            navigate('/forgot-password', {state: {email: data.data.email_forget.email, code:data.data.email_forget.verif_code}})
        })
    }

    //const validate forgot password 
    const ForgotPassword = async () => {
        
        (loginEmail === '')? setEmailErr(true): sendEmailCode()

       
    }



  return (
    <div>
        <div className='signin-wrap-page'>
            <div className='wrap-logo'>
                <img className='logo' src={NewEggLogo} alt="NewEggLogo" />
            </div>
            <div className='signin-title'>
                <p>Sign in</p>
            </div>
            <div className='wrap-email-signin'>
                <input placeholder='Email Address' id='email-signin' value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
            </div>
                {
                    emailErr === true && (
                        <div className='wrap-err'>
                            <div>
                                <p>The email must be field</p>
                            </div>
                        </div>
                    )
                }
            <div className='wrap-button-signin'>
                <button onClick={()=>nextInputPassword()}><Link to={(status=='success')?'/signin-password':'#'}>SIGN IN</Link></button>
            </div>
            <div className='wrap-button-getonetimesignin'>
                <button onClick={()=>ForgotPassword()}>GET ONE-TIME SIGN IN CODE</button>
            </div>
            <div className='wrap-what-the-one-time'>
                <p>What's the One-Time Code?</p>
            </div>
            <div className='wrap-sign-up'>
                <div>
                    <p>New to Newegg?</p>
                </div>
                <div className='wrap-link-signup'>
                    <Link to={(loginEmail === '')?'/signup':''}><p>Sign Up</p></Link>
                </div>
            </div>
            <div className='wrap-or-page'>
                <p>OR</p>
            </div>
            <div className='wrap-btn-signin-google'>
                <button>
                    <img src={googleLogo} alt="google sign in"  />
                    <p>SIGN IN WITH GOOGLE</p>
                </button>
            </div>
            <div className='wrap-btn-signin-apple'>
                <button>
                    <img src={appleLogo} alt="apple logo sign in" />
                    <p>SIGN IN WITH APPLE</p>
                </button>
            </div>
            <FooterLogin />
        </div>
    </div>
  )
}
