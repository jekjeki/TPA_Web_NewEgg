import React, { useEffect, useState } from "react";
import "./style/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCircleQuestion,
  faLocationDot,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import neweggLogo from "../asset/logo/logo-newegg.png";
import indonesiaNation from "../asset/logo/indonesia.png";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Navbar() {

  const [getLocation, setLocation] = useState('')
  const [firstName, setFirstName] = useState('') 

  const navigate = useNavigate()
  const [clickProfile, setClickProfile] = useState<boolean>(false)
  const [status, setStatus] = useState<string>('')

  //currr country 
  const getCurrCountry = async () => {
    await fetch(
      "https://api.ipregistry.co/2001:448a:2003:e47:5cba:3fca:d01c:f8f?key=pfwcwlawvw8v976i"
    ).then((res) => res.json())
    .then((data)=>{
      console.log(data.location.city)
      setLocation(data.location.city)
    });
  };

  //get curr login data
  const getLoginData = async () => {
    // setFirstName((firstName === '')?'':location.state.firstname)
    await fetch("http://localhost:8000/api/users/me", {
      method: 'GET',
      headers: {
        'Content-type':'application/json;charset=UTF-8'
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      setFirstName(data.data.user.first_name)
      setStatus(data.status)
    })
  }

  useEffect(()=>{
    getCurrCountry()
    getLoginData()
  }, [])

  return (
    <div>
      <div className="wrapper-navbar">
        <div className="wrap-subnavbar-top">
          <FontAwesomeIcon icon={faBars} id="fa-list" />
          <div className="wrap-logo-newegg">
            <Link to={'/'}>
              <img src={neweggLogo} alt="neweggLogo" />
            </Link>
          </div>
          <div className="wrap-location">
            <div className="location-svg">
              <FontAwesomeIcon icon={faLocationDot} id="fa-location" />
            </div>
            <div className="location">
              <p id="deliver-to">Deliver to</p>
              <p>{(firstName !== '') ? getLocation : `curr location`}</p>
            </div>
          </div>
          <div className="wrap-search">
            <div>
              <input type={"text"} id={`search-input`} />
            </div>
            <div>
              <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} id="icon-search" />
              </button>
            </div>
          </div>
          <div className="wrap-bell">
            <div className="wrap-bell-icon">
              <FontAwesomeIcon icon={faBell} id="icon-bell" />
            </div>
          </div>
          <div className="wrap-nation">
            <img src={indonesiaNation} alt="nation" />
          </div>
          <div className="toggle-light-dark">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="wrap-person-signin">
            <div className="wrap-icon">
              <FontAwesomeIcon icon={faUser} id="iconUser" />
            </div>
            <div className="wrap-login-name">
              <div className="welcome">
                <p>Welcome</p>
              </div>
              <div className="name-user-login" onClick={()=>(firstName === '')?navigate('/signin'):(status === 'success')?setClickProfile(!clickProfile):''}>
                <p>{(firstName === '') ? `Sign in / Register` : firstName}</p>
              </div>
              {
                clickProfile && (
                  <div className="floating-button-profile">
                      <div className="wrap-wishlist">
                        <Link to={'/wish-list'}><p>Wish List</p></Link>
                      </div>
                  </div>
                )
              }
            </div>
            <div className="wrap-return-order">
              <div className="return">
                <p>Returns</p>
              </div>
              <div className="order">
                <p>& Orders</p>
              </div>
            </div>
            <div className="wrap-cart">
              <FontAwesomeIcon icon={faShoppingCart} id="iconCart" />
            </div>
          </div>
        </div>
        <div className="wrap-subnavbar-bottom">
          <div className="scroll-menu">
            <p>Today's Best Deals</p>
            <p>Best sellers</p>
            <p>$35 of $250+</p>
            <p>Big Game TV Deals</p>
            <p>RTX 4080/4090 Gaming Laptops</p>
            <p>Valentine's Day</p>
            <p>PC Builder</p>
            <p>VR</p>
            <p>Browsing History</p>
            <p>Gaming PC Finder</p>
            <p>Newegg Creator</p>
          </div>
          <div className="right-subnavbar-bottom">
            <div className="volume-order">
              <p>Volume Order</p>
            </div>
            <div className="barrier">
              <p>|</p>
            </div>
            <div className="feedback">
              <button>
                <FontAwesomeIcon icon={faMessage} id="feedback-logo" />
                <p>FEEDBACK</p>
              </button>
            </div>
            
              <div className="barrier">
                <p>|</p>
              </div>
              <div className="help-center">
                <button>
                    <FontAwesomeIcon icon={faCircleQuestion} id='circle-quest' />
                    <p>HELP CENTER</p>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
