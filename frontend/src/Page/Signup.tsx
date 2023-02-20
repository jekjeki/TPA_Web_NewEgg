import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import neweggLogo from '../asset/logo/logo-newegg.png'
import '../style/Signup.scss'
import {faEyeSlash, faCheckCircle, faEye} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

export default function Signup() {

    const [valPassword, setvalPassword] = useState('')
    const [eyeClick, setEyeClick] = useState(false)
    const [getChecked, setChecked] = useState('not checked')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    

    const insertUser = async () => {
        // const response = await fetch('http://localhost:8080/', {
        //     method:"POST",
        //     headers: {
        //         "Content-Type":"application/json",
        //     },
        //     body:JSON.stringify({
        //         query:`
        //             mutation createUser{
        //             createUser(input:{firstname:${firstName}, lastname:${lastName}, email:${email},phone:${phone},password:${valPassword},subscribe:${getChecked}})
        //             {
        //               id
        //               firstname
        //               lastname
        //               role
        //               email
        //               phone
        //               password
        //               subscribe
        //             }
        //           }
        //         `,
                
        //     }),
        // });
        
        // const result = await response.json()
        // console.log(result)
        
    //    const queries = `
    //    mutation createUser{
    //     createUser(input:{firstname:${firstName},lastname:${lastName}, email:${email},phone:${phone},password:${valPassword},subscribe:${getChecked}})
    //     {
    //       id
    //       firstname
    //       lastname
    //       role
    //       email
    //       phone
    //       password
    //       subscribe
    //     }
    //   }
    //    `
    //   const res = await axios.post(
    //     'http://localhost:8080/',{
    //         query: queries
    //     }
    //   )
       
    //   const result = res.data.data 
    //     console.log(result)

    }


    const signUpUser = async () => {
        
        var pass = valPassword

        var isUpper = false
        var isLower = false 
        var isNumber = false 
        var isSpecial = false 

        if(pass.length>8 || pass.length<30)
        {
            for (let index = 0; index < pass.length; index++) {
                if(pass.charAt(index)>='A'||pass.charAt(index)<='Z')
                {
                    isUpper = true 
                }
                
                if(pass.charAt(index)>='a'||pass.charAt(index)<='z')
                {
                    isLower = true 
                }

                if(pass.charAt(index)>='1'||pass.charAt(index)<='9')
                {
                    isNumber = true 
                }
    
                if(pass.charAt(index)==='@' || pass.charAt(index)==='#'
                || pass.charAt(index)==='$')
                {
                    isSpecial = true 
                }
            }
        
            if(isUpper === true && isLower===true
                &&isNumber===true&&isSpecial===true)
            {
                setvalPassword(pass)
                alert(valPassword+"value checkbox: "+getChecked)
                
                await fetch('http://localhost:8000/api/auth/register',{
                    method:'POST',
                    body: JSON.stringify({
                        id: "US"+String(Math.floor(Math.random()*1000)+1),
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        phone: phone,
                        password: valPassword,
                        subscribe: getChecked
                    }),
                    headers: {
                        'Content-type':'application/json;charset=UTF-8'
                    }
                }).then((res)=>console.log(res.json()))
                .catch((err)=>console.log(err))
                
            }
            
        }
    }

  return (
    <div>
        <div className='signup-page'>
            <div className='wrap-signup-comp'>
                
                    <div className='wrap-logo'>
                        <img className='logo' src={neweggLogo} alt="NewEggLogo" />
                    </div>
                    <div className='signup-body'>
                        <div className='wrap-signup-body-comp'>
                            <div className='wrap-signup-title'>
                                <p>Create Account</p>
                            </div>
                            <div className='wrap-create-business-account'>
                                <p>Shopping for your business?<Link to={'#'}> Create a free business account</Link></p>
                            </div>
                            <div className='wrap-first-name-signup'>
                                <input type={"text"} placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                            </div>
                            <div className='wrap-last-name-signup'>
                                <input type={"text"} placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                            </div>
                            <div className='wrap-email-signup'>
                                <input type={"email"} placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div className='wrap-mobile-signup'>
                                <input type={"tel"} placeholder="Mobile Phone Number (optional)" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                            </div>
                            <div className='wrap-password-signup'>
                                <input type={eyeClick===false?'password':'text'} placeholder="Password" value={valPassword} onChange={(e)=>setvalPassword(e.target.value)}/>
                                <span className='eye-icon-wrap'>
                                    <FontAwesomeIcon onClick={()=>setEyeClick(!eyeClick)} icon={(eyeClick===false ? faEyeSlash:faEye)} className='eye-icon-logo'/>
                                </span>
                            </div>
                            <div className='wrap-password-terms'>
                                <div className='wrap-password-terms-title'>
                                    <p id='first-text'>Including 3 of the following: </p>
                                    <p>Must contain: </p>
                                </div>
                                <div className='wrap-term-items'>
                                    <div className='ABC'>
                                        <div>
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                        </div>
                                        <p>ABC</p>
                                    </div>
                                    <div className='abc'>
                                        <div>
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                        </div>
                                        <p>abc</p>
                                    </div>
                                    <div className='p123'>
                                        <FontAwesomeIcon icon={faCheckCircle}/>
                                        <p>123</p>
                                    </div>
                                    <div className='spec-char'>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        <p>@#$</p>
                                    </div>
                                    <div className='chars'>
                                        <FontAwesomeIcon icon={faCheckCircle}/>
                                        <p>8-30 Chars</p>
                                    </div>
                                </div>
                            </div>
                            <div className='subscribe-terms'>
                                <input type={'checkbox'} value={String(getChecked)} onChange={(e)=>setChecked((e.target.checked===true)?'checked':'not checked')} />
                                <p>Subscribe for exclusive e-mail offers and discount</p>
                            </div>
                            <div className='by-creating-account'>
                                <p>By creating an account, you agree to Newegg's 
                                    <Link to={'#'}>Privacy Notice</Link> and 
                                    <Link to={'#'}>Terms of Use</Link>
                                </p>
                            </div>
                            <div className='wrap-btn-signup'>
                                <button onClick={()=>signUpUser()}>
                                    SIGN UP
                                </button>
                            </div>
                            <div className='wrap-direct-signin'>
                                <p>Have an account? <Link to={'/signin'}>Sign in</Link></p>
                            </div>
                        </div>
                    </div>

                
            </div>
        </div>
    </div>
  )
}
