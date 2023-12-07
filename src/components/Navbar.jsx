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
            <a href="#home">
            Home
            </a>
          </li>
          <li>
            <a href="#prices">
            Prices
            </a>
          </li>
          <li>
            <a href="#rewards">
            Rewards
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar