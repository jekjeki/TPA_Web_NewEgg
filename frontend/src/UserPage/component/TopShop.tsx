import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../../firebase/firebase'
import './style/wrapTopShop.scss'

export default function TopShop() {

    const [topShops, setTopShops] = useState<any[]>([])
    const [imageProfiles, setImageProfiles] = useState<any[]>([])

    // get top shop data 
    const getTopShopData = async () => {
        await fetch("http://localhost:8000/api/store/display-top-shops", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setTopShops(data.top_shops)
        })
    }

    //read image top shops
    const images = ref(storage, "top-shops-mainpage/")
    const readImageProfile = () => {
        listAll(images).then((res)=>{
            res.items.forEach((item)=>{
                getDownloadURL(item).then((url) =>{
                    setImageProfiles((prev)=>[...prev, url])
                    console.log(url)
                })
            })
        })
    }

    useEffect(()=>{
        getTopShopData()
        readImageProfile()
    }, [])

  return (
    <div>
        <div className='wrap-top-shop-component'>
            <div className="header">
                <h3>OUR TOP SHOP</h3>
            </div>
            <div className='wrap-shop-profile'>
                {
                    imageProfiles.map((ip, idx)=>{
                        return(
                            <div key={idx}>
                                <img src={ip} />
                            </div>
                        )
                    })
                }
            </div>
            <div className='wrap-shops'>
                {
                    topShops.map((to, idx) =>{
                        return(
                            <div className='wrap-top-shop' key={idx}>
                                <Link to={`/shop-home-page/${to.ShopID}`} state={{
                                    shop_id: to.ShopID.trim(),
                                    shop_name: to.ShopName.trim()
                                }}><p>{to.ShopName}</p></Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
