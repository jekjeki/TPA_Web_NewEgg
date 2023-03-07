import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShopNavbar from "../../ShopComponent/ShopNavbar";
import "./style/updateprodstyle.scss";

export default function UpdateProduct() {
  const [prodId, setProdId] = useState("");
  const [prodName, setProdName] = useState("");
  const [qty, setQty] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodDet, setProdDet] = useState("");
  const [shopEmail, setShopEmail] = useState("");

  const [loginEmail, setLoginEmail] = useState('')
  const navigate = useNavigate()


  const location = useLocation();
  const databefore = location.state;

  const getData = () => {
    setProdId(databefore.productid);
    setProdName(databefore.productname);
    setQty(databefore.qty);
    setProdPrice(databefore.productprice);
    setProdDesc(databefore.productdesc);
    setProdDet(databefore.productdetail);
    setShopEmail(databefore.shopemail);
  };

  //get current login 
  const getCurrentLogin = async () => {
    await fetch("http://localhost:8000/api/store/get-login-store", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      setLoginEmail(data.data.store.shopemail)
    })
  }

  //update 
  const updateData = async () => {
    await fetch('http://localhost:8000/api/store/update-store-product', {
      method: 'PUT',
      body: JSON.stringify({
        productid: prodId,
        productname: prodName,
        productstock: qty,
        productprice: prodPrice,
        productdesc: prodDesc,
        productdetail: prodDet,
        storeemail: loginEmail
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>res.json())

    navigate('/shop-dashboard-page')
  }

  useEffect(() => {
    getData();
    getCurrentLogin()
  }, []);

  return (
    <div>
      <ShopNavbar props={shopEmail} />
      <div className="wrap-update-page">
        <div className="wrap-comp">
          <div className="title">
            <h3>Update Page</h3>
          </div>
          <div className="wrap-body-page">
            <div className="wrap-tf-prodid">
                <div>
                  <p>Product ID</p>
                </div>
                <input value={prodId} disabled />
              </div>
            <div className="wrap-tf-prodname">
              <div>
                <p>Product Name</p>
              </div>
              <input
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
              />
            </div>
            <div className="wrap-tf-prodqty">
              <div>
                <p>Qty</p>
              </div>
              <input value={qty} onChange={(e) => setQty(e.target.value)} />
            </div>
            <div className="wrap-tf-prodprice">
              <div>
                <p>Product Price</p>
              </div>
              <input value={prodPrice} onChange={(e)=>setProdPrice(e.target.value)} />
            </div>
            <div className="wrap-tf-proddesc">
              <div>
                <p>Product Description</p>
              </div>
              <input value={prodDesc} onChange={(e)=>setProdDesc(e.target.value)} />
            </div>
            <div className="wrap-tf-proddet">
              <div>
                <p>Product Detail</p>
              </div>
              <input value={prodDet} onChange={(e)=>setProdDet(e.target.value)} />
            </div>
            <div className="wrap-btn">
              <div className="btn-update">
                <button onClick={()=>updateData()}>Update</button>
              </div>
              <div className="btn-cancel">
                <button>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
