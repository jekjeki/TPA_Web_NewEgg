import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../../component/Navbar'
import './style/publicwishlistdetail.scss'
import UserFooter from '../../component/UserFooter'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../../firebase/firebase'
import Comment from './Comment'
import DisplayComment from './DisplayComment'
import AddComponentModal from '../component/AddComponentModal'

export default function PublicWishlistDetail() {

    const location = useLocation()
    const [idUser, setIdUser] = useState<string>('')

    //use state data pass
    const [wishlistId, setWishlistId] = useState<string>('')
    const [products, setProducts] = useState<any[]>([])

    //use state get images 
    const [images, setImages] = useState<any[]>([])

 

    // get data in state 
    const getDataPass = () => {
        setWishlistId(location.state.wishlistid)
    }

    //const get current user login
    const getCurrLogin = async () => {
        await fetch("http://localhost:8000/api/users/me", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data) => {
            setIdUser(data.data.user.id)
        })
    }


    // wishlist add to cart 
    const addAllProductToCart = async() => {

        let num1 = Math.floor(Math.random()*9+0) 
        let num2 = Math.floor(Math.random()*9+0)
        let num3 = Math.floor(Math.random()*9+0)

        let CartId = 'CRT'+num1.toString()+num2.toString()+num3.toString()

        products.map(async (pr) => {
            let totalPrice = 0
            totalPrice += pr.product_price

            let qty = 1
            await fetch(`http://localhost:8000/api/wishlist/public-wishlist-detail-add-cart`, {
                method: 'POST', 
                body: JSON.stringify({
                    cartid: CartId.trim(),
                    productid: pr.product_id.trim(),
                    qty: 1,
                    userid: idUser.trim(),
                    totalprice: totalPrice,
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data)
            })

        })
    }

    //const get product | detail wishlist 
    const getAllProductDetail = async () => {
        await fetch(`http://localhost:8000/api/wishlist/get-product-wishlist-detail/${location.state.wishlistid}`,{
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setProducts(data.product)
        })
    }

    //const get all image in product 
    const getImageproduct = () => {
        const imageListRef = ref(storage, `wishlist-detail-public-${location.state.wishlistid}/`)
        listAll(imageListRef).then((res)=>{
            res.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImages((prev)=>[...prev, url])
                })
            })
        })
    }

    useEffect(()=>{
        getCurrLogin()
        getDataPass()
        getAllProductDetail()
        getImageproduct()
    }, [])

  return (
    <div>
        <Navbar />
        <div className='wrap-body-detail'>
            <div className='content'>
                <div className='content-right'>
                    <div className="wishlist-name">
                        <h3>{location.state.wishlistname}</h3>
                    </div>
                    <div className="btn-add-all-cart">
                        <button onClick={()=>addAllProductToCart()}>Add All Cart</button>
                    </div>
                </div>
                <div className='content-left'>
                    <div className='products'>
                        <div className="box-left">
                            {
                                images.map((image, idx)=>{
                                    return(
                                        <div className="image-detail" key={idx}>
                                            <img src={image} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='box-right'>
                        {
                            products.map((pr, idx)=>{
                                return(
                                    <div key={idx} className='boxes'>
                                        <div className="ctn-flex">
                                            <div>
                                                <p>{pr.product_name}</p>
                                            </div>
                                            <div>
                                                <p>{pr.product_price}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="qty">
                                                <p>{pr.qty}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <Comment wishlistid={location.state.wishlistid} userwlid={location.state.userwl_id.trim()} />    
                        <DisplayComment />           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UserFooter />
    </div>
  )
}
