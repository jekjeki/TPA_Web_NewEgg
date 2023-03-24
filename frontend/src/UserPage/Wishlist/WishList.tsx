import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import UserFooter from "../component/UserFooter";
import "./style/wishliststyle.scss";
import ModalWishlist from "../component/ModalWishlist";
import ManageModal from "./component/ManageModal";
import { Link } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";

export default function WishList() {
  const [clickCreateList, setClickCreateList] = useState<boolean>(false);
  const [clickManageList, setClickManageList] = useState<boolean>(false);

  const [userid, setUserid] = useState<string>("");
  const [wishlistName, setWishlistName] = useState<any[]>([]);

  const [wishlistprod, setWishlistprod] = useState<any[]>([]);

  const [images, setImages] = useState<any[]>([])

  let idxImg = 1
  // const [total, setTotal] = useState<number>(0)

  //get current login user
  const getCurrLoginUser = async () => {
    await fetch("http://localhost:8000/api/users/me", {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        setUserid(data.data.user.id);

        //get wishlists transaction - product | my lists page
        await fetch(
          `http://localhost:8000/api/wishlist/get-wishlists-transaction/${data.data.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json;charset=UTF-8",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setWishlistprod(data.wishlisttr);

          });

        //get wishlist name | current user login | my list
        await fetch(
          `http://localhost:8000/api/wishlist/get-user-wishlists/${data.data.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setWishlistName(data.wishlist_name);
          });
      });
  };

  //get image my lists 
  const getMyImages = () => {
    wishlistprod.map((wi)=>{
      const imageListRef = ref(storage, `my-wishlist-${wi.wishlist_id.trim()}`)
      listAll(imageListRef).then((res)=>{
        res.items.forEach((item)=>{
          getDownloadURL(item).then((url)=>{
            setImages((prev)=>[...prev, url])
          })
        })
      })

    })
  }

  useEffect(() => {
    getCurrLoginUser();
    getMyImages()
  }, []);

  return (
    <div>
      <Navbar />
      {userid === "" ? (
        <div>
          <p>Loading... </p>
        </div>
      ) : (
        <div className="core-page-wishlist">
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
                <Link to={"/follow-wishlist"}>
                  <p>Followed Lists</p>
                </Link>
              </div>
              <div>
                <Link to={"/public-wishlists"}>
                  <p>Public Lists</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="body-wishlist">
            <div className="wrap-btn">
              <div>
                <button onClick={() => setClickCreateList(true)}>
                  CREATE A LIST
                </button>
              </div>
              <div>
                <button onClick={() => setClickManageList(true)}>
                  MANAGE LISTS
                </button>
              </div>
              <ModalWishlist show={clickCreateList} />
              <ManageModal show={clickManageList} />
            </div>
            <div className="body-wishlists">
              <div className="wrap-box-wishlists">
                {wishlistName.map((wi, idx) => {
                  let totalPrice = 0;
                  return (
                    <div className="box" key={idx}>
                      <div className="layer1-box">
                        <div>
                          <Link to={`/user-wishlist-detail/${wi.WishlistID.trim()}`} state={{wishlist_id:wi.WishlistID.trim(),
                          wishlist_name: wi.WishlistName.trim()}}><p>{wi.WishlistName}</p></Link>
                        </div>
                        <div className="outer-wrap-product">
                          {wishlistprod.map((ws, idx) => {
                            if (wi.WishlistID === ws.wishlist_id) {
                              totalPrice += ws.totalprice;
                              return (
                                <div className="wrap-product" key={idx}>
                                  <div className="images">
                                    {
                                      images.map((ima,idx)=>{
                                        return(
                                          <div className="img" key={idx}>
                                            <img src={ima} />
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  <div>
                                    <p>{ws.product_name}</p>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                        <div className="wrap-total">
                          <p>{totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <UserFooter />
    </div>
  );
}
