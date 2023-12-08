import React, { useEffect, useState } from 'react'
import "../styles/market-banner.scss"
import { Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'



function MarketBanner({ setId }) {

  const [coinData, setCoinData] = useState([])

  const [topCoins, setTopCoins] = useState([])

  const [page, setPage] = useState(1);

  const location = useLocation()

  const navigate = useNavigate()


  const handleChange = (event, value) => {
    setPage(value);
  };

  //TODO create this code into a function  setCoinData varDummyCoins etc

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn`)
        .then(response => response.json())
        .then(data => {
          setCoinData(data);
          localStorage.setItem("coinData_" + page, JSON.stringify(data));
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
    if (localStorage.getItem("coinData_" + page) === null) {
      fetchData();
    } else {
      var coinDataLocal = JSON.parse(localStorage.getItem("coinData_" + page))
      setCoinData(coinDataLocal);
      var dummyCoins = []
      for (let i = 0; i < 4; i++) {
        dummyCoins.push(coinDataLocal[i])
      }
      if (topCoins.length === 0) {
        setTopCoins(dummyCoins)
      }
    }

    checkSource()

  }, [page]);

  function checkSource() {
    if (location.state === "coin") {
      const html = document.querySelector('html')
      html.style.scrollBehavior = "auto"
      document.getElementById("scroller").scrollIntoView()
      html.style.scrollBehavior = ""
      navigate('/', { state: null });
    }
  }

  return (
    <div className='market-banner'>
      <div className="top-coins">
        {
          topCoins.map((coin, key) => {
            var truncate = coin.price_change_percentage_24h.toString().substring(0, 4)
            return (
              <div key={key}>
                <img src={coin.image} alt={coin.name} />
                <h2>{coin.name} <span className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>{truncate} %</span></h2>
                <h3>${new Intl.NumberFormat().format(coin.current_price)}</h3>
              </div>
            )
          })
        }
      </div>
      <div className="gradient" id="scroller">

      </div>
      <div className="coin-base" id="prices">
        <h2>Today's Cryptocurrency Prices</h2>
        <div className="heading">
          <h3 className="first-head hash">#</h3>
          <h3 className="first-head">COIN</h3>
          <h3>PRICE</h3>
          <h3>24H CHANGE</h3>
          <h3>MARKET CAP</h3>
        </div>
        <div className='api-table'>
          {coinData.map((coin, key) => {
            return (
              <Link className='row-link row' key={key} onClick={() => setId(coin.id)} to={"/coins/" + coin.name.toLowerCase()}>
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
          <div className="pag">
            <Pagination count={15} page={page} onChange={handleChange} color='primary' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketBanner