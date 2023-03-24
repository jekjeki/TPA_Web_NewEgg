import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";
import UserFooter from "../component/UserFooter";
import './style/followwishliststyle.scss'

export default function Followwishlist() {

    const [followWishlist, setFollowWishlist] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])
    const [userId, setUserId] = useState<any>('')

    // get current user login & followed wishlists 
    const getCurrLogin = async () => {
        await fetch("http://localhost:8000/api/users/me", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then(async (data)=>{

          setUserId(data.data.user.id)

          // get wishlist name 
            await fetch(`http://localhost:8000/api/wishlist/get-followed-wishlist/${data.data.user.id}`, {
                method: 'GET', 
                headers: {
                    'Content-type':'application/json'
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
              
                setFollowWishlist(data.wishlists)
            })
        })
    }


    // duplicate wishlist to my wishlists 
    const duplicateWishlist = async (wishlistid:any) =>{
      
      let num1 = Math.floor(Math.random()*9 + 1)
      let num2 = Math.floor(Math.random()*9 + 1)
      let num3 = Math.floor(Math.random()*9 + 1)    

      let uwl_id = "UWL"+num1.toString()+num2.toString()+num3.toString();

      await fetch("http://localhost:8000/api/wishlist/add-follow-wishlist-to-my-wishlist", {
        method: 'POST', 
        body: JSON.stringify({
          userwl_id: uwl_id.trim(),
          user_id: userId.trim(),
          wishlist_id: wishlistid.trim()
        })
      })
      .then((res)=>res.json())
    }

    // get products in followed wishlists 
    const getProducts = async () => {
      await fetch("http://localhost:8000/api/wishlist/get-products-follow-wishlist", {
        method: 'GET',
        headers: {
          'Content-type':'application/json'
        }
      })
      .then((res)=>res.json())
      .then((data)=>{
        setProducts(data.products)
        console.log(data.products)
      })
    }


    // delete follow wishlist 
    const deleteFollowWishlist = async (followWishlistId:any) => {
      await fetch("http://localhost:8000/api/wishlist/delete-follow-wishlist", {
        method: 'DELETE',
        body: JSON.stringify({
          follow_wishlist_id: followWishlistId
        })
      })
      .then((res)=>res.json())
    }

    useEffect(()=>{
        getCurrLogin()
        getProducts()
    }, [])

  return (
    <div>
      <Navbar />
      <div className="wrap-page-follow-wishlist">
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
        </div>
        <div className="body-follow-wishlist">
            <div className="wrap-comp-wishlist"> 
                {
                    followWishlist.map((fo, idx)=>{
                        return(
                            <div className="box-wishlist" key={idx}>
                                <div className="header">
                                    <p>{fo.wishlist_name}</p>
                                </div>
                                <div className="body">
                                  <div className="inside-body1">
                                    <div className="wrap-products">
                                      {
                                        products.map((pr, idx)=>{
                                          if(fo.wishlist_id.trim() === pr.wishlist_id)
                                          {
                                            return(
                                              <div key={idx}>
                                                <p>{pr.product_name}</p>
                                              </div>
                                            )
                                          }  
                                        })
                                      } 
                                    </div>
                                    <div className="wrap-duplicate-unfollow">
                                      <div className="duplicate-wishlist">
                                        <p onClick={()=>duplicateWishlist(fo.wishlist_id)}>Duplicate</p>
                                      </div>
                                      <div className="unfollow-wishlist">
                                        <p onClick={()=>deleteFollowWishlist(fo.follow_wishlist_id.trim())}>Unfollow</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}
