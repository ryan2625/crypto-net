import React, { useEffect, useState } from 'react'
import "../styles/first-banner.scss"

function FirstBanner() {

  const [marketData, setMarketData] = useState(
    {
      data : {
        markets: 0,
        active_cryptocurrencies: 0,
        market_cap_change_percentage_24h_usd: 0,
        total_market_cap: {
          usd: 0
        },
        total_volume: {
          usd: 0
        },
        
      }
    }
  )

  useEffect(() => {

    const fetchData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn")
      .then(response => response.json())
      .then(data => {
        console.log("Data: " + data);
        setMarketData(data);
      })
      .catch(error => console.error(error));
    }

    fetchData();
    
  }, []);


  return (
    <div className='first-banner'>
      <div className="trending">
        <div id="first">
          <h4>Active Coins: </h4>
          <p>{marketData.data.
            active_cryptocurrencies}</p>
        </div>
        <div>
          <h4>Market Cap: </h4>
          <p>{marketData.data.total_market_cap.usd}</p>
        </div>
        <div>
          <h4>24H Change </h4>
          <p>{marketData.data.market_cap_change_percentage_24h_usd}</p>
        </div>
        <div>
          <h4>Market Volume: </h4>
          <p>{marketData.data.total_volume.usd}</p>
        </div>
        <div>
          <h4>Markets: </h4>
          <p>{marketData.data.markets}</p>
        </div>
      </div>
      <h1>
        The World’s Leading Cryptocurrency Platform
      </h1>
      <h2>
        Buy Bitcoin, Ethereum, and all your favourite crypto
      </h2>
      <ul>
        <li>
          Trusted by more than 80M users world-wide
        </li>
        <li>
          Leader in regulatory compliance and security certifications
        </li>
        <li>
          The industry’s most comprehensive insurance coverage and verified proof of reserves
        </li>
      </ul>
    </div>
  )
}

export default FirstBanner