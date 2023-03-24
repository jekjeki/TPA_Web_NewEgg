import { ref, uploadBytes, uploadString } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../firebase/firebase'
import './style/modaladdtowishliststyle.scss'

export default function ModalAddtoWishlist({productid, shopid, wishlistid, productprice}:
    {productid:string, shopid:string, wishlistid:string, productprice:number}) {

    const [userid, setuserid] = useState<string>('')
    const navigate = useNavigate()

    //get curr user login
    const getCurrLoginUser = async () => {
        await fetch("http://localhost:8000/api/users/me", {
            method: 'GET',
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setuserid(data.data.user.id)
        })
    }


     //add product to wishlist 
     const addProductToWishlist = async () => {

       
        let num1 = Math.floor(Math.random()*9+0)
        let num2 = Math.floor(Math.random()*9+0)
        let num3 = Math.floor(Math.random()*9+0)

        let id = "WT"+num1.toString()+num2.toString()+num3.toString()

        await fetch("http://localhost:8000/api/wishlist/create-wishlist-transaction", {
            method: 'POST',
            body: JSON.stringify({
                wishtrID: id,
                productID: productid,
                shopID: shopid,
                userID: userid,
                wishlistID: wishlistid,
                totalqty: 1,
                totalprice: productprice

            }),
            headers:{
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>console.log(res.json()))

        // const imagegeRef = ref(storage, `wishlist-image/${wishlistid}`)
        // uploadString(imagegeRef, image).then((sn)=>{
        //     getDownloadURL(sn.ref).then((url)=>{
        //         console.log(url)
        //     })
        // })

        

        navigate('/')
     }

     useEffect(()=>{
        getCurrLoginUser()
     }, [])

  return (
    <div className='modal'>
        <div className='modal-content'>
            <div className='modal-header'>
            </div>
            <div className='modal-body'>
                The product has added to wishlist !
            </div>
            <div className='modal-footer'>
                <button onClick={()=>addProductToWishlist()}>Close</button>
            </div>
        </div>
    </div>
  )
}
