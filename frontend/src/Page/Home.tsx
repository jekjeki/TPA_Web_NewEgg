import React from 'react'
import Navbar from '../component/Navbar'
import Corousel from '../component/Corousel'
import PopularCategories from '../UserPage/component/PopularCategories'
import UserFooter from '../UserPage/component/UserFooter'
import TopShop from '../UserPage/component/TopShop'
import './style/home.scss'
import SubscribeEmail from '../UserPage/component/SubscribeEmail'

export default function Home() {
  return (
    <div>
        <Navbar />
        <Corousel />
        <PopularCategories />
        <TopShop />
        <SubscribeEmail />
        {/* <BestDeal /> */}
        <UserFooter />
    </div>
  )
}
