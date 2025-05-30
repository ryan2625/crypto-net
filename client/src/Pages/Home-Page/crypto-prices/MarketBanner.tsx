import React, { useEffect, useState, ChangeEvent } from 'react'
import "./market-banner.scss"
import { Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CoinData } from './CoinData'

/**
 * @component MarketBanner
 * Displays the top 4 coins above the table, while also displaying a chart of the top 150 coins, displayed ten per page. 
 * topCoins are the 4 displayed above, and coinData is the 10 displayed in the table per page.
 * @param {function} setId : function to set the id of the coin to be displayed on the coin page.
 */

interface MarketBannerProps {
  setId: React.Dispatch<React.SetStateAction<string | null>>
}

const MarketBanner: React.FC<MarketBannerProps> = ({ setId }) => {

  const apiKey = process.env.REACT_APP_API_KEY
  const [coinData, setCoinData] = useState<CoinData[]>([])
  const [topCoins, setTopCoins] = useState<CoinData[]>([])

  const [params, setParams] = useSearchParams({ page: "" })
  const [page, setPage] = useState<number>(1);
  //location is used to retrieve the state from the history stack, which is used to check if the user is navigating 
  //from the coin page. In that case, it will grab the state from the location and scroll to the top of the table.
  //navigate is used to reset the state after we scroll to prevent any unexpected behavior.
  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setParams({ page: value.toString() });
  };

  /**
   * UseEffect checks to see if there is already coin data in the local stroage. If not, it makes a request to the
   * coingecko API. In either case, it then sets the state of the coins to be displayed in either the top 4 coins
   * or the coin table. We use an abort controller to ensure good UI experience if a user clicks on the pagnination 
   * buttons rapidly (prevent flashing). Prevent race conditions, and unneeded api calls if user goes from page to 
   * page while data still  fetching.
   */

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      console.log("PAGE", page)
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&x_cg_demo_api_key=${apiKey}`, {
        signal: controller.signal
      })
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
      var coinDataLocal = JSON.parse(localStorage.getItem("coinData_" + page) || "{}")
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
    const sParam = params.get("page")
    if (sParam != null && sParam != "" && parseInt(sParam) <= 15) {
      setPage(parseInt(sParam))
      setParams({ page: (sParam).toString() })
    }
    return () => {
      controller.abort()
    }

  }, [page]);

  //Function used to check if we are navigating from the coin page. If so, it will scroll to the top of the table.

  function checkSource() {
    if (location.state === "main") {
      const html = document.querySelector('html')!
      html.style.scrollBehavior = "auto"
      document.getElementById("scroller")!.scrollIntoView()
      html.style.scrollBehavior = ""
      navigate('/', { state: null });
    }
    if (location.state === "portfolio-nav") {
      const html = document.querySelector('html')!
      html.style.scrollBehavior = "auto"
      document.getElementById("prices")!.scrollIntoView()
      html.style.scrollBehavior = ""
      navigate('/', { state: null });
    }
  }

  return (
    <>
      <section className='market-banner' data-testid="market-banner">
        <div className="top-coins">
          {
            topCoins.map((coin, key) => {
              var truncate = coin.price_change_percentage_24h.toString().substring(0, 4)
              if (truncate.slice(-1) === ".") {
                truncate = truncate.substring(0, 3)
              }
              return (
                <div key={key}>
                  <img src={coin.image} alt={coin.name} loading='lazy' />
                  <h2>{coin.name} <span className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>{truncate} %</span></h2>
                  <h3>${new Intl.NumberFormat().format(coin.current_price)}</h3>
                </div>
              )
            })
          }
        </div>
        {/*This Div sets a smooth gradient transition from the top 4 coins to the background of the table*/}
        <div className="gradient">
        </div>
        <div className="coin-base" id="prices">
          <h2 id="todays-prices">Today's Cryptocurrency Prices</h2>
          <div className='api-table' style={{ position: "relative" }}>
            <div className="heading">
              <h3 className="first-head hash">#</h3>
              <h3 className="first-head">COIN</h3>
              <h3>PRICE</h3>
              <h3>24H CHANGE</h3>
              <h3>MARKET CAP</h3>
              <div id="scroller"></div>
            </div>
            {coinData.map((coin, key) => {
              var truncate = coin?.price_change_percentage_24h?.toString().substring(0, 4) || '1.70'
              if (truncate.slice(-1) === ".") {
                truncate = truncate.substring(0, 3)
              }
              return (
                <Link
                  state={"main " + page}
                  className='row-link row'
                  key={key}
                  onClick={() => setId(coin.id)}
                  to={"/coins/" + coin.id}
                  aria-label={coin.name + " data"}>
                  <h3 className='first-head'>{(key + 1) + (page * 10) - 10}</h3>
                  <div className="identifier">
                    <img src={coin.image} alt={coin.name} />
                    <div>
                      <h2>{coin.name}</h2>
                      <h3>{coin.symbol.toUpperCase()}</h3>
                    </div>
                  </div>
                  <h3 className='market-capper'>${new Intl.NumberFormat().format(coin.current_price)}</h3>
                  <h3 className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>{truncate}%</h3>
                  <h3>${new Intl.NumberFormat().format(coin.market_cap)}</h3>
                </Link>
              )
            })}
          </div>
          <div className="pag" aria-label="Change coin page">
            <Pagination
              count={15}
              page={page}
              onChange={handleChange} color='primary' />
          </div>
        </div>
      </section>
    </>
  )
}

export default MarketBanner
