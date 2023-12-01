import React, { useEffect, useState } from 'react'
import "../styles/first-banner.scss"

function FirstBanner() {

  const [marketData, setMarketData] = useState([])

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn")
      .then(response => response.json())
      .then(data => {
        setMarketData(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <div className='first-banner'>
      <div className="trending">
        <p>Markets: {marketData.data.markets}</p>
        <p>Active Coins: {marketData.data.active_cryptocurrencies}</p>
        <p>Market Cap: {marketData.data.total_market_cap.usd}</p>
        <p>Market Volume: {marketData.data.total_volume.usd}</p>
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