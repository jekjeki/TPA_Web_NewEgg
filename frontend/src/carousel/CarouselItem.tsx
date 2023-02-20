import React from 'react'
import './style/carouselItem.scss'

export default function CarouselItem({slide}:any) {
  return (
<div className='carousel-item'>
    <img src={slide} alt='car-item' />
</div>
  )
}
