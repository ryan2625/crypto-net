import React from 'react'
import "../styles/navbar.scss"
import image from "../assests/crypto-logo-official.png"

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-container">
        <img src={image} alt="" />
        <ul>
          <li>
            Home
          </li>
          <li>
            Prices
          </li>
          <li>
            Rewards
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar