import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./portfolio.scss"

function Portfolio({ setId }) {

  const [trending, setTrending] = useState([])
  const [nfts, setNFTs] = useState([])

  useEffect(() => {
    const html = document.querySelector('html')
    html.style.scrollBehavior = "auto"
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
    html.style.scrollBehavior = ''
  }, [])

  return (
    <section className='portfolio-display'>
      <Link to="/">Return to home</Link>
      <h1>Welcome to your portfolio</h1>
      <h2>Here you can explore trending coins and add them to your watchlist.</h2>
      <div className="your-watchlist">
        <h1>Your Watchlist</h1>
        asd
      </div>
    </section>
  )
}

export default Portfolio