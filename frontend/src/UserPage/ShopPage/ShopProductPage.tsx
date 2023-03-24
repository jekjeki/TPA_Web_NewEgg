import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { storage } from "../../firebase/firebase";
import UserFooter from "../component/UserFooter";
import "./style/shopproductpage.scss";

export default function ShopProductPage() {
  const location = useLocation();
  const [products, setProducts] = useState<any[]>([]);

  const [imagesProducts, setImagesProducts] = useState<any[]>([])

  const [currPage, setCurrPage] = useState<number>(1)

  const [nextPage, setNextPage] = useState<number>(0)

  const [productName, setProductName] = useState<any>('')

  const [productFilter, setProductFilter] = useState<any[]>([])

  const [reviewValue, setReviewValue] = useState<any>(1)

  const [clickFilter, setClickFilter] = useState<boolean>(false)

  const [productsFilteredPrice, setProductsFilteredPrice] = useState<any[]>([])
  const [clickFilterPrice, setClickFilterPrice] = useState<boolean>(false)

  const [sortProductsRating, setSortProductsRating] = useState<any[]>([])
  const [clickSortProductsRating, setClickSortProductsRating] = useState<boolean>(false)
  // get products with paginations

  const getProductsPaginate = async () => {
    await fetch(
      `http://localhost:8000/api/store/get-products-in-product-page/${location.state.shop_id.trim()}/${currPage}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.products);
        setProducts(data.data.products);

        setNextPage(data.data.pagination.NextPage)

      });
  };


  // search products 
  const searchProducts = async () => {
    await fetch(`http://localhost:8000/api/store/get-products-in-product-page/${location.state.shop_id.trim()}/${currPage}?s=${productName}`,{
        method: 'GET',
        headers: {
            'Content-type':'application/json'
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        setProducts(data.data.products)
    })
  }


  // filtering product data and rating 
  const filteringProductRating = async () => {
    await fetch(`http://localhost:8000/api/store/get-products-by-filtering-rating/${location.state.shop_id.trim()}/${reviewValue}`,{
        method: 'GET',
        headers: {
            'Content-type':'application/json'
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        setProductFilter(data.products)
    })
  }

  // sort product page by product price 
  const SortProductByPrice = async () => {
    await fetch(`http://localhost:8000/api/store/get-products-by-sort-product-price/${location.state.shop_id.trim()}`,{
        method: 'GET',
        headers: {
            'Content-type':'application/json'
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        setProductsFilteredPrice(data.products)
    })
  }

  // sort products by rating    
  const SortProductByRating = async () => {
    await fetch(`http://localhost:8000/api/store/get-products-by-sort-product-rating/${location.state.shop_id.trim()}`,{
        method: 'GET',
        headers: {
            'Content-type':'application/json'
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        setSortProductsRating(data.products)
    })
  }

  //get products image 
  const imagesPorductRef = ref(storage, `product-images-${location.state.shop_id.trim()}/`)
  const getImagesProducts = () => {
    listAll(imagesPorductRef).then((res) => {
        res.items.forEach((item)=>{
            getDownloadURL(item).then((url) => {
                setImagesProducts((prev) => [...prev, url])
            })
        })
    })
  }

  useEffect(() => {
    getProductsPaginate();
    getImagesProducts()
    filteringProductRating()
    SortProductByPrice()
    SortProductByRating()
  }, []);

  return (
    <div>
      <Navbar />
      <div className="wrap-shop-productPage">
        <div className="manage-menu">
          <div>
            <Link to={"#"}>
              <p>Shop Home Page</p>
            </Link>
          </div>
          <div>
            <Link
              to={`/get-products-in-product-page/${location.state.shop_id.trim()}`}
              state={{
                shop_id: location.state.shop_id.trim(),
              }}
            >
              <p>Shop Product Page</p>
            </Link>
          </div>
          <div>
            <Link to={`/shop-review-page/${location.state.shop_id.trim()}`}><p>Shop Review Page</p></Link>
          </div>
          <div>
            <Link to={`/shop-about-page/${location.state.shop_id.trim()}`}>
                <p>
                Shop About Page
                </p>
            </Link>
          </div>
        </div>
        <div className="wrap-sort-product">
              <div className="header">
                <p>Choose Sort Type:</p>
              </div>
              <div className="body">
                <div
                style={{
                    backgroundColor: (clickFilterPrice) ? '#FFD966' : '',
                }}
                onClick={()=>setClickFilterPrice(!clickFilterPrice)}>
                    <p>Product Price</p>
                </div>
                <div onClick={()=>setClickSortProductsRating(!clickSortProductsRating)}>
                    <p>Product Rating</p>
                </div>
              </div>
        </div>
        <div className="wrap-filter">
            <div className="header">
              <p>Filter by rating:</p>
            </div>
            <div className="filter">
                <select name="" id="" onChange={(e)=>{
                    setReviewValue(e.target.value)
                    setClickFilter(true)
                    }}>
                    <option value="0">-</option>
                    <option value="1">&gt; 1</option>
                    <option value="2">&gt; 2</option>
                    <option value="3">&gt; 3</option>
                    <option value="4">&gt; 4</option>
                    <option value="5">&gt; 5</option>
                </select>
            </div>
        </div>
        <div className="products-comp">
          <div className="header">
            <h3>Products</h3>
          </div>
          <div className="wrap-search">
            <div>
                <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} 
                placeholder='search products'/>
            </div>
            <div className='img-search'>
                <FontAwesomeIcon 
                    icon={faMagnifyingGlass}
                    onClick={()=>searchProducts()}
                    
                />
            </div>
          </div>
            <div className="wrap-images">
              {
                imagesProducts.map((im, idx) =>{
                    return(
                        <div key={idx}>
                            <img src={im} alt="im" />
                        </div>
                    )
                })
              }
            </div>
          <div className="products-wrap">
            {
            
            (clickFilter && reviewValue != 0) ? 
                productFilter.map((pr,idx)=>{
                    return(
                        <div key={idx}>
                            <div>
                                <p>{pr.product_name}</p>
                            </div>
                            <div>
                                <p>{pr.review_value}</p>
                            </div>
                            <div>
                                <p>{pr.product_price}</p>
                            </div>
                        </div>
                    )
                })
            :
            (clickFilterPrice) ?
                productsFilteredPrice.map((pfp,idx)=>{
                    return(
                        <div key={idx} className='box'>
                            <div>
                                <p>{pfp.product_name}</p>
                            </div>
                            <div>
                                <p>{pfp.review_value}</p>
                            </div>
                            <div>
                                <p>{pfp.product_price}</p>
                            </div>
                        </div>
                    )
                })
            :
            (clickSortProductsRating)?
                sortProductsRating.map((sp, idx)=>{
                    return(
                        <div className="box" key={idx}>
                            <div>   
                                <p>{sp.product_name}</p>
                            </div>
                            <div>
                                <p>{sp.review_value}</p>
                            </div>
                            <div>
                                {sp.product_price}
                            </div>
                        </div>
                    )
                })
            :
            products.map((pr, idx) => {
              return (
                <div key={idx} className="box">
                  <div>
                    <p>{pr.ProductName}</p>
                  </div>
                  <div>
                    <p>{pr.ProductPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="control-paginate">
            <div className="wrap-btn-prev">
              <button>Previous</button>
            </div>
            <div className="wrap-btn-next">
              <button onClick={()=>setCurrPage(nextPage)}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}
