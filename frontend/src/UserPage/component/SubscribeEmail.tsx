import React, { useEffect, useState } from 'react'
import './style/subscribeemail.scss'

export default function SubscribeEmail() {

    const [email, setEmail] = useState('')

    const subscribeEmail = async () => {

        let num1 = Math.floor(Math.random()*9+0)
        let num2 = Math.floor(Math.random()*9+0)
        let num3 = Math.floor(Math.random()*9+0)

        let subid = 'SB'+num1.toString()+num2.toString()+num3.toString()

        await fetch("http://localhost:8000/api/users/subscribe_news", {
            method: 'POST',
            body: JSON.stringify({
                subsid: subid,
                subsemail: email
            }),
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>console.log(res.json()))

        setEmail('')
    }

  return (
    <div className='wrap-subscribe-email'>
        <div className='input-email'>
            <div className='header'>
                <h3>DEALS JUST FOR YOU</h3>
            </div>
            <div className='wrap-input-email'>
                <div>
                    <p>Sign up to receive exclusive offers in your inbox</p>
                </div>
                <div className='input-email'>
                    <input type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <button onClick={subscribeEmail}>SIGN UP</button>
                </div>
            </div>
        </div>  
        <div className='download-app'>
            <div className='header'>
                <h3>DOWNLOAD OUR APP</h3>
                <p>Enter your phone number and we'll send you a download link</p>
            </div>
            <div className='wrap-input'>
                <div className='input-phone'>
                    <input />
                    <button>SEND LINK</button>
                </div>
            </div>
        </div>
    </div>
  )
}
