import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { storage } from '../firebase/firebase'
import './style/categoryInterest.scss'

export default function CategoryInterest() {

  const [imageList, setImageList] = useState<any[]>([])
  const [productInterest, setProductInterest] = useState<any[]>([])

  const categoryImageRef = ref(storage, 'categories-interest/')
  const productInterestImageRef = ref(storage, 'product-may-interest/')
 

  useEffect(() => {
    listAll(categoryImageRef).then((res)=>{
      res.items.forEach((item)=>{
        getDownloadURL(item).then((url) => {
          setImageList((prev)=>[...prev, url])
        })
      })
    })

    listAll(productInterestImageRef).then((res)=>{
      res.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setProductInterest((prev)=>[...prev, url])
        })
      })
    })

  }, [])

  return (
    <div className='wrap-flex-box'>
      <div className='user-name-login'>
        <div className='title'>
          <p>SIGN IN FOR THE BEST EXPERIENCE</p>
        </div>
        <div className='btn-signin'>
          <button>SIGN IN</button>
        </div>
        <div className='wrap-signup'>
          <p>New to Newegg?</p>
          <p>SIGN UP</p>
          <p>{`>`}</p>
        </div>
      </div>
      <div className='recently-viewed'>
        <p>CATEGORIES YOU MAY BE INTERESTED IN</p>
        <div className='wrap-image'>
          {imageList.map((il, idx)=>(
            <div key={idx} className='img'>
              <img src={il} alt='img' />
            </div>
          ))}
        </div>
        <div className='wrap-title'>
          <p>Gaming</p>
          <p>Office & Accounting</p>
        </div>
      </div>
      <div className='product-interested-in'>
        <p>PRODUCT YOU MAY BE INTERESTED IN</p>
        <div className='wrap-product-interest'>
            {productInterest.map((pi, idx)=>(
              <div key={idx}>
                <img src={pi} alt='img'/>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
