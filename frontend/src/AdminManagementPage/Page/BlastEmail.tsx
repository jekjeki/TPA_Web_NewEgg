import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../adminComponent/AdminNavbar'
import './style/blastEmail.scss'
import FormBlastEmail from '../../adminComponent/FormBlastEmail'

export default function BlastEmail() {

    const [dataSubs, setDataSubs] = useState<any[]>([])
  
    const fetchSubscribeData = async () => {
        await fetch('http://localhost:8000/api/admin/users-subscribe', {
            method:'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setDataSubs(data.user_subscribe)
        })
    }

    useEffect(()=>{
        fetchSubscribeData()
    }, [])
  
    return (
    <div>
        <AdminNavbar />
        <div className='wrap-blast-email-page'>
            <div className='wrap-title'>
                <h3>User Subscribe List</h3>
            </div>
            <div className='table-list-user-check'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Subscribe</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataSubs.map((data, idx)=>{
                                return(
                                    <tr key={idx}>
                                        <td>{data.ID}</td>
                                        <td>{data.Email}</td>
                                        <td>{data.Subscribe}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>              
            </div>
            <div className='wrap-form-fill'>
                <FormBlastEmail />
            </div>
        </div>
    </div>
  )
}
