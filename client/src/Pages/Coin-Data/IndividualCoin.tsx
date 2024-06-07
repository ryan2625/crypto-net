import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../../Hooks/useScroll';
import { useAuthContext } from '../../Hooks/useAuthContext'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckIcon from '@mui/icons-material/Check';
import image from "../../Assets/gif-loader.gif"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CoinData2 } from "./CoinData2"
import { initialCoinData } from './CoinData2';
import "./individual-coin.scss"


/**
 * @component IndividualCoin
 * This component is used to display the data of an individual coin. It can be accessed via the home page or the trending 
 * page. It will display more data points and specifics about the coin. It also allows the user to add the coin to their 
 * portfolio.
 *
 * @param {string} id : the id of the coin to be displayed
 */

interface IndividualCoinProps {
  id: string | null
}

const IndividualCoin: React.FC<IndividualCoinProps> = ({ id }) => {

  const location = useLocation()
  //To display either coin added successfully or error message
  const confirmation = useRef<HTMLDivElement>(null)
  const confirmation2 = useRef<HTMLDivElement>(null)
  //To determine the navigation of the back button
  const [navigation, setNavigation] = useState<string>("/")
  //Handle showing the confirmation
  const [added, setAdded] = useState<boolean>(false)
  const { user } = useAuthContext()
  const { scroller } = useScroll()
  const [Error, setError] = useState<string>("")
  //Value 24H meter
  const [meter, setMeter] = useState<number>(0)
  const [coinData, setCoinData] = useState<CoinData2>(initialCoinData)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn`)
        .then(response => response.json())
        .then(data => {
          setCoinData(data);
          localStorage.setItem("coinData_" + id, JSON.stringify(data));
        })
        .catch(error => console.error(error));
    }

    if (localStorage.getItem("coinData_" + id) === null) {
      fetchData();
    } else {
      setCoinData(JSON.parse(localStorage.getItem("coinData_" + id) || "{}"));
    }
    scroller()
    checkSource()
  }, [id]);

  useEffect(() => {
    setGradient()
  }, [coinData])

  //This uses react-router-dom to check the state of the location. This will change the back button to either navigate to the trending page or the portfolio page depending on the entry point.

  function checkSource() {
    if (location.state === "trending") {
      setNavigation("/trending")
    } else if (location.state === "portfolio") {
      setNavigation("/portfolio")
    }
  }


  //This function handles setting the value for the 24H meter. It converts the current price to a percentage of the difference between the high and the low of the value of the day. We also use the meter value that we set here to position the arrow on the bar accordingly. 

  function setGradient() {
    const low = coinData?.market_data?.low_24h?.usd
    const high = coinData?.market_data?.high_24h?.usd - low
    const current = coinData?.market_data?.current_price?.usd - low
    setMeter(current / high * 100)
  }

  async function addToPortfolio() {
    if (!user?.token) {
      setError("User not logged in")
      confirmation2.current!.className = "confirmation"
      setTimeout(() => {
        confirmation2.current!.className = "confirmation confirmation-show"
      }, 50)
      return
    }
    const res = await fetch("https://crypto-api-epz8.onrender.com/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`
      },
      body: JSON.stringify({
        name: id,
        link: coinData.name,
        image: coinData.image.large,
        marketRate: coinData.market_data.current_price.usd
      })
    })

    if (!res.ok) {
      setError("Oops! Duplicate Coin!")
      confirmation2.current!.className = "confirmation"
      setTimeout(() => {
        confirmation2.current!.className = "confirmation confirmation-show"
      }, 50)
    }

    if (res.ok) {
      confirmation.current!.className = "confirmation"
      setTimeout(() => {
        confirmation.current!.className = "confirmation confirmation-show"
      }, 50)
      setAdded(!added)
    }
  }

  return (
    <section className="individual-page">
      {coinData?.image?.large === "" ? (
        <img src={image} alt="loading screen" id="loader-coin" />
      ) : (
        <>
          <div className="confirmation" ref={confirmation}>
            <h4>Added to Portfolio</h4><span><CheckIcon aria-hidden="true" /></span>
          </div>
          <div className="confirmation"
            style={{ backgroundColor: "red" }}
            ref={confirmation2}>
            <h4>{Error}</h4><span><CheckIcon style={{ visibility: "hidden" }} aria-hidden="true" /></span>
          </div>
          <div className="back-btn">
            <Link to={navigation} state="coin" aria-label="Navigate back to the page you came from">
              <ArrowBackIcon aria-hidden="true" />
            </Link>
          </div>
          <div className='coin-description'>
            <div className="intro-coin">
              <img src={coinData?.image?.large || image} alt={coinData.name + " image"} />
              <h1>{coinData?.name || "Data not available"} <span>{coinData?.symbol?.toUpperCase() || "Data not available"}</span></h1>
              <button className='add-p' onClick={addToPortfolio}>
                ADD TO WATCHLIST
              </button>
              <h2></h2>
              <div className="live-rate">
                <h3 id="main-price">
                  ${new Intl.NumberFormat().format(coinData?.market_data?.current_price?.usd)}
                </h3>
                <div className="entire-bar">
                  <div className="labels">
                    <p>$
                      {coinData?.market_data?.low_24h?.usd > coinData?.market_data?.current_price?.usd ? (
                        new Intl.NumberFormat().format
                          (coinData?.market_data?.current_price?.usd
                          )) : (
                        new Intl.NumberFormat().format
                          (coinData?.market_data?.low_24h?.usd
                          )
                      )}
                    </p>
                    <p>24H Range</p>
                    <p>${new Intl.NumberFormat().format(coinData?.market_data?.high_24h?.usd)}</p>
                  </div>
                  <div className='actual-progress'
                    style={{
                      width: `${(100 - meter) * 5}px`
                    }}
                  />
                  <ArrowDropDownIcon
                    id="drop-arrow"
                    aria-hidden="true"
                    style={{
                      left: `
                      ${((meter / 100) * 500) - 30
                        }px
                      `
                    }} />
                </div>
              </div>
              <div className="data-points">
                <div className="individual-rates">
                  <h3 className='table-identifier'>
                    Market Trends
                  </h3>
                  <div>
                    <p>
                      Market Rate
                    </p>
                    <p>
                      ${new Intl.NumberFormat().format(coinData?.market_data?.current_price?.usd)}
                    </p>
                  </div>
                  <div>
                    <p id="tooltip1">
                      Market Cap<HelpOutlineIcon
                        aria-hidden="true" />
                    </p>
                    <p>${new Intl.NumberFormat().format(coinData?.market_data?.market_cap?.usd) || "Data not available"}
                    </p>
                  </div>
                  <div>
                    <p>
                      Circulating Supply
                    </p>
                    <p>{new Intl.NumberFormat().format(coinData?.market_data?.circulating_supply) || "Data not available"}
                    </p>
                  </div>
                  <div>
                    <p>
                      24H Change
                    </p>
                    <p>
                      <span className={coinData?.market_data?.price_change_percentage_24h > 0 ? "green" : "red"}>{coinData?.market_data?.price_change_percentage_24h.toString().substring(0, 5)}%</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Total Volume
                    </p>
                    <p> ${new Intl.NumberFormat().format(coinData?.market_data?.total_volume?.usd) || "Data not available"}
                    </p>
                  </div>
                </div>
                <div className="individual-rates">
                  <h3 className='table-identifier'>
                    Currency Information
                  </h3>
                  <div>
                    <p>
                      Genesis Date
                    </p>
                    <p> {coinData?.genesis_date || "Data not available"}
                    </p>
                  </div>
                  <div>
                    <p>
                      Hashing Algorithm
                    </p>
                    <p>{coinData?.hashing_algorithm || "Data not available"}
                    </p>
                  </div>
                  <div>
                    <p>
                      Homepage
                    </p>
                    <a href={coinData?.links?.homepage[0]} target="_blank"
                    >{coinData?.links?.homepage[0] || "Data not available"}</a>
                  </div>
                  <div>
                    <p>
                      White paper
                    </p>{coinData?.links?.whitepaper ? (
                      <a href={coinData?.links?.whitepaper} target="_blank"
                      >{coinData?.links?.whitepaper}</a>)
                      :
                      (<p>Data not available</p>)}
                  </div>
                  <div>
                    <p>
                      Github
                    </p>{coinData?.links?.repos_url?.github[0] ? (
                      <a href={coinData?.links?.repos_url?.github[0]} target="_blank"
                      >{coinData?.links?.repos_url?.github[0]}</a>)
                      :
                      (<p>Data not available</p>)}
                  </div>
                </div>
              </div>
            </div>
            {coinData &&
              <p dangerouslySetInnerHTML={{
                __html: coinData?.description?.en || "Data not available"
              }} id="last-p" />
            }
          </div>
        </>
      )}
    </section>
  )
}

export default IndividualCoin
