import { getDownloadURL, listAll, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase/firebase'
import './style/popularcategories.scss'

export default function PopularCategories() {

    const [categoryName, setCategoryName] = useState<any[]>([])
    const [imageUrls, setImageUrls] = useState<any[]>([])

    const getPopularCategory = async () => {
        await fetch('http://localhost:8000/api/category/popular-categories', {
            method: 'GET',
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.category)
            setCategoryName(data.category)
        })
    }

    const imageListRef = ref(storage, 'popular-categories/')
    useEffect(()=>{
        getPopularCategory()
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setImageUrls((prev) => [...prev, url]);
              });
            });
          });
    }, [])

  return (
    <div className='wrap-popular-category'>
        <div className='header'>
            <h3>Popular Categories</h3>
        </div>
        <div className='wrap-box-category'>
            <div className='wrap-image'>
                {
                    imageUrls.map((iu, idx)=>{
                        return(
                            <div key={idx} className='image-popular'>
                                <img src={iu} />
                            </div>
                        )
                    })
                }
            </div>
            <div className='wrap-title'>
                {
                    categoryName.map((ca,idx)=>{
                        return(
                            <div key={idx} className='box-popular'>
                                <p>{ca.CategoryName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
