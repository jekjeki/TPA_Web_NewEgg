import React, { useEffect, useState } from 'react'
import './style/displaycomment.scss'

export default function DisplayComment() {

    const [comment, setComment] = useState<any[]>([])

    //display all comment wishlist detail 
    const displayComment = async () => {
        await fetch("http://localhost:8000/api/feedback/view-all-comments", {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setComment(data.comment)
        })
    }

    useEffect(()=>{
        displayComment()
    }, [])

  return (
    <div>
        <div className='wrap-display-comment'>
            <h3>Comment </h3>
            {
                comment.map((co, idx)=>{
                    return(
                        <div className="box-comment" key={idx}>
                            <div className="wrap-name-review">
                                <div className="wrap-name">
                                    <p>{co.first_name}</p>
                                </div>
                                <div className="review-val">
                                    <p>review: {co.review_value}</p>
                                </div>
                            </div>
                            <div className="comment-title">
                                <p><b>title:</b> {co.comment_title}</p>
                            </div>
                            <div className="wrap-comment-desc">
                                <p>description: {co.comment_desc}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
