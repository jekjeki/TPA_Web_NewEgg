import React from 'react'
import Navbar from '../component/Navbar'
import Corousel from '../component/Corousel'
import BestDeal from '../component/BestDeal'
import './style/home.scss'

export default function Home() {
  return (
    <div>
        <Navbar />
        <Corousel />
        <BestDeal />
    </div>
  )
}
