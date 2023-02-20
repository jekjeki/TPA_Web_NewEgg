import React, { useState } from 'react'
import AdminNavbar from '../../adminComponent/AdminNavbar'
import '../style/addVoucher.scss'

export default function AddVoucher() {

    const [voucherName, setVoucherName] = useState('')
    const [voucherDisc, setVoucherDisc] = useState('')

    const addNewVoucher = async () => {

        let char1 = String.fromCharCode(Math.floor(Math.random()*57)+48) 
        let char2 = String.fromCharCode(Math.floor(Math.random()*65)+90)
        let char3 = String.fromCharCode(Math.floor(Math.random()*97)+122)


        await fetch('http://localhost:8000/api/voucher/insert-voucher', {
            method:'POST',
            body: JSON.stringify({
                id:'VO#'+char1+char2+char3,
                vouchername: voucherName,
                voucherdiscount: parseFloat(voucherDisc)
            }),
            headers: {
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then((res)=>console.log(res.json()))
    }

  return (
    <div>
        <AdminNavbar />
        <div className='wrap-add-voucher-all'>
            <div className='wrap-add-voucher-form'>
                <div className='wrap-comp-add'>
                    <div>
                        <h3>Vouchers</h3>
                    </div>
                    <div className='wrap-voucher-name'>
                        <div>
                            <p>Voucher name:</p>
                        </div>
                        <div>
                            <input type={'text'} value={voucherName} onChange={(e)=>setVoucherName(e.target.value)} />
                        </div>
                    </div>
                    <div className='wrap-voucher-price'>
                        <div>
                            <p>Voucher price:</p>
                        </div>
                        <div>
                            <input type={'number'} value={voucherDisc} onChange={(e)=>setVoucherDisc(e.target.value)} />
                        </div>
                    </div>
                    <div className='wrap-btn-add'>
                        <button onClick={()=>addNewVoucher()}>Add Voucher</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
