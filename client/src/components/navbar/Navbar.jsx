import React, { useState } from 'react'
import "./navbar.scss"
import { Link } from "react-router-dom";
import image from "../../assests/crypto-logo-official.png"
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Navbar() {

  const [open, setOpen] = useState(false)
  const [liClicked, setClicked] = useState(false)

  return (
    <div className="navbar">
      <div className="nav-container">
        <img src={image} alt="" onClick={() => window.scrollTo(0, 0)} />
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
          <li id="profile-li" onClick={() => setClicked(!liClicked)}>
            <a href="#" onClick={() => setOpen(!open)}>
              <AccountBoxIcon />
            </a>
            {
              liClicked ?
                <ul>
                  <li>
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio">
                      My Portfolio
                    </Link>
                  </li>
                </ul>
                : null
            }
          </li>
        </ul>
      </div>

      <div className="nav-container-mobile">
        <img src={image} alt="" onClick={() => window.scrollTo(0, 0)} />
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
          <li>
            <a href="#" onClick={() => setOpen(!open)}>
              <AccountBoxIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar