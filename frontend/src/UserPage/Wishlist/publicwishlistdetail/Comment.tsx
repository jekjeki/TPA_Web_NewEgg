import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style/comment.scss'
import React, { useEffect, useState } from 'react'
import AddComponentModal from '../component/AddComponentModal'

export default function Comment(wishlistid:any, userwlid:any) {

  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')

  const [userId, setUserId] = useState<string>('')

  const [reviewVal, setReviewVal] = useState<number>(0)

  //const show modal 
   const [show, setShow] = useState<boolean>(false)

  const getCurrentLogin = async () => {
    await fetch("http://localhost:8000/api/users/me",{
      method: 'GET',
      headers: {
        'Content-type':'application/json'
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      setUserId(data.data.user.id)
    })
  }


  // associate all post 
  const PostData = async () => {
    setShow(true)
  }

  useEffect(()=>{
    getCurrentLogin()
  }, [])

  return (
    <div>
      <AddComponentModal show={show} title={title} desc={desc} reviewVal={reviewVal} />
      <div className='wrap-comment'>
        <div className='header'>
          <p>Rate this wishlist</p>
        </div>
        <div className='body'>
          <div className="review">
            <div className="1">
              <FontAwesomeIcon icon={faStar} className='star' onClick={()=>setReviewVal(1)} />
            </div>
            <div className="2">
              <FontAwesomeIcon icon={faStar} className='star' onClick={()=>setReviewVal(2)} />
            </div>
            <div className="3">
              <FontAwesomeIcon icon={faStar} className='star' onClick={()=>setReviewVal(3)} />
            </div>
            <div className="4">
              <FontAwesomeIcon icon={faStar} className='star' onClick={()=>setReviewVal(4)} />
            </div>
            <div className="5">
              <FontAwesomeIcon icon={faStar} className='star' onClick={()=>setReviewVal(5)} />
            </div>
          </div>
          <div className="wrap-comment-input">
            <div className='wrap-title-comment'>
              <div>
                <p>Title: </p>
              </div>
              <div>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} />
              </div>
            </div>
            <div className="wrap-desc-comment">
              <div>
                <p>Comment desription: </p>
              </div>
              <div>
                <textarea cols={30} rows={7} value={desc} onChange={(e)=>setDesc(e.target.value)} />
              </div>
            </div>
            <div className="wrap-button">
              <button onClick={()=>PostData()}>Add Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
