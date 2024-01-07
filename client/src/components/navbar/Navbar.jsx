import React, { useState } from 'react'
import "./navbar.scss"
import image from "../../assests/crypto-logo-official.png"
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {

  const [open, setOpen] = useState(false)

  return (
    <div className="navbar">
      <div className="nav-container">
        <img src={image} alt="" onClick={() => window.scrollTo(0,0)}/>
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

      <div className="nav-container-mobile">
        <img src={image} alt="" onClick={() => window.scrollTo(0,0)}/>
        <li id="menu-icon" onClick={() => setOpen(!open)}>
          <MenuIcon />
        </li>
        <ul className={open ? " shown mobile-ul" : "mobile-ul"}>
          <li>
            <a href="#home" onClick={() => setOpen(!open)}>
              Home
            </a>
          </li>
          <li>
            <a href="#prices" onClick={() => setOpen(!open)}>
              Prices
            </a>
          </li>
          <li>
            <a href="#rewards" onClick={() => setOpen(!open)}>
              Rewards
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar