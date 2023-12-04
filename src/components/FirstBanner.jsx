import React, { useEffect, useState } from 'react'
import "../styles/first-banner.scss"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarketBanner  from './MarketBanner';

function FirstBanner({setId}) {

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

  const [billion, formatBillion] = useState({marketCap : 0, marketVolume : 0})

  function setFormat(num, num2){
    const formattedNumber = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
    const formattedNumber2 = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num2);
    formatBillion({marketCap: formattedNumber, marketVolume: formattedNumber2})
  }

  useEffect(() => {

    const fetchData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn")
      .then(response => response.json())
      .then(data => {
        setMarketData(data);
        setFormat(marketData.data.total_market_cap.usd, marketData.data.total_volume.usd)
        localStorage.setItem("marketData", JSON.stringify(data));
      })
      .catch(error => console.error(error));
    }

     if (localStorage.getItem("marketData") === null){
      fetchData();
     } else {
      var marketDataLocal = JSON.parse(localStorage.getItem("marketData"))
      setMarketData(marketDataLocal);
      setFormat(marketDataLocal.data.total_market_cap.usd, marketDataLocal.data.total_volume.usd)
     }
    
  }, []);


  return (
    <>
    <div className='first-banner'>
      <div className="trending">
        <div id="first">
          <h4>Active Coins: </h4>
          <p>{new Intl.NumberFormat().format(marketData.data.
            active_cryptocurrencies)}</p>
        </div>
        <div>
          <h4>Market Cap: </h4>
          <p>{billion.marketCap} USD</p>
        </div>
        <div>
          <h4>24H Change:</h4>
          <p className={marketData.data.market_cap_change_percentage_24h_usd > 1 ? "green" : "red"}>{marketData.data.market_cap_change_percentage_24h_usd.toString().substring(0, 4)} %</p>
        </div>
        <div>
          <h4>Market Volume: </h4>
          <p>{billion.marketVolume} USD</p>
        </div>
        <div>
          <h4>Markets: </h4>
          <p>{marketData.data.markets}</p>
        </div>
      </div>

      <div className="catch">
      <h1>
        THE WORLD'S LEADING <span>CRYPTOCURRENCY</span> PLATFORM
      </h1>
      <h2>
        Buy Bitcoin, Ethereum, and all your favourite crypto
      </h2>
      <ul>
        <li>
          <span><CheckCircleIcon/></span>
          Trusted by more than 80M users world-wide
        </li>
        <li>
          <span><CheckCircleIcon/></span>
          Leader in regulatory compliance and security certifications
        </li>
        <li>
          <span><CheckCircleIcon /></span>
          The industry’s most comprehensive insurance coverage and verified proof of reserves
        </li>
      </ul>
      </div>
    </div>
    <MarketBanner setId={setId} />
    </>
  )
}

export default FirstBanner