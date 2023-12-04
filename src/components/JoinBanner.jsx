import React from 'react'
import image from "../assests/cryptoVisa1.jpg"
import "../styles/join-banner.scss"

function JoinBanner() {
  return (
    <div className='join-banner'>
        <div className="card">
            <img src={image} alt="" />
        </div>
        
    </div>
  )
}

export default JoinBanner