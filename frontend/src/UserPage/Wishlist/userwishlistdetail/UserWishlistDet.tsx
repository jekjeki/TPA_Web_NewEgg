import { async } from "@firebase/util";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../component/Navbar";
import { storage } from "../../../firebase/firebase";
import UserFooter from "../../component/UserFooter";
import MyListDetailModal from "../component/MyListDetailModal";
import "./style/userwishlistdetstyle.scss";

export default function UserWishlistDet() {
  const location = useLocation();

  const [products, setProducts] = useState<any[]>([]);

  const [images, setImages] = useState<any[]>([]);

  const [show, setShow] = useState<boolean>(false);

  //click button add notes
  const [clickAddNotes, setClickAddNotes] = useState<boolean>(false);

  const [notesName, setNotesName] = useState<string>("");

  const [newQty, setNewQty] = useState<any>(0);

  const [clickqty, setClickqty] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>('')


  // get users data 
  const getUsersData = async () => {
    await fetch("http://localhost:8000/api/users/me", {
        method: 'GET', 
        headers: {
            'Content-type':'application/json'
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        setUserId(data.data.user.id)

        
    })
  }

  //get products in detail my wishlist page
  const getProductsMyWishlistDetail = async () => {
    await fetch(
      `http://localhost:8000/api/wishlist/get-product-my-wishlist-detail/${location.state.wishlist_id.trim()}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  //add new notes
  const AddNewNotes = async () => {
    let num1 = Math.floor(Math.random() * 9 + 0);
    let num2 = Math.floor(Math.random() * 9 + 0);
    let num3 = Math.floor(Math.random() * 9 + 0);

    let id = "NT" + num1.toString() + num2.toString() + num3.toString();

    await fetch("http://localhost:8000/api/notes/add-notes", {
      method: "POST",
      body: JSON.stringify({
        note_id: id,
        note_name: notesName,
      }),
    }).then((res) => res.json());

    // add new transactions
    let num4 = Math.floor(Math.random() * 9 + 0);
    let num5 = Math.floor(Math.random() * 9 + 0);
    let num6 = Math.floor(Math.random() * 9 + 0);

    let notetrId = "NTR" + num4.toString() + num5.toString() + num6.toString();

    await fetch("http://localhost:8000/api/notes/add-new-transactions-notes", {
      method: "POST",
      body: JSON.stringify({
        notetr_id: notetrId,
        wishlist_id: location.state.wishlist_id.trim(),
        note_id: id,
      }),
    }).then((res) => res.json());
  };

  //update product qty
  const UpdateProductQty = async ({ productid }: { productid: any }) => {
    await fetch(
      `http://localhost:8000/api/wishlist/update-qty-mywishlist-detail/${productid.trim()}`,
      {
        method: "PUT",
        body: JSON.stringify({
          total_qty: newQty,
        }),
      }
    ).then((res) => res.json());
  };

  // my wishlist detail | add all product to carts 
  const MyWishlistDetailAddToCart = async () => {

      products.map(async (pr)=>{

        let num1 = Math.floor(Math.random()*9+0)
        let num2 = Math.floor(Math.random()*9+0)
        let num3 = Math.floor(Math.random()*9+0)
    
        let cartId = 'CRT'+num1.toString()+num2.toString()+num3.toString()

        await fetch("http://localhost:8000/api/wishlist/add-carts-mywishlist-detail", {
            method: 'POST', 
            body: JSON.stringify({
                cart_id: cartId, 
                product_id: pr.ProductID.trim(), 
                user_id: userId, 
                total_qty: pr.Qty 
            }),
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
    })

  }

  // delete product in my wishlist detail page 
  const deleteProductData = async (productid:any) => {
    await fetch(`http://localhost:8000/api/wishlist/delete-product-mywishlist-detail/${location.state.wishlist_id.trim()}`, {
        method:'DELETE',
        body: JSON.stringify({
            product_id: productid
        }),
        headers: {
            'Content-type':'application/json'
        }
    })
    .then((res)=>console.log(res.json()))
  }

  // get product image in detail page
  const getProductImages = () => {
    const imageListRef = ref(
      storage,
      `wishlist-detail-public-${location.state.wishlist_id.trim()}/`
    );
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImages((prev) => [...prev, url]);
        });
      });
    });
  };

  useEffect(() => {
    getUsersData()
    getProductsMyWishlistDetail();
    getProductImages();
  }, []);

  return (
    <div>
      <Navbar />
      <MyListDetailModal
        show={show}
        WishlistName={location.state.wishlist_name}
      />
      <div className="wrap-page">
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
              <Link to={"/wish-list"}>
                <p>My Lists</p>
              </Link>
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
        <div className="body-page">
          <div className="body-core">
            <div className="left">
              <div className="wrap">
                <div className="header">
                  <p>{location.state.wishlist_name}</p>
                </div>
                <div className="wrap-setting">
                  <button onClick={() => setShow(true)}>SETTING</button>
                </div>
                <div className="add-all-cart">
                    <button onClick={()=>MyWishlistDetailAddToCart()}>
                        Add All Carts
                    </button>
                </div>
                {!clickAddNotes && (
                  <div className="addNote">
                    <button onClick={() => setClickAddNotes(true)}>
                      Add Notes
                    </button>
                  </div>
                )}
                {clickAddNotes && (
                  <div className="wrap-notes">
                    <div>
                      <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={10}
                        value={notesName}
                        onChange={(e) => setNotesName(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <button onClick={() => AddNewNotes()}>Add</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="right">
              <div className="wrap-right-left">
                <div className="left">
                  <div className="wrap-images">
                    {images.map((im, idx) => {
                      return (
                        <div className="image" key={idx}>
                          <img src={im} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="right">
                  {products.map((pr, idx) => {
                    return (
                      <div className="box" key={idx}>
                        <div className="align-left">
                          <div className="product-name">
                            <p>{pr.ProductName}</p>
                          </div>
                          <div className="product-price">
                            <p>{pr.ProductPrice}</p>
                          </div>
                        </div>
                        <div className="align-right">
                          <div className="wrap-update">
                            <div>
                              <input
                                value={clickqty ? newQty : 1}
                                onChange={(e) => setNewQty(e.target.value)}
                                onClick={() => setClickqty(!clickqty)}
                              />
                            </div>
                            <div>
                              <button
                                onClick={() => UpdateProductQty(pr.ProductID)}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                          <div>
                            <button onClick={()=>deleteProductData(pr.ProductID)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}
