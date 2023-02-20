import React from 'react'
import {Link} from 'react-router-dom'
export default function FooterLogin() {
  return (
    <div className='footer-box'>
                <div className='terms-n-privacy'>
                    <div>
                        <Link to={'#'}><p>Terms & Conditions</p></Link>
                    </div>
                    <div>
                        <p>|</p>
                    </div>
                    <div>
                        <Link to={'#'}><p>Privacy Policy</p></Link>
                    </div>
                </div>
                <div className='copyright-box'>
                    <p>© 2000-2023 Newegg Inc. All rights reserved.</p>
                </div>
            </div>
  )
}
