import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import Navbar from '../../components/navbar/Navbar';
import "./portfolio.scss"

function Portfolio({ setId }) {

  const [portfolioData, setPortfolioData] = useState([])
  const { user } = useAuthContext()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        }).then(
          response => response.json().then(data => {
            setPortfolioData(data.portfolio)
          })
        )
      } catch (err) {
        console.log(err)
      }
    }
    const html = document.querySelector('html')
    html.style.scrollBehavior = "auto"
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
    html.style.scrollBehavior = ''

    fetchData()
  }, [user])

  async function deleteCoin(deleter) {
    try {
      const res = await fetch(`/api/portfolio/${deleter}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      })
      setPortfolioData(portfolioData.filter(coin => coin.name !== deleter))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar sourced={false} />
      <section className='portfolio-display'>
        <h1>Welcome to your portfolio</h1>
        <h2>Here you can explore trending coins and add them to your watchlist.</h2>
        <p>
          TODO : Responsive trending page, styled and responsive portfolio page, update backend data for add to watchlist and display it in portfolio, add aspect ratio to table of coins, add loader of individual coin. ADd loader for all fetching data.
        </p>
        <div className="your-watchlist">
          <h1>Your Watchlist</h1>
          asd
          {portfolioData &&
            portfolioData.map((coin, key) => {
              return (

                <div className="portfolio-view" key={key}>
                  <Link to={`/coins/${coin.name}`} onClick={() => setId(coin.name)}
                    state="portfolio">
                    <div className="portfolio-view-name">
                      <img src={coin.image} alt={coin.name} />
                      <h3>{coin.link}</h3>
                    </div>
                    <div className="market-portfolio">
                      <h3>${coin.
                        marketRate}</h3>
                    </div>
                  </Link>
                  <button className="portfolio-delete" onClick={() => deleteCoin(coin.name)}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Portfolio