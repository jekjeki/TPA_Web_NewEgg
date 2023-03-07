import { faBookOpen, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ShopNavbar from '../ShopComponent/ShopNavbar'
import './style/shopdashboardstyle.scss'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import ShopFooter from '../ShopComponent/ShopFooter'
import { storage } from '../firebase/firebase'
import { getDownloadURL, listAll, ref } from 'firebase/storage'

export default function ShopDashboardPage() {

  const [loginEmail, setLoginEmail] = useState('')
  const [shopId, setShopId] = useState('')
  const [shopName, setShopName] = useState('')
  const [shopAbout, setShopAbout] = useState('')
  const [imageUrls, setImageUrls] = useState<any[]>([])

  //curr user 
  const currUser = async () => {
    const response = await axios.get('http://localhost:8000/api/store/get-login-store', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    setLoginEmail(response.data.data.store.shopemail)
    setShopId(response.data.data.store.shopid)
  }

  //shop curr information
  const getShopInformation = async () => {
    await fetch(`http://localhost:8000/api/store/store-information-data/${shopId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.shopinfo)
      setShopName(data.shopinfo.ShopName)
      setShopAbout(data.shopinfo.ShopAbout)
    })
  }


  const imageListRef = ref(storage, `profile-shop-${shopId}/`)

  useEffect(()=>{
    // sessionStorage.getItem("access_token")
    currUser()
    getShopInformation()

    listAll(imageListRef).then((res)=>{
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    })
  },[])

  const data = {
    email: loginEmail,
    shopid: shopId
  }

  return (
    <div>
      <ShopNavbar props={loginEmail}/>
      <div className='your-shop-information'>
        {
          imageUrls.map((img, idx)=>{
            return(
              <div key={idx} className='wrap-pp'>
                <img src={img} />
              </div>
            )
          })
        }
        <div className='shop-info-name-about'>
          <div>
            <h3>{shopName}</h3>
          </div>
          <div>
            <p>{shopAbout}</p>
          </div>
        </div>
      </div>
      <div className='wrap-body-dashboard'>
        <div className='wrap-box-1'>
          <FontAwesomeIcon icon={faWarehouse} className='warehouse' />
          <div>
            <p><Link to={'/product-page'} state={data}>Go Product Page</Link></p>
          </div>
        </div>
        <div className='wrap-box-2'>
          <FontAwesomeIcon icon={faBookOpen} className='bookOpen'/>
          <div>
            <p><Link to={'/update-shop-information'}>Update Shop Information</Link></p>
          </div>
        </div>
      </div>
      <ShopFooter />
    </div>
  )
}
