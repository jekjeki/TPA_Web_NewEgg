import React, { useEffect, useState } from 'react'
import './style/navCategory.scss'
import { getStorage, ref } from 'firebase/storage'
import { storage } from '../firebase/firebase'

export default function NavCategories() {

    const [categories, setCategories] = useState<any[]>([])


    let getCategories = async () => {
        await fetch('http://localhost:8000/api/category/categories', {
            method: 'GET',
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>res.json())
        .then(data => {
            console.log(data.categories)
            setCategories(data.categories)
        })
    }

    useEffect(()=>{
        getCategories()
    }, [])

  return (
    <div className='wrap-recommend-categories'>
        {
            categories.map((ca, idx)=>{
                return(
                    <div className='category' key={idx}>
                        <p>{ca.CategoryName}</p>
                    </div>
                )
            })
        }
    </div>
  )
}
