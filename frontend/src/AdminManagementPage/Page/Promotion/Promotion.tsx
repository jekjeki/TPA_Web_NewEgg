import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../adminComponent/AdminNavbar'
import { storage } from '../../../firebase/firebase'
import './style/promotionStyle.scss'

export default function Promotion() {

    const [imageUpload, setImageUpload] = useState<any>(null)
    const [listPromos, setListPromos] = useState<any[]>([])
    const [urlClick, setUrlClick] = useState<any>('')

    const uploadFile = () => {
        if(imageUpload == null || imageUpload == undefined) return 
        const imageRef = ref(storage, 'image-carousel/'+imageUpload.name)
        uploadBytes(imageRef, imageUpload).then((snapshot)=>{
            alert('image uploaded !')
        })
    }

    //list the image 
    const ListPromo = () => {
        const listRef = ref(storage, 'image-carousel/')
        listAll(listRef)
        .then((res)=>{
            res.items.forEach((itemRef)=>{
                getDownloadURL(itemRef).then((url)=>{
                    setListPromos((prev)=>[...prev, url])
                })
            })
        })
    }

    //delete 
    const deletePromo = (li:any) => {
       const dataRef = ref(storage, li)
       deleteObject(dataRef).then(()=>{
        alert('image has been delete')
       })
       .catch((err)=>{
        console.log(err)
       })

    }

    useEffect(()=>{
        ListPromo()
    }, [])

  return (
    <div>
        <AdminNavbar />
        <div className='wrap-uplaod-image-promotions'>
            <div className='wrap-input-image'>
                <input
                type={'file'}
                onChange={(e)=>setImageUpload((e.target.files != null)?e.target.files[0]:'')}
                />
                <div className='wrap-btn-add-promo'>
                    <button onClick={()=>uploadFile()}>Add Promo</button>
                </div>
            </div>
            <div className='wrap-list-promotions'>
                <div>
                    {
                        listPromos.map((li, idx) => {
                            return(
                                <div key={idx} className='wrap-image'>
                                    <img src={li}/>
                                    <div className='wrp-btn'>
                                        <button onClick={()=>deletePromo(li)}>delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
