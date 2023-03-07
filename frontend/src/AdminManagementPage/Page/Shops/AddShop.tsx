import React, { useState } from 'react'
import AdminNavbar from '../../../adminComponent/AdminNavbar'
import './style/addShop.scss'

export default function AddShop() {

    const [shopName, setShopName] = useState('')
    const [shopEmail, setShopEmail] = useState('')
    const [shopPassword, setShopPassword] = useState('')

    const InsertShopData = async () => {

        let char1 = Math.floor(Math.random() * 9)
        let char2 = Math.floor(Math.random() * 9)
        let char3 = Math.floor(Math.random() * 9)

        await fetch('http://localhost:8000/api/admin/create-shop', {
            method:'POST',
            body: JSON.stringify({
                id: "SP"+String(char1)+String(char2)+String(char3),
                shopname: shopName,
                shopemail: shopEmail,
                shoppassword: shopPassword,
                shopstatus: "active"
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        }).then((res)=>res.json())

        setShopName('')
        setShopEmail('')
        setShopPassword('')

        alert('shopa addded succesfully !')
    }

  return (
    <div>
        <AdminNavbar />
        <div className='wrap-addshop-dashboard'>
            <div className='form-add'>
                <div>
                    <h3>Add The Shop</h3>
                </div>
                <div className='wrap-input'>
                    <div>
                        <p>Shop Name: </p>
                        <input type={'text'} value={shopName} onChange={(e)=>setShopName(e.target.value)} />
                    </div>
                    <div>
                        <p>Shop Email: </p>
                        <input type={'text'} value={shopEmail} onChange={(e)=>setShopEmail(e.target.value)} />
                    </div>
                    <div>
                        <p>Shop Password: </p>
                        <input type={'password'} value={shopPassword} onChange={(e)=>setShopPassword(e.target.value)} />
                    </div>
                    <div className='wrap-button'>
                        <button onClick={()=>InsertShopData()}>Add Shop</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
