import React, { useEffect, useState } from 'react'
import './style/detailproduct.scss'
import Navbar from '../../component/Navbar'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { getDownloadURL, listAll, ref, uploadBytes, uploadString } from 'firebase/storage'
import { db, storage } from '../../firebase/firebase'
import UserFooter from './UserFooter'
import ModalAddtoWishlist from './ModalAddtoWishlist'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

export default function DetailProductUser() {

    const location = useLocation()
    const [image, setImage] = useState('')
    const [productid, setProductid] = useState('')
    const [productName, setProductName] = useState('')
    const [productdesc, setProductdesc] = useState('')
    const [productprice, setProductprice] = useState(0)
    const [shopName, setShopName] = useState('')
    const [shopid, setShopid] = useState<string>('')
    const [userid, setUserid] = useState<string>('')
    const [categoryid, setCategoryid] = useState('')
    const [orderqty, setOrderqty] = useState<any>(0)

    const [currLogin, setCurrLogin] = useState<string>('')

    const [similarProduct, setSimilarProduct] = useState<any[]>([])

    const [imageUrls, setImageUrls] = useState<any[]>([])

    const [isBanned, setisBanned] = useState<boolean>(false)

    const [productqty, setProductqty] = useState(0)

    const [wishlistid, setwishlistid] = useState<string>('')

    const [clickModal, setClickModal] = useState<boolean>(false)

    const getData = () => {
        console.log(location.state.productid)
        console.log(location.state.productdesc)
        console.log(location.state.productname)
        console.log(location.state.image)
        console.log(location.state.productprice)
        console.log(location.state.categoryid)
        console.log(location.state.qty)

        setProductid(location.state.productid)
        setImage(location.state.image)
        setProductName(location.state.productname)
        setProductdesc(location.state.productdesc)
        setProductprice(location.state.productprice)
        setCategoryid(location.state.categoryid)
        setProductqty(location.state.qty)

        categoryListImage()
        getShopData()
        getSimilarProduct()
        validateShopBan()

    }

    //get shop data 
    const getShopData = async () => {
        await fetch(`http://localhost:8000/api/product/get-shop-detail/${location.state.productid}`, {
            method: 'GET',
            headers : {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setShopName(data.shop.ShopName)
            setShopid(data.shop.ShopID)
        })
    }

    const getSimilarProduct = async () => {
        await fetch(`http://localhost:8000/api/product/get-similar-product/${location.state.categoryid}`, {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.products)
            setSimilarProduct(data.products)
        })
    }

    const validateShopBan = async () => {
        await fetch(`http://localhost:8000/api/product/is-product-banned/${location.state.productid}`, {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.shop.ShopStatus);
            (data.shop.ShopStatus==='')?setisBanned(false):setisBanned(true)
        })
    }

    //get current user login 
    const getCurrLogin = async () => {
        await fetch("http://localhost:8000/api/users/me",{
            method: 'GET',
            headers: {
              'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setCurrLogin(data.data.user.first_name)
            setUserid(data.data.user.id)
        })
    }

    //add to cart 
    const addCart = async () => {

        let num1 = Math.floor(Math.random()*9+1).toString()
        let num2 = Math.floor(Math.random()*9+1).toString()
        let num3 = Math.floor(Math.random()*9+1).toString()

        let id = "CRT"+num1+num2+num3

        if(currLogin === '' )
        {
            alert('you must login first !')
        }
        else if(productqty === 0 || productqty > location.state.qty){
            alert('the product can not 0 or more than the stock')
        }
        else{

            await fetch(`http://localhost:8000/api/cart/add-cart/${productqty}`, {
                method: 'POST',
                body: JSON.stringify({
                    cartid: id,
                    productid: location.state.productid.trim(),
                    userid: currLogin,
                    qty: parseInt(orderqty),
                    totalprice: parseInt(orderqty) * productprice
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data)
            })

        }

    }


   


    //get users wishlist 
    const getUserWishlist = async () => {
        await fetch("http://localhost:8000/api/wishlist/add-to-wishlist", {
            method: 'POST',
            body: JSON.stringify({
                userid: userid
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>res.json())
        .then(async (data)=>{
            console.log(data)
            console.log(data.wishlist[0].WishlistID)
            setwishlistid(data.wishlist[0].WishlistID)
            setClickModal(true)


            const docRef = await addDoc(collection(db, `wishlist-image-url-${data.wishlist[0].WishlistID}-${userid}-${location.state.productid}`), {
                productid: location.state.productid,
                url: location.state.image
            });
            console.log(docRef.id)
        })



    }

    const categoryListImage = () => {
        
        console.log(categoryid)
        console.log(`image-product-category-${location.state.categoryid}/`)
        const imageListRef = ref(storage, `image-product-category-${location.state.categoryid.trim()}/`)
        listAll(imageListRef)
        .then((res)=>{
            res.items.forEach((itemRef)=>{
                getDownloadURL(itemRef).then((url)=>{
                    setImageUrls((prev)=>[...prev, url])
                })
            })
        })
    }

    useEffect(()=>{    
        getCurrLogin()
        getData()
    }, [])

  return (
    <div>
        <Navbar />
        {
            (isBanned===false) ? (
            <div className='wrap-detail-page'>
                {
                    clickModal === true && (
                        <ModalAddtoWishlist productid={productid} shopid={shopid} wishlistid={wishlistid} 
                        productprice={productprice} />
                    )
                }
               
                <div className='wrap-flex-product'>
                    <div className='wrap-img'>
                        <img src={image} />
                    </div>
                    <div className='wrap-info'>
                        <div>
                            <h3>{productName}</h3>
                        </div>
                        <div>
                            <p>{productdesc}</p>
                        </div>
                    </div>
                    <div className='wrap-order'>
                        <div className='wrap-comp-order'>
                            <div className='comp-shop-name'>
                                <p>Sold and shipped by: {shopName}</p>
                            </div>
                            <div className='comp-price'>
                                <h2>Rp{productprice}</h2>
                            </div>
                            <div className='qty-and-cart'>
                                <div className='qty'>
                                    <input type={'number'} min={0} value={orderqty} onChange={(e)=>setOrderqty(e.target.value)} />
                                </div>
                                <div className='btn-cart'>
                                    <button onClick={addCart}>CART</button>
                                </div>
                            </div>
                            <div className='manage-wishlist'>
                                <div className='wrap-compare'>
                                    <div className='wrap-add-to-compare'>
                                        <input type={'checkbox'} />
                                        <p>ADD TO COMPARE</p>
                                    </div>
                                    <div className='alert-price'>
                                        <FontAwesomeIcon icon={faBell} className='bell' />
                                        <p>PRICE ALERT</p>
                                    </div>
                                </div>
                                <div className='add-wish-list'>
                                    <FontAwesomeIcon icon={faHeart} className='wishlist' />
                                    <p onClick={()=>getUserWishlist()}>Add to List</p>
                                </div>
                            </div>
                            <div className='wrap-goto-seller-follow'>
                                <div className='header'>
                                    <p>MEET YOUR SELLERS</p>
                                </div>  
                                <div className='comp-store'>
                                    <div>
                                        <p>{shopName}</p>
                                        <div className='go-seller-follow'>
                                            <div>
                                                <p>See Seller Store</p>
                                            </div>
                                            <div>
                                                <button>FOLLOW</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='wrap-box-similar'>
                        <div className='header'>
                            <h3>SIMILAR PRODUCT</h3>
                        </div>
                        <div className='body'>
                            <div className='wrap-product'>
                                <div className='wrap-image'>
                                    {
                                        imageUrls.map((im, idx)=>{
                                            return(
                                                <div key={idx}>
                                                    <img src={im} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='wrap-db'>
                                    {
                                        similarProduct.map((sp, idx)=> {
                                            return(
                                                <div key={idx}>
                                                    <p>{sp.ProductName}</p>
                                                    <p>{sp.ProductPrice}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

            ) :
            <div className='banned message'>
                <h2>This Shop is Banned !</h2>
            </div>
        }
        <UserFooter />
    </div>
  )
}
