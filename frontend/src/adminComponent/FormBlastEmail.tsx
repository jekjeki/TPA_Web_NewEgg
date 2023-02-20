import React, { useState } from 'react'
import './style/formBlastEmail.scss'

export default function FormBlastEmail() {

    const [subject, setSubject] = useState('')
    const [message, setMesssage] = useState('')

    const sendEmailData = async () => {
        await fetch('http://localhost:8000/api/admin/send-email', {
            method:'POST',
            body: JSON.stringify({
                subject: subject,
                message: message
            })
        }).then((res)=>console.log(res.json()))

        alert('email has sent !')
        setSubject('')
        setMesssage('')
    }

  return (
    <div className='wrap-form-blast'>
        <div>
            <h3>Blast NewsLetter</h3>
        </div>
        <div className='wrap-input'>
            <div className='wrap-subject'>
                <div>
                    <p>Subject: </p>
                </div>
                <div className='input'>
                    <input value={subject} onChange={(e)=>setSubject(e.target.value)} />
                </div>
            </div>
            <div className='wrap-message'>
                <div>
                    <p>Message: </p>
                </div>
                <div className='input'>
                    <textarea rows={6} value={message} onChange={(e)=>setMesssage(e.target.value)} />
                </div>
            </div>
            <div className='wrap-btn'>
                <button onClick={sendEmailData}>Send Email</button>
            </div>
        </div>
    </div>
  )
}
