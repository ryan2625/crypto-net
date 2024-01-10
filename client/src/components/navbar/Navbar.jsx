import React, { useState, useEffect, useRef } from 'react'
import "./navbar.scss"
import { Link } from "react-router-dom";
import image from "../../assets/crypto-logo-official.png"
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Navbar() {

  const [open, setOpen] = useState(false)
  const [liClicked, setClicked] = useState(false)
  const [pfpClick, setPfp] = useState(true)
  const [count, setCount] = useState(0)

  let liRef = useRef()

  useEffect(() => {
    liRef.current = document.getElementsByClassName("acc-press")[0];
    console.log(liRef.current)
    let handler = (e) => {
      if (!(liRef.current.contains(e.target))) {
        setClicked(false)
        let ele = document.getElementsByClassName("acc-press")[0]
        if (ele.id === "press") {
          ele.removeAttribute("id")
          ele.setAttribute("id", "unpress")
          setCount(2)
        }
      } 
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])

  function handlePfpClick() {
    setPfp(!pfpClick)
    let ele = document.getElementsByClassName("acc-press")[0]
    ele.removeAttribute("id")
    if (count % 2 === 0) {
      ele.setAttribute("id", "press")
    } else {
      ele.setAttribute("id", "unpress")
    }
    setCount(count + 1)
    setClicked(!liClicked)
  }

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
          <li id="profile-li" onClick={() => setClicked(!liClicked)} ref={liRef}>
            <a href="#blank" onClick={handlePfpClick}>
              <AccountBoxIcon className='acc-press' />
            </a>
            <ul className={
              liClicked ? "account-container" : "account-container-hide"
            }>
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/trending">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/portfolio">
                  My Portfolio
                </Link>
              </li>
            </ul>
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