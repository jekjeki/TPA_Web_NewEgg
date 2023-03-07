import React, { useEffect, useState } from 'react'
import './style/adminNavbar.scss'
import { Link } from 'react-router-dom'

export default function AdminNavbar() {

  const [name, setName] = useState('')
  const [click, setClick] = useState(false)

  const logoutAdmin = async () => {
    await fetch("http://localhost:8000/api/auth/users-logout", {
      method: 'GET',
      headers: {
        'Content-type':'application/json'
      }
    })
    .then((res)=>console.log(res.json()))
    .then((data)=>{
      console.log(data)
    })
  }

  const getCurrUser = async () => {
    await fetch(`http://localhost:8000/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-type':'application/json'
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.data.user.first_name)
      setName(data.data.user.first_name)
    })
  }

  useEffect(()=>{
    logoutAdmin()
    getCurrUser()
  }, [])

  return (
    <div className='admin-navbar'>
      <div className='wrap-menu'>
          <div>
              <p><Link to={'/management-menu'}>Manage</Link></p>
          </div>
          <div>
              <p>View Report</p>
          </div>
      </div>
      <div className='wrap-name-login' onClick={()=>setClick(!click)}>
        <div className='name'>
          <p>{name}</p>
        </div>
        {
          click && (
            <div onClick={()=>logoutAdmin()}>
              <p>Logout</p>
            </div>
          )
        }
      </div>
    </div>
  )
}
