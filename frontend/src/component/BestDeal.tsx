import React, { useEffect, useState } from 'react'
import './style/bestDeal.scss'
import Countdown from '../feature/Countdown'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase/firebase'

export default function BestDeal() {

  const [bestDeal, setBestDeal] = useState<any[]>([])
  const [firstImage, setFirstImage] = useState('')
  const [secondImage, setSecondImage] = useState('')
  const [thirdImage, setThirdImage] = useState('')
  const [fourImage, setFourImage] = useState('')
  const [fiveImage, setFiveImage] = useState('')

  //img best deal 
  const firstImageRef = ref(storage, 'best-deals/best-deal-1.png')
  const secondImageRef = ref(storage, 'best-deals/best-deal-2.jpeg')
  const thirdImageRef = ref(storage, 'best-deals/best-deal-3.png')
  const fourImageRef = ref(storage, 'best-deals/best-deal-4.jpeg')
  const fiveImageRef = ref(storage, 'best-deals/best-deal-5.jpeg')

  const fetchBestdealTrData = async () => {
    await fetch(`http://localhost:8000/api/product/bestdeal`, {
      method:'GET',
      headers: {
        'Content-type':'application/json;charset=UTF-8'
      }
    })
    .then(res=>res.json())
    .then((data)=>{
      console.log(data.bestdeal)
      setBestDeal(data.bestdeal)
    })
  }

  useEffect(()=>{
    fetchBestdealTrData()

    //first image 
    getDownloadURL(firstImageRef).then((url)=>{
        setFirstImage(url)
    })

    //second image 
    getDownloadURL(secondImageRef).then((url)=>{
      setSecondImage(url)
    })

    //third image 
    getDownloadURL(thirdImageRef).then((url)=>{
      setThirdImage(url)
    })

    //four image 
    getDownloadURL(fourImageRef).then((url)=>{
      setFourImage(url)
    })

    //five image
    getDownloadURL(fiveImageRef).then((url) => {
      setFiveImage(url)
    })
   
  }, [])

  return (
    <div className='best-deal'>
        <div className='header'>
            <div className='title'>
                <p>TODAY'S BEST DEAL</p>
            </div>
            <div>
                <Countdown />
            </div>
        </div>
        <div className='best-deal-body'>
            {
              bestDeal.map((data, idx) => {
                if(idx === 0){
                  return(
                    <div className='first-bestdeal-data' key={idx}>
                        <p>{data.ProductName}</p>
                        <p>${data.ProductPrice}</p>
                        <div className='wrap-image'>
                          <img src={firstImage} alt='first' />
                        </div>
                    </div>
                  )
                }
              })
            }
            <div className='grid-bestdeal'>
              <div className='grid-bestdeal-left'>
                {
                  bestDeal.map((data, idx)=>{
                    if(idx === 1){
                      return(
                        <div className='second-bestdeal-data' key={idx}>
                          <p>{data.ProductName}</p>
                          <p>${data.ProductPrice}</p>
                          <img src={secondImage} alt='second' />
                        </div>
                      )
                    }
                    if(idx === 2){
                      return(
                        <div className='third-bestdeal-data' key={idx}>
                          <p>{data.ProductName}</p>
                          <p>${data.ProductPrice}</p>
                          <img src={thirdImage} alt='third' />
                        </div>
                      )
                    }
                  })
                }
              </div>
              <div className='grid-bestdeal-right'>
                {
                  bestDeal.map((data, idx) => {
                    if(idx === 3){
                      return(
                        <div className='four-bestdeal-data' key={idx}>
                          <p>{data.ProductName}</p>
                          <p>{data.ProductPrice}</p>
                          <img src={fourImage} alt='four'/>
                        </div>
                      )
                    }
                    if(idx === 4){
                      return(
                        <div className='five-bestdeal-data' key={idx}>
                          <p>{data.ProductName}</p>
                          <p>{data.ProductPrice}</p>
                          <img src={fiveImage} alt='five' />
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
        </div>
    </div>
  )
}
