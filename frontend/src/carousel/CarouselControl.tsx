import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import './style/carouselControl.scss'

export default function CarouselControl({prev, next}:any) {
  return (
    <div>
        <button className='carousel-control left' onClick={prev}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
        </button>
        <button className='carousel-control right' onClick={next}>
            <FontAwesomeIcon icon={faChevronCircleRight} />
        </button>
    </div>
  )
}
