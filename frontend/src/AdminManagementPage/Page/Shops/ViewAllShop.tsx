import { async } from '@firebase/util'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../adminComponent/AdminNavbar'
import './style/viewAllShop.scss'

export default function () {

    const [allShop, setAllShop] = useState<any[]>([])
    const [activeShop, setActiveShop] = useState<any[]>([])
    const [banShop, setBanShop] = useState<any[]>([])

    const [barsClick, setBarsClick] = useState<boolean>(false)
    const [filterVal, setFilterVal] = useState<string>('')

    const [shopId, setShopId] = useState('')

    //view ban shop 
    const viewBanShop = async () => {

        await fetch('http://localhost:8000/api/admin/view-ban-shops', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setBanShop(data.active_shop)
        })

    }

    //view active shop
    const viewActiveShop = async () => {
        
        await fetch("http://localhost:8000/api/admin/view-active-shops", {
            method:'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data.active_shop)
            setActiveShop(data.active_shop)
        })
    }

    //ban status shop 
    const BanStatusShop = async () => {
        await fetch("http://localhost:8000/api/admin/ban-shop", {
            method: 'POST',
            body: JSON.stringify({
                shopid: shopId,
                shopstatus: "banned"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })



    }


    //admin unban shop 
    const UnbanStatusShop = async() => {
        await fetch("http://localhost:8000/api/admin/unban-shop", {
            method: 'POST',
            body: JSON.stringify({
                shopid: shopId,
                shopstatus: "active"
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((data) => {
            console.log(data)
        })
    }



    //view all shop 
    const viewAllShop = async () => {
        await fetch('http://localhost:8000/api/admin/view-all-shops', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res)=>res.json())
        .then((data)=>{
            setAllShop(data.shops)
        })
    }

    useEffect(()=> {
        viewAllShop()
        viewActiveShop()
        viewBanShop()
    }, [])

  return (
    <div>
        <AdminNavbar />
        <div className='wrap-viewshop-page'>
            <div className='header'>
                <FontAwesomeIcon icon={faBars} className='bars' onClick={()=>{
                    setBarsClick(!barsClick)
                }} />
                <div className='wrap-filter' style={{display:(barsClick)?'block':'none'}}>
                    <select value={filterVal} onChange={(e)=>setFilterVal(e.target.value)}>
                        <option>-</option>
                        <option>Active Shop</option>
                        <option>Banned Shop</option>
                    </select>
                </div>
                <div className='wrap-title'>
                        <div>
                            <h3>View Shops</h3>
                        </div>
                </div>
            </div>
            <div className='body'>
                <div className='wrap-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Shop ID</th>
                                <th>Shop Name</th>
                                <th>Shop Email</th>
                                <th>Shop Password</th>
                                <th>Shop Status</th>
                            </tr>
                        </thead>
                        <tbody>
                                 {
                                    (filterVal === 'Active Shop') ?
                                    activeShop.map((sh, idx) => {
                                        return(
                                            <tr key={idx}>
                                                <td>{sh.ShopID}</td>
                                                <td>{sh.ShopName}</td>
                                                <td>{sh.ShopEmail}</td>
                                                <td>{sh.ShopPassword}</td>
                                                <td>{sh.ShopStatus}</td>
                                            </tr>
                                        )
                                    })
                                    : 
                                    (filterVal === 'Banned Shop') ?
                                    banShop.map((ba, idx) => {
                                        return(
                                            <tr key={idx}>
                                                <td>{ba.ShopID}</td>
                                                <td>{ba.ShopName}</td>
                                                <td>{ba.ShopEmail}</td>
                                                <td>{ba.ShopPassword}</td>
                                                <td>{ba.ShopStatus}</td>
                                            </tr>
                                        )
                                    })
                                    : 
                                    allShop.map((as, idx)=>{
                                        return(
                                            <tr key={idx} onClick={()=>setShopId(as.ShopID)}>
                                                <td>{as.ShopID}</td>
                                                <td>{as.ShopName}</td>
                                                <td>{as.ShopEmail}</td>
                                                <td>{as.ShopPassword}</td>
                                                <td>{as.ShopStatus}</td>
                                            </tr>
                                        )
                                    })
                                }
                            
                        </tbody>
                    </table>
                </div>
                <div className='wrap-ban-shop'>
                    <div className='ban-shop'>
                        <button onClick={()=>BanStatusShop()}>Ban Shop</button>
                    </div>
                    <div className='unban-shop'>
                        <button onClick={()=>UnbanStatusShop()}>Unban Shop</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
