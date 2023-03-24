import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../component/Navbar";
import './style/shopreviewpage.scss'

export default function ShopReviewPage() {

  let location = useLocation()

  const [countReview, setCountReview] = useState<any>(0)

  const [averageRating, setAverageRating] = useState<any>(0)

  // get count users give review 
  const getCountUsers = async () => {
    await fetch(`http://localhost:8000/api/store/get-count-user-review-products/${location.state.shop_id.trim()}`,{
      method: 'GET',
      headers: {
        'Content-type':'application/json'
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      setCountReview(data.count_result)
    })
  }

  // get average product rating 
  const getAverageRating = async () => {
    await fetch(`http://localhost:8000/api/store/get-average-review-rating/${location.state.shop_id.trim()}`,{
      method: 'GET',
      headers: {
        'Content-type':'application/json'
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      setAverageRating(data.average.avg)
    })
  }

  useEffect(()=>{
    getCountUsers()
    getAverageRating()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="wrap-comp-shop-review">
        <div className="manage-menu">
          <div>
            <Link to={`/shop-home-page/${location.state.shop_id.trim()}`}>
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
            <Link to={`/shop-review-page/${location.state.shop_id.trim()}`}>
              <p>Shop Review Page</p>
            </Link>
          </div>
          <div>
            <Link to={`/shop-about-page/${location.state.shop_id.trim()}`}>
              <p>Shop About Page</p>
            </Link>
          </div>
        </div>
        <div className="header">
          <h3>Review Products Page</h3>
        </div>
        <div className="body">
          <div className="summary-of-rating-shops">
              <div className="wrap-number-give-rating">
                <div>
                  <h4>Total Reviews</h4>
                </div>
                <div>
                  <h4>{countReview}</h4>
                </div>
              </div>
              <div className="wrap-average">
                <div>
                  <h4>Average Rating</h4>
                </div>
                <div>
                  <p>{averageRating}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
