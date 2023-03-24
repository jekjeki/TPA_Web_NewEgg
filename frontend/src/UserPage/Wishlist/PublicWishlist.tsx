import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { storage } from "../../firebase/firebase";
import UserFooter from "../component/UserFooter";
import "./style/publicwishliststyle.scss";

export default function PublicWishlist() {

    const [wishlist, setWishlist] = useState<any[]>([])
    const [productTr, setProductTr] = useState<any[]>([])
    const [publicWishlistTr, setPublicWishlistTr] = useState<any[]>([])
    const [getCurrLogin, setCurrLogin] = useState<string>('')

    //data duplicate 
    const [productid, setProductId] = useState<any>('')
    const [shopid, setShopId] = useState<any>('')
    const [productPrice, setProductPrice] = useState<number>(0)

    //usestate image 
    const [productImages, setProductImages] = useState<any[]>([])

    // ima for loop image   
    let ima = 1


    //get current user login
    const getCurrentUserLogin = async () => {
        await fetch("http://localhost:8000/api/users/me", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setCurrLogin(data.data.user.id)
        })
    }

    // get wishlist type public 
    const getPublicWishlist = async() => {
        await fetch("http://localhost:8000/api/wishlist/get-wishlist-public", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setWishlist(data.wishlist)
        })
    }

    // get wishlisttr product
    const getProductWishlistTr = async () => {
        await fetch("http://localhost:8000/api/wishlist/get-wishlisttr-product", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setProductTr(data.result)
        })
    }

    // get public wishlisttr 
    const getPublicWishlistTr = async () => {
        await fetch("http://localhost:8000/api/wishlist/public-wishlist-tr", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setPublicWishlistTr(data.public_wishlist_tr)
        })
    }


    // add follow wishlist 
    const AddFollowWishlist = async (wishlistid:{wishlistid:string}) => {

        let num1 = Math.floor(Math.random()*9+0)
        let num2 = Math.floor(Math.random()*9+0)
        let num3 = Math.floor(Math.random()*9+0)

        let follow_id = 'FOL'+num1.toString()+num2.toString()+num3.toString()

        await fetch("http://localhost:8000/api/wishlist/add-follow-wishlist", {
            method: 'POST',
            body: JSON.stringify({
                follow_wishlist_id: follow_id,
                wishlist_id: wishlistid,
                user_id: getCurrLogin
            }),
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>console.log(res.json()))
    }


    // duplicate public wishlist to my lists 
    const duplicateToMyLists = async (wishlistid:string, wishlistname:string) => {

        let num1 = Math.floor(Math.random()*9+0)
        let num2 = Math.floor(Math.random()*9+0)
        let num3 = Math.floor(Math.random()*9+0) 

        let id = 'WT'+num1.toString()+num2.toString()+num3.toString()


        // create wishlist id 
        let num4 = Math.floor(Math.random()*9+0)
        let num5 = Math.floor(Math.random()*9+0)
        let num6 = Math.floor(Math.random()*9+0)

        let wishlist_id = 'WH'+num4.toString()+num5.toString()+num6.toString()

        //create wishlist to curent logibn
        await fetch("http://localhost:8000/api/wishlist/create-wishlist", {
            method: 'POST',
            body: JSON.stringify({
                wishlistid: wishlist_id, 
                wishlist_name: wishlistname,
                wishlist_type: 'private'
            }),
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })

        //add data to wishlisttransactions 
        await fetch(`http://localhost:8000/api/wishlist/duplicate-data-to-my-lists`, {
            method: 'POST',
            body: JSON.stringify({
                wishtrID: id,
                UserID: getCurrLogin,
                wishlistID: wishlist_id,
                totalqty: 1,
                totalprice: productPrice,
                shopID: shopid,
                productID: productid
            })
        })
        .then((res)=>console.log(res.json()))
    }

    //associate data click duplcate 
    const getDataProductShop = (productid:string,shopid:string, productprice:number) => {
        setProductId(productid)
        setShopId(shopid)
        setProductPrice(productprice)
    }


    //get all image data 
    const imagesListRef = ref(storage, `/wishlist-top-${ima}`)
    const getAllImage = () => {
        listAll(imagesListRef).then((res)=>{
            res.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setProductImages((prev) => [...prev, url])
                })
            })
        })
    }


    useEffect(()=>{
        getPublicWishlist()
        getProductWishlistTr()
        getPublicWishlistTr()
        getCurrentUserLogin()
        getAllImage()
    }, [])

  return (
    <div>
      <Navbar />
      <div className="wrap-page-wishlist">
        <div className="header-core-page">
          <div className="breadcrumb">
            <div>
              <p>Home</p>
              <p>&gt;</p>
              <p>Wish List</p>
            </div>
          </div>
          <div className="header-wish-list">
            <div>
              <h3>WISH LIST</h3>
            </div>
            <div>
              <Link to={'/wish-list'}><p>My Lists</p></Link>
            </div>
            <div>
              <Link to={'/follow-wishlist'}><p>Followed Lists</p></Link>
            </div>
            <div>
              <Link to={"/public-wishlists"}>
                <p>Public Lists</p>
              </Link>
            </div>
          </div>
          <div className="body">
            <div className="wrapbox">
                {
                    wishlist.map((wi, idx)=>{
                        return(
                            <div className="box" key={idx}>
                                <div className="header-box">
                                    <div>
                                        <p>{wi.WishlistName}</p>
                                    </div>
                                    <div className="totalprice">
                                        {
                                            publicWishlistTr.map((pwt, idx)=>{
                                                if(pwt.wishlist_id.trim()===wi.WishlistID.trim()){
                                                    return(
                                                        <div key={idx}>
                                                            <Link to={`/public-wishlist-detail/${pwt.wishlist_id.trim()}`} state={{wishlistid:pwt.wishlist_id, wishlistname: wi.wishlist_name, userwl_id: pwt.userwl_id}}><p>{pwt.totalprice}</p></Link>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="wrap-follow-duplicate">
                                    <div>
                                        <p onClick={()=>AddFollowWishlist(wi.WishlistID.trim())}>follow</p>
                                    </div>
                                    <div>
                                        <p onClick={()=>duplicateToMyLists(wi.WishlistID.trim(), wi.WishlistName.trim())}>duplicate</p>
                                    </div>
                                </div>
                                <div className="body-box">
                                    <div className="product">
                                        {
                                            productTr.map((pr, idx)=>{
                                                if(wi.WishlistID === pr.wishlistid)
                                                {
                                                    return(
                                                        <div key={idx}>
                                                            <div className="image">
                                                                {
                                                                    productImages.map((pi, idx)=>{
                                                                        return(
                                                                            <div key={idx}>
                                                                                <img src={pi} />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div>
                                                                <p onClick={()=>getDataProductShop(pr.product_id.trim(),pr.shop_id.trim(), pr.product_price)}>{pr.product_name}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    <div className="totalprice">
                                        {
                                            publicWishlistTr.map((pwt, idx)=>{
                                                if(pwt.wishlist_id.trim()===wi.WishlistID){
                                                    return(
                                                        <div key={idx}>
                                                            <p>{pwt.totalprice}</p>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        ima++
                    })
                }
            </div>
          </div>
        </div>
        <UserFooter />
      </div>
    </div>
  );
}
