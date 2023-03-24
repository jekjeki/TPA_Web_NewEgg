import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/modalwishlist.scss'

export default function ModalWishlist({show}:{  show:boolean}) {

    const [wishlistName, setWishlistName] = useState<string>('')
    const [clickPrivacy, setClickPrivacy] = useState<string>('')
    const [userid, setUserid] = useState<string>('')
    const navigate = useNavigate()

   

     //get current user login
    const getCurrentLoginUser = async () => {
        await fetch("http://localhost:8000/api/users/me", {
        method: 'GET',
        headers: {
            'Content-type':'application/json;charset=UTF-8'
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        setUserid(data.data.user.id)
        
    })
}
   

     // create wishlist
     const CreateWishList = async () => {

        let num1 = Math.floor(Math.random()*9+0) 
        let num2 = Math.floor(Math.random()*9+0) 
        let num3 = Math.floor(Math.random()*9+0)

        let wishlistid = 'WH'+num1.toString()+num2.toString()+num3.toString()

        await fetch("http://localhost:8000/api/wishlist/create-wishlist", {
            method: 'POST',
            body: JSON.stringify({
                wishlistid: wishlistid,
                wishlist_name: wishlistName,
                wishlist_type: clickPrivacy,
                userid: userid
            })
        })
        .then((res)=>console.log(res.json()))

        if(clickPrivacy === 'public')
        {
            const date = new Date()
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            let currDate = `${day}-${month}-${year}`

            // add data to public wishlists 
            await fetch("http://localhost:8000/api/wishlist/add-public-wishlist-data", {
                method: 'POST',
                body: JSON.stringify({
                    wishlistid: wishlistid,
                    wishlist_type: 'public',
                    date: currDate,
                    totalrating: 0.0,
                    totalprice: 0
                }),
                headers: {
                    'Content-type':'application/json'
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data)
            })
        }

        let num4 = Math.floor(Math.random()*9+0) 
        let num5 = Math.floor(Math.random()*9+0) 
        let num6 = Math.floor(Math.random()*9+0)

        let userwlid = 'UWL'+num4.toString() + num5.toString() + num6.toString()

        await fetch("http://localhost:8000/api/wishlist/add-user-wishlist-trans", {
            method: 'POST',
            body: JSON.stringify({
                userwlID: userwlid,
                userID: userid,
                wishlistID: wishlistid
            }),
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })

        navigate('/')
    }

    useEffect(()=>{
        getCurrentLoginUser()
    }, [])

     if(!show){
        return null 
    }
    
  return (
    <div className='modal'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h4>Create List</h4>
            </div>
            <div className='modal-body'>
                <div className='wrap-input'>
                    <div>
                        <p>Name</p>
                    </div>
                    <div className='input-wishlist-name'>
                        <input value={wishlistName} onChange={(e)=>setWishlistName(e.target.value)} />
                    </div>
                </div>
                <div className='wrap-select-type'>
                    <div className='header'>
                        <p>Privacy</p>
                    </div>
                    <div className='wrap-type'>
                        <div style={
                            {backgroundColor:(clickPrivacy==='public')?'#BDCDD6':'',
                                borderRadius: '5px'
                            }} onClick={()=>setClickPrivacy('public')} >
                            <p id='#public'>Public</p>
                        </div>
                        <div style={{
                            backgroundColor:(clickPrivacy==='private')?'#BDCDD6':'',
                            borderRadius: '5px'
                        }} onClick={()=>setClickPrivacy('private')}>
                            <p>Private</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <button className='button' onClick={()=>CreateWishList()}>Create</button>
            </div>
        </div>
    </div>
  )
}
