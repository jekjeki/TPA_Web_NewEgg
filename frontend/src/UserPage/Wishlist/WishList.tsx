import React, { useState } from 'react'
import Navbar from '../../component/Navbar'
import UserFooter from '../component/UserFooter'
import './style/wishliststyle.scss'

export default function WishList() {

    const [clickCreateList, setClickCreateList] = useState<boolean>(false)

  return (
    <div>
        <Navbar />
        <div className='core-page-wishlist'>
            <div className='header-core-page'>
                <div className='breadcrumb'>
                    <div>
                        <p>Home</p>
                        <p>&gt;</p>
                        <p>Wish List</p>
                    </div>
                </div>
                <div className='header-wish-list'>
                    <div>
                        <h3>WISH LIST</h3>
                    </div>
                    <div>
                        <p>My Lists</p>
                    </div>
                    <div>
                        <p>Followed Lists</p>
                    </div>
                    <div>
                        <p>Public Lists</p>
                    </div>
                </div>
            </div>
                <div className='body-wishlist'>
                    <div className='wrap-btn'>
                        <div>
                            <button onClick={()=>setClickCreateList(!clickCreateList)}>CREATE A LIST</button>
                        </div>
                        <div>
                            <button>MANAGE LISTS</button>
                        </div>
                    </div>
                </div>
            </div>
        <UserFooter />
    </div>
  )
}
