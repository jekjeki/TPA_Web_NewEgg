import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShopNavbar from "../../ShopComponent/ShopNavbar";
import './style/viewproductstyle.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faL } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ViewProduct() {
  let location = useLocation();
  const data = location.state;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectCat, setSelectCat] = useState<any>('')
  const [barClick, setBarClick] = useState(true)
  const [pointPage, setPointPage] = useState<any>({})
  const [viewProdbyCategory, setViewProdbyCategory] = useState<any[]>([])
  const [loginEmail, setLoginEmail] = useState('')

  //filter by category
  const filterProduct = async () => {
    await fetch('http://localhost:8000/api/store/get-filter-product', {
      method: 'POST',
      body: JSON.stringify({
        categoryid: selectCat,
        shopemail: loginEmail
      })
      , headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>res.json())
    .then((data) => {
      console.log(data.products)

    })
  }

  //get curent data 
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

  //product paginate 
  const getProductPaginate = async () => {
    await fetch(`http://localhost:8000/api/store/all-product/${page}`, {
      method: 'POST',
      body: JSON.stringify({
        shopemail:loginEmail
      }),
      headers: {
        'Content-type':'application/json;charset=UTF-8'
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      setProducts(data.products)
      setPointPage(data.pagination)
    })
  };

   //laod category 
   const LoadCategory = async () => {
    await fetch("http://localhost:8000/api/category/categories", {
        method:'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res)=>res.json())
    .then((dat)=>{
        console.log(dat.categories)
        setCategories(dat.categories)
    })
}

  useEffect(() => {
    
    LoadCategory()
    // filterProduct()
    getCurrentLogin()
    getProductPaginate();
  }, []);

  return (
    <div>
      <div className="wrap-table-product">
        <ShopNavbar props={loginEmail} />
        <div className="wrap-display-products">
          <div className="wrap-filter-product">
            <div>
              <FontAwesomeIcon icon={faBars} className='bars' onClick={()=>setBarClick(!barClick)} />
            </div>
              <select value={selectCat} style={{display:(barClick)?'block':'none',}} onChange={(e)=>setSelectCat(e.target.value)} className='select-category'>
                {
                  categories.map((ca,idx) => {
                    return(
                      <option key={idx} value={ca.ID}>{ca.CategoryName}</option>
                    )
                  })
                }
              </select>
          </div>
          <div className="wrap-title">
              <h3>View Your Product</h3>
          </div>
          <div className="table-list-products">
            <div className="wrap-table">
              <table>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((pr, idx)=>{
                      return(
                        <tr key={idx}>
                          <td>{pr.ProductID}</td>
                          <td>{pr.ProductName}</td>
                          <td>{pr.Qty}</td>
                          <td>{pr.ProductPrice}</td>
                          <td>{pr.ProductDescription}</td>
                          <td>{pr.ProductDetail}</td>
                          <td><Link to={`/update-product/${pr.ProductID}`} state={{productid: pr.ProductID, productname: pr.ProductName, qty:pr.Qty, productprice: pr.ProductPrice, productdesc:pr.ProductDescription, productdetail:pr.ProductDetail, shopemail: loginEmail}}>Update</Link></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="wrap-next-prev-btn">
              <button onClick={()=>setPage(pointPage.PrevPage)} disabled={(pointPage.PrevPage==0)?true:false} >
                  Previous
              </button>
              <button onClick={()=>setPage(pointPage.NextPage)} disabled={(pointPage.CurrentPage>pointPage.TotalPage)?true:false}>
                Next
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
