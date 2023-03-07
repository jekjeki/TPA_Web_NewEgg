import React, { useEffect, useState } from 'react'
import ShopFooter from '../../ShopComponent/ShopFooter'
import './style/updateshopstyle.scss'
import ShopNavbar from '../../ShopComponent/ShopNavbar'
import { deleteObject, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase/firebase'

export default function UpdateShopInformation() {

  const [loginEmail, setLoginEmail] = useState('')
  const [currShopId, setCurrShopId] = useState('')
  const [newShopName, setNewShopName] = useState('')
  const [newShopAbout, setNewSHopAbout] = useState('')

  const [imageUpload, setImageUplaod] = useState<any>(null)

  //get curr user
  const currUser = async () => {
    await fetch("http://localhost:8000/api/store/get-login-store", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      setLoginEmail(data.data.store.shopemail)
      setCurrShopId(data.data.store.shopid)
    })
  }

  //update the  data
  const updateShopData = async () => {
    await fetch("http://localhost:8000/api/store/update-shop-profile", {
      method: 'PUT',
      body: JSON.stringify({
        shopid: currShopId,
         shopname: newShopName,
         shopabout: newShopAbout
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>res.json())
  }

  const deleteImageOld = () => {
    const deleteRef = ref(storage, `profile-shop-${currShopId}/`)
    if(deleteRef===null) return 
    deleteObject(deleteRef).then(() => {
      // File deleted successfully
      console.log('success')
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
    });
  }

  //upload image profile shop 
  // const imageListRef = ref(storage, `profile-shop-${currShopId}/`)
  const uploadFile = () => {
    if(imageUpload == null || imageUpload == undefined) return 
    const imageRef = ref(storage, `profile-shop-${currShopId}/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then((snapshot)=>{
      console.log('image uploaded')
    })
  }

  const updateAllData = () => {
    deleteImageOld()
    uploadFile()
    updateShopData()
  }

  useEffect(()=>{
    currUser()
  }, [])

  return (
    <div>
      <ShopNavbar props={loginEmail} />
        <div className='wrap-body-si'>
            <div className='wrap-menu-si'>
              <div className='header'>
                  <div>
                      <p>Update Shop Information</p>
                  </div>
              </div>
              <div className='body'>
                <div className='wrap-shop-name'>
                  <p>Shop Name:</p>
                  <input value={newShopName} onChange={(e)=>setNewShopName(e.target.value)} />
                </div>
                <div className='wrap-shop-about'>
                  <p>About Us:</p>
                  <input value={newShopAbout} onChange={(e)=>setNewSHopAbout(e.target.value)} />
                </div>
                <div className='wrap-img-shop'>
                  <p>Profile image:</p>
                  <img src={(imageUpload===null)?'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png':''} className='img' />
                  <input type={'file'} onChange={(e)=>setImageUplaod((e.target.files!=null)?e.target.files[0]:'')} />
                </div>
                <div className='wrap-btn'>
                  <div className='btn-update'>
                    <button onClick={()=>updateAllData()}>Update</button>
                  </div>
                  <div className='btn-cancel'>
                    <button>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <ShopFooter />
    </div>
  )
}
