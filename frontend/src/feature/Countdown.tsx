import React, { useEffect, useState } from 'react'
import './style/countdown.scss'

export default function Countdown() {

    const [day, setDay] = useState(0)
    const [hours, setHours] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    let countdownDate = new Date("Feb 25, 2023 12:00:00").getTime()

    useEffect(() => {
        let x = setInterval(()=>{
            var date = new Date().getTime()

            var distance = countdownDate - date 

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDay(days)
            setHours(hours)
            setMinute(minutes)
            setSecond(seconds)
        })
    })

  return (
    <div className='countdown-wrap'>
        <div className='day'>
            <p style={{
                display: (day==0)?'none':''
            }}>{day}</p>
        </div>
        <p>:</p>
        <div className='hours'>
            <p>{hours}</p>
        </div>
        <p>:</p>
        <div className='minute'>
            <p>{minute}</p>
        </div>
        <p>:</p>
        <div className='second'>
            <p>{second}</p>
        </div>
    </div>
  )
}
