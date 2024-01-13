import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import Navbar from '../../components/navbar/Navbar';
import "./portfolio.scss"

function Portfolio({ setId }) {

  const [portfolioData, setPortfolioData] = useState([])
  const { user } = useAuthContext()
  

  useEffect(() => {
    const fetchData = async () =>{
      try{
      const res = await fetch("/api/portfolio", {
      headers: {
        "Authorization" : `Bearer ${user.token}`
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

  async function deleteCoin(deleter){
    try{
    const res = await fetch(`/api/portfolio/${deleter}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${user.token}`
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
      <div className="your-watchlist">
        <h1>Your Watchlist</h1>
        asd
        { portfolioData &&
          portfolioData.map((coin, key) => {
            return(
              <div className="coin-row" key={key}>
                <div className="coin">
                  <h1>{coin.name}</h1>
                  <button onClick={() =>deleteCoin(coin.name)}>DELETE</button>
                </div>
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