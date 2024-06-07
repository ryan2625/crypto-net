import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MarketData } from "./MarketData"
import { baseState } from './MarketData'
import "./first-banner.scss"
/**
 * @component FirstBanner
 * This component stores the hero banner for the home page. It fetches data points from coinGecko's API and displays them 
 * right below the navbar.
 */

const FirstBanner: React.FC = () => {

  const apiKey = process.env.REACT_APP_API_KEY

  const [marketData, setMarketData] = useState<MarketData>(baseState)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setMarketData(data);
          localStorage.setItem("marketData", JSON.stringify(data));
        })
        .catch(error => console.error(error));
    }

    if (localStorage.getItem("marketData") === null) {
      fetchData();
    } else {
      var marketDataLocal = JSON.parse(localStorage.getItem("marketData") || "{}")
      setMarketData(marketDataLocal);
    }

  }, []);

  return (
    <>
      <section className='first-banner' id="home">
        <div className="trending">
          <div id="first">
            <h4>Active Coins: </h4>
            <p>{new Intl.NumberFormat().format(marketData.data.
              active_cryptocurrencies)}</p>
          </div>
          <div>
            <h4>Market Cap: </h4>
            <p>{new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(marketData.data.total_market_cap.usd)}
              &nbsp;USD
            </p>
          </div>
          <div>
            <h4>24H Change:</h4>
            <p className={marketData.data.market_cap_change_percentage_24h_usd > 1 ? "green" : "red"}>{marketData.data.market_cap_change_percentage_24h_usd.toString().substring(0, 4)} %
            </p>
          </div>
          <div className='optional'>
            <h4>Market Volume: </h4>
            <p>{new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(marketData.data.total_volume.usd)} USD</p>
          </div>
          <div className='optional'>
            <h4>Markets: </h4>
            <p>{marketData.data.markets}</p>
          </div>
        </div>
        <header className="catch">
          <h1>
            THE WORLD'S LEADING <span>CRYPTOCURRENCY</span> PLATFORM
          </h1>
          <h2>
            Buy Bitcoin, Ethereum, and all your favourite crypto
          </h2>
          <ul>
            <li>
              <span><CheckCircleIcon /></span>
              Trusted by more than 80M users world-wide
            </li>
            <li>
              <span><CheckCircleIcon /></span>
              Leader in regulatory compliance and security certifications
            </li>
            <li>
              <span><CheckCircleIcon /></span>
              The industry’s most comprehensive insurance coverage and verified proof of reserves
            </li>
          </ul>
        </header>
      </section>
    </>
  )
}

export default FirstBanner