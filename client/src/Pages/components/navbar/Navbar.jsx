import React, { useState, useEffect, useRef } from 'react'
import "./navbar.scss"
import { Link } from "react-router-dom";
import { useLogout } from '../../../hooks/useLogout'
import { useAuthContext } from '../../../hooks/useAuthContext'
import image from "../../../assets/crypto-logo-official.png"
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

/**
 * @component Navbar
 * This component is present on every page besides the individual coin page. It is used to navigate the site and allows 
 * the user to login and logout.
 * 
 * @param {boolean} sourced : Used to determine if the navbar is being used on the home page or not. Will display different
 * links based on this prop.
 * @returns 
 */

function Navbar({ sourced }) {

  //open is used to determine if the mobile menu is open or not.
  const [open, setOpen] = useState(false)
  //liClicked is used to determine if the account menu is open or not.
  const [liClicked, setClicked] = useState(false)
  //pfpClick is used to determine if the account icon is open or not. Determines animation of the icon.
  const [pfpClick, setPfp] = useState(true)
  //Determines which animation to use for the account icon.
  const [count, setCount] = useState(0)
  const { logout } = useLogout()
  const { user } = useAuthContext()

  let liRef = useRef()

  /**
   * useEffect hook that handles the closing of the account menu when the user clicks outside of the menu via the event 
   * listener. This is done by checking if the ref contains the target of the click. If it does not, then the menu is 
   * closed. setCount here is used to ensure the animation of the account button is correct, as there have been issues 
   * with the animation not working properly.
   */

  useEffect(() => {
    liRef.current = document.getElementsByClassName("acc-press")[0];
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
    document.addEventListener("mouseup", handler)
    return () => {
      document.removeEventListener("mouseup", handler)
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

  function scrollTop() {
    const html = document.querySelector('html')
    html.style.scrollBehavior = "auto"
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
    html.style.scrollBehavior = ''
  }

  function handleLogout() {
    scrollTop()
    logout()
  }

  function handleLogoClick() {
    scrollTop()
  }

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/">
          <img src={image} alt="" onClick={handleLogoClick} />
        </Link>
        <ul>
          {sourced ? <>
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
          </> : null}
          <li id="profile-li" onClick={() => setClicked(!liClicked)} ref={liRef}>
            <a href="#blank" onClick={handlePfpClick}>
              <AccountBoxIcon className='acc-press' />
            </a>
            <ul className={
              liClicked ? "account-container" : "account-container-hide"
            }>
              <li>
                <Link to="/" onClick={handleLogoClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trending">
                  Trending
                </Link>
              </li>
              <li>
                {user &&
                  <Link to="/portfolio">
                    My Portfolio
                  </Link>
                }
              </li>
              <li>
                {user && (
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                )}
              </li>
              {
                !user && (
                  <li>
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                )
              }
            </ul>
          </li>
        </ul>
      </div>

      <div className="nav-container-mobile">
        <Link to="/">
          <img src={image} alt="" onClick={handleLogoClick} />
        </Link>
        <li id="menu-icon" onClick={() => setOpen(!open)}>
          <MenuIcon />
        </li>
        <ul className={open ? " shown mobile-ul" : "mobile-ul"}>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/trending">
              Trending
            </Link>
          </li>
          <li>
            {user &&
              <Link to="/portfolio">
                My Portfolio
              </Link>
            }
          </li>
          <li>
            {user && (
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </li>
          {
            !user && (
              <li>
                <Link to="/login" onClick={handleLogoClick}>
                  Login
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar