import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useScroll } from '../../hooks/useScroll';
import Navbar from '../components/navbar/Navbar';
import "./portfolio.scss";

/**
 * @component Portfolio 
 * This page is accessible when a user is logged in. They can add coins to their portfolio via the tables in the trending 
 * page and the home page. Here we grab the user from the auth context and use their token to make an authorized request 
 * to retrive a user's portfolio data. We also grab the scroll hook to scroll to the top of the page.
 * 
 * @param {function} setID : Used to set the state of the id of the coin when you click a link in the table.
 */

function Portfolio({ setId }) {

  const [portfolioData, setPortfolioData] = useState([]);
  const { user } = useAuthContext();
  const { scroller } = useScroll();

  /**
   * Use effect attemps to make a request to the backend and will retrieve a user's portfolio data if 
   * they are logged in properly. 
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://crypto-endpoint.cyclic.app/api/portfolio/", {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        }).then(
          response => response.json().then(data => {
            setPortfolioData(data.portfolio);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    scroller()
    fetchData();
  }, [user]);

  //Deletes coin from portfolio in backend as well as the state in the frontend so it updates instantly.

  async function deleteCoin(deleter) {
    try {
      const res = await fetch(`https://crypto-endpoint.cyclic.app/api/portfolio/${deleter}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });
      setPortfolioData(portfolioData.filter(coin => coin.name !== deleter));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navbar sourced={false} />
      <section className='portfolio-container'>
        {user &&
          <p id="user-display">{user.email}</p>}
        <div className='portfolio-display-container'>
          <header>
            <h1>Welcome to your portfolio</h1>
            <h2 className="marginer">Here you can explore trending coins and add them to your watchlist.</h2>
            <p className="marginer2">You can add coins to your portfolio by clicking on the charts in the <Link to="/#prices" state="portfolio-nav" aria-label="Return to home page">home</Link> or trending page!</p>
          </header>
          <div className="your-watchlist">
            {
              //If there are no coins in the portfolio, then we will display a loader. Otherwise, we will display the coins in the portfolio.
            }
            {portfolioData.length === 0 ? (
              <div className="loader-new"></div>
            ) : (
              <>
                <h1 id="revert-underline">Your Watchlist</h1>
                {portfolioData &&
                  portfolioData.map((coin, key) => {
                    return (
                      <div className="portfolio-view" key={key}>
                        <Link
                          className='hover-portfolio'
                          to={`/coins/${coin.name}`}
                          onClick={() => setId(coin.name)}
                          state="portfolio"
                          aria-label='View individual coin data'>
                          <div className="portfolio-view-name">
                            <img src={coin.image} alt={coin.name} />
                            <h3>{coin.link}</h3>
                          </div>
                          <div className="market-portfolio">
                            <h3>${coin.marketRate}</h3>
                          </div>
                        </Link>
                        <button className="portfolio-delete" onClick={() => deleteCoin(coin.name)}>Delete</button>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
