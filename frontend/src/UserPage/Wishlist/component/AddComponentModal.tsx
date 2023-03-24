import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/addcommentmodal.scss'

export default function AddComponentModal({show, title, desc, reviewVal}:{show:boolean, title:string, desc:string, reviewVal:number}) {

    const [displayName, setDisplayName] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    
    let navigate = useNavigate()

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
    

    // add comments table 
  const AddComment = async () => {

    let num1 = Math.floor(Math.random()*9+0)
    let num2 = Math.floor(Math.random()*9+0)
    let num3 = Math.floor(Math.random()*9+0) 

    let commentId = 'COM'+num1.toString()+num2.toString()+num3.toString()

    await fetch("http://localhost:8000/api/feedback/add-comment", {
      method: 'POST',
      body: JSON.stringify({
        comment_id: commentId,
        comment_title: title,
        comment_desc: desc
      }),
      headers: {
        'Content-type':'application/json'
      }
    })
    .then((res)=>res.json())


    // add data to comment transactions 
    let num4 = Math.floor(Math.random()*9+0)
    let num5 = Math.floor(Math.random()*9+0)
    let num6 = Math.floor(Math.random()*9+0)

    let str = 'CTR'+num4.toString()+num5.toString()+num6.toString()

    await fetch("http://localhost:8000/api/feedback/add-comment-transactions", {
      method: 'POST',
      body: JSON.stringify({
        commenttr_id: str, 
        user_id: (displayName === 'anonymous') ? 'US4N0' :userId, 
        userwl_id: 'UWL001',
        comment_id: commentId
      })
    })
    .then((res)=>res.json())
  }

  // add new review 
  const AddNewReview = async () => {

    let num1 = Math.floor(Math.random()*9+0)
    let num2 = Math.floor(Math.random()*9+0)
    let num3 = Math.floor(Math.random()*9+0)

    let revId = 'REV'+num1.toString()+num2.toString()+num3.toString()

    await fetch("http://localhost:8000/api/feedback/add-new-review", {
      method: 'POST',
      body: JSON.stringify({
        review_id: revId,
        review_value: reviewVal
      })
    })
    .then((res)=>res.json())
  }

  // add new review transactions
  const AddNewReviewTransactions = async () => {

    let num1 = Math.floor(Math.random()*9+0)
    let num2 = Math.floor(Math.random()*9+0)
    let num3 = Math.floor(Math.random()*9+0)

    let rtrId = 'RTR'+num1.toString()+num2.toString()+num3.toString()

    await fetch("http://localhost:8000/api/feedback/add-review-transactions", {
      method: 'POST',
      body: JSON.stringify({
        reviewtr_id: rtrId, 
        userwl_id: 'UWL001'
      })
    })
    .then((res)=>res.json())
  }

  //associate post data 
  const PostData = () => {
    AddComment()
    AddNewReview()
    AddNewReviewTransactions()
    navigate('/')
  }

  useEffect(()=>{
    getCurrentLogin()
  }, [])

    if(!show){
        return null 
    }

  return (
    <div className='modal'>
        <div className="modal-content">
            <div className="modal-header">
                <p>Add Comment</p>
            </div>
            <div className="modal-body">
                <div className="wrap-component">
                    <div>
                        <h4>Display username:</h4>
                    </div>
                    <div onClick={()=>setDisplayName('username')}>
                        <p>Username</p>
                    </div>
                    <div onClick={()=>setDisplayName('anonymous')}>
                        <p>Anonymous</p>
                    </div>
                </div>
                <div className="wrap-btn" >
                    <button onClick={()=>PostData()}>Add Comment</button>
                </div>
            </div>
        </div>
    </div>
  )
}
