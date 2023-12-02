import React, { useEffect, useState } from 'react'
import "../styles/market-banner.scss"

function MarketBanner() {

    const [coinData, setCoinData] = useState([])

    const [topCoins, setTopCoins] = useState([])

    useEffect(() => {

      const fetchData = async () => {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn")
          .then(response => response.json())
          .then(data => {
            console.log("DATA : " + data);
            setCoinData(data);
            var dummyCoins = []
            for (let i = 0; i < 4; i++) {
              dummyCoins.push(data[i])
            }
            setTopCoins(dummyCoins)
          })
          .catch(error => console.error(error));
        }
        fetchData();
      }, []);

      useEffect(() => {
        
      }, [])
    
  return (
    <div className='market-banner'>
      <div className="top-coins">
        {
          topCoins.map((coin) => {
            var truncate = coin.price_change_percentage_24h.toString().substring(0, 4)
            return (
              <div>
                <img src={coin.image} alt={coin.name} />
                <h2>{coin.name} <span className={coin.price_change_percentage_24h > 1 ? "green" : "red"}>{truncate} %</span></h2>
                <h3>${new Intl.NumberFormat().format(coin.current_price)}</h3>
              </div>
            )
          })
        }
      </div>
      <div className="coin-base">
        {coinData.map((coin) =>{
            return (
                <div>
                    <img src={coin.image} alt={coin.name} />
                    <h2>{coin.name}</h2>
                    <h3>{coin.symbol}</h3>
                    <h3>{new Intl.NumberFormat().format(coin.current_price)}</h3>
                    <h3>{new Intl.NumberFormat().format(coin.market_cap)}</h3>
                    <h3>{coin.price_change_percentage_24h}</h3>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default MarketBanner