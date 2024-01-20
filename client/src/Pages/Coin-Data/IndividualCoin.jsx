import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import { useAuthContext } from '../../hooks/useAuthContext'
import CheckIcon from '@mui/icons-material/Check';
import image from "../../assets/gif-loader.gif"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./individual-coin.scss"


/**
 * @component IndividualCoin
 * This component is used to display the data of an individual coin. It can be accessed via the home page or the 
 * trending page. It will display more data points and specifics about the coin. It also allows the user to add
 * the coin to their portfolio.
 * 
 * @param {string} id : the id of the coin to be displayed
 */
function IndividualCoin({ id }) {

  const location = useLocation()
  //To display either coin added successfully or error message
  const confirmation = useRef(null)
  const confirmation2 = useRef(null)
  //To determine the navigation of the back button
  const [navigation, setNavigation] = useState("/")
  const [added, setAdded] = useState(false)
  const { user } = useAuthContext()
  const { scroller } = useScroll()
  const [Error, setError] = useState("")

  const [coinData, setCoinData] = useState(
    {
      data: {
        image: {
          large: ""
        },
        name: "",
        symbol: "",
        market_data: {
          current_price: {
            usd: ""
          },
          price_change_percentage_24h: ""
        },
        genesis_date: "",
        hashing_algorithm: "",
        description: {
          en: ""
        }
      }
    }
  )

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
      setCoinData(JSON.parse(localStorage.getItem("coinData_" + id)));
    }
    scroller()
    checkSource()
  }, [id, coinData?.data?.image]);

  //This uses react-router-dom to check the state of the location. This will change the back button to either navigate
  //to the trending page or the portfolio page depending on the entry point.

  function checkSource() {
    if (location.state === "trending") {
      setNavigation("/trending")
    } else if (location.state === "portfolio") {
      setNavigation("/portfolio")
    }
  }

  async function addToPortfolio() {
    if (!user) {
      setError("User not logged in")
      confirmation2.current.className = "confirmation"
      setTimeout(() => {
        confirmation2.current.className = "confirmation confirmation-show"
      }, 50)
      return
    }
    const res = await fetch("https://crypto-endpoint.cyclic.app/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        name: id,
        link: coinData.name,
        image: coinData.image.large,
        marketRate: coinData.market_data.current_price.usd
      })
    })
    const json = await res.json()

    if (!res.ok) {
      setError("Oops! Duplicate Coin!")
      confirmation2.current.className = "confirmation"
      setTimeout(() => {
        confirmation2.current.className = "confirmation confirmation-show"
      }, 50)
    }

    if (res.ok) {
      confirmation.current.className = "confirmation"
      setTimeout(() => {
        confirmation.current.className = "confirmation confirmation-show"
      }, 50)
      setAdded(!added)
    }
  }

  return (
    <div className="individual-page">
      <div className="confirmation" ref={confirmation}>
        <h4>Added to Portfolio</h4><span><CheckIcon aria-hidden="true"/></span>
      </div>
      <div className="confirmation"
        style={{ backgroundColor: "red" }}
        ref={confirmation2}>
        <h4>{Error}</h4><span><CheckIcon style={{ visibility: "hidden" }} aria-hidden="true" /></span>
      </div>
      <div className="back-btn">
        <Link to={navigation} state="coin" aria-label="Navigate back to the page you came from">
          <ArrowBackIcon aria-hidden="true"/>
        </Link>
      </div>
      <div className='coin-description'>
        <div className="intro-coin">
          <img src={coinData?.image?.large || image} alt={coinData.name + " image"} />
          <h1>{coinData?.name || "Data not available"} <span>{coinData?.symbol?.toUpperCase() || "Data not available"}</span></h1>
          <h2></h2>
          <button className='add-p' onClick={addToPortfolio}>ADD TO WATCHLIST</button>
          <div className="rates">
            <h3>
              Market Rate: ${new Intl.NumberFormat().format(coinData?.market_data?.current_price?.usd || "Data not available")}
            </h3>
            <h3>24H Change: <span className={coinData?.market_data?.price_change_percentage_24h > 0 ? "green" : "red"}>{coinData?.market_data?.price_change_percentage_24h}%</span></h3>
          </div>
          <h3>Genesis Date: {coinData?.genesis_date || "Data not available"}</h3>
          <h4>Hashing Algorithm: {coinData?.hashing_algorithm || "Data not available"}</h4>
        </div>
        {coinData &&
          <p dangerouslySetInnerHTML={{
            __html: coinData?.description?.en || "Data not available"
          }} />
        }
      </div>
    </div>
  )
}

export default IndividualCoin