import React from 'react'
import Navbar from '../component/Navbar'
import Corousel from '../component/Corousel'
import PopularCategories from '../UserPage/component/PopularCategories'
import UserFooter from '../UserPage/component/UserFooter'
import TopProduct from '../UserPage/component/TopProduct'
import './style/home.scss'
import SubscribeEmail from '../UserPage/component/SubscribeEmail'
import TopShop from '../UserPage/component/TopShop'

export default function Home() {
  return (
    <div>
        <Navbar />
        <Corousel />
        <PopularCategories />
        <TopProduct />
        <TopShop />
        <SubscribeEmail />
        {/* <BestDeal /> */}
        <UserFooter />
    </div>
  )
}
