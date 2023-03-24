import { click } from '@testing-library/user-event/dist/click'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/managemodalstyle.scss'

export default function ManageModal({show}:{show:boolean}) {

    let navigate = useNavigate()

    const [wishlist, setWishlist] = useState<any[]>([])
    const [clickInput, setClickInput] = useState<boolean>(false)
    
    //input data form save wishlist 
    const [wishlistName, setWishlistName] = useState<string>('')
    const [wishlistId, setWishlistId] = useState<string>('')
    const [privacy, setPrivacy] = useState<string>('')

    //update wishlist 
    const UpdateWishlistNameType = async () => {
        await fetch("http://localhost:8000/api/wishlist/update-wishlist-name-type", {
            method: 'PUT',
            body: JSON.stringify({
                wishlistid: wishlistId,
                wishlist_name: wishlistName, 
                wishlist_type: privacy
            }),
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })


        navigate('/')
    }

    //get data wishlist 
    const getWishlistData = async () => {
        await fetch("http://localhost:8000/api/users/me", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then(async(data)=>{
            console.log(data.data.user.id)
            await fetch(`http://localhost:8000/api/wishlist/get-user-wishlists/${data.data.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data)
                setWishlist(data.wishlist_name)
            })
        })
    
    }


    useEffect(()=>{
        getWishlistData()
    },  [])

    if(!show){
        return null 
    }

  return (
    <div className='modal'>
        <div className='modal-content'>
            <div className='modal-header'>
                <h4>Manage WIshlists</h4>
            </div>
            <div className='modal-body'>
                {
                    wishlist.map((wi, idx)=>{
                        return(
                            <div className='wrap-wishlist' onClick={()=>{
                                setClickInput(!clickInput)
                                setWishlistId(wi.WishlistID)
                            }} key={idx}>
                                <div className='input'>
                                    <input value={(clickInput===false || wishlistName==='')?wi.WishlistName:wishlistName} onChange={(e)=>setWishlistName(e.target.value)} />
                                </div>
                                <div>
                                    <select defaultValue={(clickInput===false || privacy==='')?wi.WishlistType:privacy} onChange={(e)=>setPrivacy(e.target.value)}>
                                        <option value={'public'}>Public</option>
                                        <option value={'private'}>Private</option>
                                    </select>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='footer-modal'>
                <button onClick={()=>UpdateWishlistNameType()}>Save</button>
            </div>
        </div>
    </div>
  )
}
