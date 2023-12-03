import React, { useEffect, useState } from 'react'
import "../styles/market-banner.scss"
import { Pagination } from '@mui/material'
import { Link } from 'react-router-dom'

function MarketBanner( {setId} ) {

  const [coinData, setCoinData] = useState([])

  const [topCoins, setTopCoins] = useState([])

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn`)
        .then(response => response.json())
        .then(data => {
          console.log("DATA : " + data);
          setCoinData(data);
          var dummyCoins = []
          for (let i = 0; i < 4; i++) {
            dummyCoins.push(data[i])
          }
          if (topCoins.length === 0) {
            setTopCoins(dummyCoins)
          }
        })
        .catch(error => console.error(error));
    }
    fetchData();
  }, [page]);

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
                <h2>{coin.name} <span className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>{truncate} %</span></h2>
                <h3>${new Intl.NumberFormat().format(coin.current_price)}</h3>
              </div>
            )
          })
        }
      </div>
      <div className="gradient">
        
      </div>
      <div className="coin-base">
        <h2>Today's Cryptocurrency Prices</h2>
        <div className="heading">
          <h3 className="first-head hash">#</h3>
          <h3 className="first-head">COIN</h3>
          <h3>PRICE</h3>
          <h3>24H CHANGE</h3>
          <h3>MARKET CAP</h3>
        </div>
        {coinData.map((coin, key) => {
          return (
            <Link className='row-link row' key={key} to={"/coins/" + coin.name.toLowerCase()}>
              <h3 className='first-head'>{(key + 1) + (page * 10) - 10}</h3>
              <div className="identifier">
                <img src={coin.image} alt={coin.name} />
                <div>
                  <h2>{coin.name}</h2>
                  <h3>{coin.symbol.toUpperCase()}</h3>
                </div>
              </div>
              <h3>${new Intl.NumberFormat().format(coin.current_price)}</h3>
              <h3 className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>{coin.price_change_percentage_24h.toString().substring(0, 4)}%</h3>
              <h3>${new Intl.NumberFormat().format(coin.market_cap)}</h3>
            </Link>
          )
        })}
        <Pagination count={28} page={page} onChange={handleChange} color='primary' />
      </div>
    </div>
  )
}

export default MarketBanner