import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../firebase/firebase'
import React, { useEffect, useState } from 'react'
import './style/corousel.scss'
import CarouselItem from '../carousel/CarouselItem'
import CarouselControl from '../carousel/CarouselControl'
import NavCategories from './NavCategories'
import CategoryInterest from './CategoryInterest'


export default function Corousel() {

    const imageListRef = ref(storage, "image-carousel/")
    
    const [imageList, setImageList] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)

    const prev = () => {
        const idx = currentSlide > 0 ? currentSlide - 1 : imageList.length - 1 
        setCurrentSlide(idx)
    }

    const next = () => {
        const idx = currentSlide < imageList.length - 1 ? currentSlide + 1 : 0 
        setCurrentSlide(idx)
    }

    useEffect(()=>{

        listAll(imageListRef).then((res)=>{
            res.items.forEach((item)=>{
                getDownloadURL(item).then((url) => {
                    console.log(url)
                    setImageList((prev)=>[...prev, url])
                })
            })
        })

        const slideInterval = setInterval(() => {
            setCurrentSlide(currentSlide => currentSlide <= imageList.length-1 ? currentSlide+1 : 0)
            console.log('interval')
        }, 3000)

        return () => clearInterval(slideInterval)
        
    }, [])

  return (
    <div className='carousel-container'>
       <div className='carousel'>
            <div className='carousel-inner'
            style={{ transform: `translateX(${-currentSlide * 100}%)`}}>
                {imageList.map((li, idx)=>(
                   <CarouselItem slide={li} key={idx} />
                ))}
            </div>
            <CarouselControl prev={prev} next={next} />
            
       </div>
         <NavCategories />
         <CategoryInterest />
    </div>
  )
}
