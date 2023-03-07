import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style/footerstyle.scss'
import React from 'react'

export default function ShopFooter() {
  return (
    <div className='shop-footer'>
        <div className='wrap-footer'>
            <div className='wrap-newegg-info'>
                <div className='wrap-address'>
                    <div>
                        <FontAwesomeIcon icon={faLocation} />
                    </div>
                    <p>17560 Rowland St, City of Industry, CA 91745, United States</p>
                </div>
                <div className='wrap-email'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>newegg@gmail.com</p>
                </div>
                <div className='wrap-phone'>
                    <FontAwesomeIcon icon={faPhone} />
                    <p>+01 8754 322 111</p>
                </div>
            </div>
            <div className='wrap-menu'>
                <p>Product</p>
            </div>
        </div>
        <div className='wrap-copyright'>
            <h4>Copyright 2023</h4>
        </div>
    </div>
  )
}
