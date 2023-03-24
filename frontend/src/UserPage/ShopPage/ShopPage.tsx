import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { storage } from "../../firebase/firebase";
import UserFooter from "../component/UserFooter";
import "./style/shoppage.scss";

export default function ShopPage() {
  const location = useLocation();

  const [imageBanner, setImageBanner] = useState<any[]>([]);
  const [imageProfile, setImageProfile] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [productsRec, setProductRec] = useState<any[]>([]);

  const [imagesProd, setImagesProd] = useState<any[]>([]);

  const [currShopStatus, setCurrShopStatus] = useState<any>("");

    const navigate = useNavigate()

  const [shopId, setShopId] = useState<any>('')
  const getData = () => {
    setShopId(location.state.shop_id.trim())
  }

  //get banner image
  const imageBannerRef = ref(
    storage,
    `shop-banner-image-${location.state.shop_id.trim()}/`
  );
  const getBannerImage = () => {
    listAll(imageBannerRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageBanner((prev) => [...prev, url]);
        });
      });
    });
  };

  // get categories sold by shops
  const displayCategoriesSold = async () => {
    await fetch(
      `http://localhost:8000/api/store/get-sold-categories/${location.state.shop_id.trim()}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      });
  };

  // get recommendations product images
  const imagesListRef = ref(
    storage,
    `product-images-${location.state.shop_id.trim()}/`
  );
  const getProductImages = () => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImagesProd((prev) => [...prev, url]);
        });
      });
    });
  };

  // get products recommendations shop page | ( user )
  const getProductsRecommend = async () => {
    await fetch(
      `http://localhost:8000/api/store/get-products-rec/${location.state.shop_id.trim()}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProductRec(data.products);
      });
  };

  // GET shop status
  const getShopStatus = async () => {
    await fetch(
      `http://localhost:8000/api/store/get-shop-status/${location.state.shop_id.trim()}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrShopStatus(data.shop.ShopStatus);
      });
  };

  // get profile image
  const imageProfileRef = ref(
    storage,
    `shop-profile-image-${location.state.shop_id.trim()}/`
  );
  const getProfileImage = () => {
    listAll(imageProfileRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageProfile((prev) => [...prev, url]);
        });
      });
    });
  };

  useEffect(() => {
    getShopStatus()
    getBannerImage();
    getProfileImage();
    displayCategoriesSold();
    getProductsRecommend();
    getProductImages();
    getData()
  }, []);

  return (
    <div>
      <Navbar />
      {currShopStatus === "banned" ? (
        <div>
          <h3>The Shop Page not found !</h3>
        </div>
      ) : (
        <div className="shop-home-page">
          <div className="banner">
            {imageBanner.map((ib, idx) => {
              return (
                <div key={idx}>
                  <img src={ib} alt="ib" className="image-banner" />
                </div>
              );
            })}
          </div>
          <div className="menu">
            <div className="profile-image">
              <div className="shop-name">
                <p>{location.state.shop_name}</p>
              </div>
              {imageProfile.map((ip, idx) => {
                return (
                  <div className="wrap-profile" key={idx}>
                    <img src={ip} alt="ip" />
                  </div>
                );
              })}
              <div className="menu-navigation">
                <div>
                    <Link to={'#'}><p>Shop Home Page</p></Link>
                </div>
                <div>
                   <Link to={`/get-products-in-product-page/${location.state.shop_id.trim()}` } 
                   state={{
                    shop_id: location.state.shop_id.trim()
                   }}><p>Shop Product Page</p></Link>
                </div>
                <div>
                  <Link to={`/shop-review-page/${location.state.shop_id.trim()}`}
                  state={{
                    shop_id: location.state.shop_id.trim()
                  }}><p>Shop Review Page</p></Link>
                </div>
                <div>
                  <Link to={`/shop-about-page/${location.state.shop_id.trim()}`}>
                    <p>Shop About Page</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="most-sold-categories">
            <div>
              <h3>Categories Sold by The Shop</h3>
            </div>
            {categories.map((ca, idx) => {
              return (
                <div key={idx}>
                  <p>{ca.CategoryName}</p>
                </div>
              );
            })}
          </div>
          <div className="wrap-rec-products">
            <div className="header">
              <div className="wrapper-select">
                <div>
                  <p>Filter:</p>
                </div>
                <div>
                  <select>
                    <option value="">-</option>
                    <option value="">price</option>
                    <option value="">rating</option>
                    <option value="">number reviews</option>
                    <option value="">number bought</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="products">
              <div className="header">
                <h3>Products Recommendation</h3>
              </div>
              <div className="boxes-products">
                <div className="list-images">
                  {imagesProd.map((im, idx) => {
                    return (
                      <div key={idx}>
                        <img src={im} alt="" />
                      </div>
                    );
                  })}
                </div>
                <div className="outer-box-prod">
                  {productsRec.map((pr, idx) => {
                    return (
                      <div className="wrap-box-prod" key={idx}>
                        <div className="prod-name">
                          <p>{pr.ProductName}</p>
                        </div>
                        <div className="prod-price">
                          <p>{pr.ProductPrice}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <UserFooter />
    </div>
  );
}
