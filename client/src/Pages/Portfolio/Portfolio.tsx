import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useScroll } from '../../Hooks/useScroll';
import { PortfolioCoinData } from './PortfolioData';
import Navbar from '../Nav-Footer/navbar/Navbar';
import "./portfolio.scss";

/**
 * @component Portfolio 
 * This page is accessible when a user is logged in. They can add coins to their portfolio via the tables in the trending 
 * page and the home page. Here we grab the user from the auth context and use their token to make an authorized request 
 * to retrive a user's portfolio data. We also grab the scroll hook to scroll to the top of the page.
 * 
 * @param {function} setID : Used to set the state of the id of the coin when you click a link in the table.
 */

interface PortfolioProps {
  setId: React.Dispatch<React.SetStateAction<string | null>>
}

const Portfolio: React.FC<PortfolioProps> = ({ setId }) => {

  const [portfolioData, setPortfolioData] = useState<PortfolioCoinData[] | null>(null);
  const { user } = useAuthContext();
  const { scroller } = useScroll();

  /**
   * Use effect attemps to make a request to the backend and will retrieve a user's portfolio data if 
   * they are logged in properly. 
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://crypto-api-epz8.onrender.com/api/portfolio/", {
          headers: {
            "Authorization": `Bearer ${user?.token}`
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
  }, [user?.token]);

  //Deletes coin from portfolio in backend as well as the state in the frontend so it updates instantly.

  async function deleteCoin(deleter: string) {
    try {
      const res = await fetch(`https://crypto-api-epz8.onrender.com/api/portfolio/${deleter}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        }
      });
      if (portfolioData != null) {
        setPortfolioData(portfolioData.filter(coin => coin.name !== deleter));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navbar sourced={false} />
      <section className='portfolio-container'>
        {user?.token && (
          <p id="user-display">{user.email}</p>
        )}
        <div className='portfolio-display-container'>
          <header>
            <h1>Welcome to your portfolio</h1>
            <p className="marginer2">You can add coins to your portfolio by clicking on the charts in the <Link to="/#prices" state="portfolio-nav" aria-label="Return to home page">home</Link> or trending page!</p>
          </header>
          <div className="your-watchlist">
            {/* Display loader if portfolioData is null */}
            {portfolioData === null ? (
              <div className="loader-new"></div>
            ) : (
              <>
                {portfolioData?.length === 0 ? (
                  <h3>Your portfolio is empty!</h3>
                ) : (
                  <>
                    <h2 id="revert-underline">Your Watchlist</h2>
                    {portfolioData.map((coin, key) => (
                      <div className="portfolio-view" key={key}>
                        <Link
                          className='hover-portfolio'
                          to={`/coins/${coin.name}`}
                          onClick={() => setId(coin.name)}
                          state="portfolio"
                          aria-label='View individual coin data'
                        >
                          <div className="portfolio-view-name">
                            <img src={coin.image} alt={coin.name} />
                            <h3>{coin.name}</h3>
                          </div>
                          <div className="market-portfolio">
                            <h3>${coin.marketRate}</h3>
                          </div>
                        </Link>
                        <button className="portfolio-delete" onClick={() => deleteCoin(coin.name)}>Delete</button>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}  

export default Portfolio;
