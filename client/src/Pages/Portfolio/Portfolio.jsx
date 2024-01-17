import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import image from "../../assets/gif-loader.gif";
import Navbar from '../../components/navbar/Navbar';
import "./portfolio.scss";

function Portfolio({ setId }) {
  const [portfolioData, setPortfolioData] = useState([]);
  const { user } = useAuthContext();

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

    const html = document.querySelector('html');
    html.style.scrollBehavior = "auto";
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
    html.style.scrollBehavior = '';
    fetchData();
  }, [user]);

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
        <div className='portfolio-display-container'>
          <h1>Welcome to your portfolio</h1>
          <h2 className="marginer">Here you can explore trending coins and add them to your watchlist.</h2>
          <p className="marginer2">You can add coins to your portfolio by clicking on the charts in the <Link to="/#prices" state="portfolio-nav">home</Link> or trending page!</p>
          <div className="your-watchlist">
            {portfolioData.length === 0 ? (
              <div className="loader-new"></div>
            ) : (
              <>
                <h1 id="revert-underline">Your Watchlist</h1>
                {portfolioData &&
                  portfolioData.map((coin, key) => {
                    return (
                      <div className="portfolio-view" key={key}>
                        <Link className='hover-portfolio' to={`/coins/${coin.name}`} onClick={() => setId(coin.name)} state="portfolio">
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
