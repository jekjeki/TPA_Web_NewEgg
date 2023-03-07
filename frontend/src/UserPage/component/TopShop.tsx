import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase/firebase'
import './style/topshopstyle.scss'
import { Link } from 'react-router-dom'

export default function TopShop() {

    const [topShop, setTopShop] = useState<any[]>([])

    const [imageTop1, setImageTop1] = useState<any>('')
    const [imageTop2, setImageTop2] = useState<any>('')
    const [imageTop3, setImageTop3] = useState<any>('')

    const getTopShop = async () => {
        await fetch("http://localhost:8000/api/product/top-shop-home", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setTopShop(data.products)
        })
    }

    const topshop1 = ref(storage, 'product-images-SP001/Screen Shot 2023-02-26 at 10.06.23.png')
    const topshop3 = ref(storage, 'product-images-SP002/fifa23-tpa.jpeg')
    const topshop2 = ref(storage, 'product-images-SP003/komputer2-tpa.jpeg')

    useEffect(()=>{
        getTopShop()

        getDownloadURL(topshop1)
        .then((url)=>{
            setImageTop1(url)
        })

        getDownloadURL(topshop2)
        .then((url)=>{
            setImageTop2(url)
        })

        getDownloadURL(topshop3)
        .then((url)=>{
            setImageTop3(url)
        })

    }, [])

  return (
    <div className='top-shop-comp'>
        <div className='header'>
            <h3>OUR BEST SHOP</h3>
        </div>
        <div className='body'>
            <div className='image-top'>
                <div className='image-top-1'>
                    <img src={imageTop1} />
                </div>
                <div className='image-top-2'>
                    <img src={imageTop2} />
                </div>
                <div className='image-top-3'>
                    <img src={imageTop3} />
                </div>
            </div>
            <div className='data-db'>
                {
                    topShop.map((tp, idx)=>{
                        return(
                            <div key={idx} className='wrap-card'>
                                <Link to={`/detail-product/${tp.ProductID}`} state={{productid: tp.ProductID, image:(tp.ProductID.trim()==='PR775')?imageTop3:(tp.ProductID.trim()==='PR001')?imageTop2:imageTop1, productname:tp.ProductName, productdesc: tp.ProductDescription, productprice: tp.ProductPrice
                            , categoryid: tp.CategoryID, qty: tp.Qty }}>
                                <div>
                                    <p>{tp.ProductName}</p>
                                </div>
                                <div>
                                    <p>{tp.ProductPrice}</p>
                                </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}
