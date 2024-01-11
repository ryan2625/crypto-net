import React, { useEffect, useState } from 'react'
import "./individual-coin.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';
import image from "../../assets/loading.png"
function IndividualCoin({ id }) {

  //SETUP USESTATE DUMMY DATA PROPERLY INSTEAD OF
  //DATA NOT AVAILABLE!!

  const location = useLocation()

  const [navigation, setNavigation] = useState("/")

  const [coinData, setCoinData] = useState(
    {
      data: {
        image: {
          large: ""
        },
        name: "",
        symbol: "",
        coingecko_rank: "",
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
      console.log("COIND ID : " + id)
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
    const html = document.querySelector('html')
    html.style.scrollBehavior = "auto"
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
    html.style.scrollBehavior = ''
    checkSource()
  }, [id]);

  function checkSource(){
    if (location.state === "trending") {
      setNavigation("/trending")
    }
  }

  async function addToPortfolio(){
    console.log(JSON.stringify(id))
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: id})
    })
    const json = await res.json()

    if (!res.ok){
      console.log("Error adding to portfolio")
    }

    if (res.ok) {
      console.log("Added to portfolio")
    }
  }

  return (
    <div className="individual-page">
      <div className="back-btn">
        <Link to={navigation} state="coin">
          <ArrowBackIcon />
        </Link>
      </div>
      <div className='coin-description'>
        <div className="intro-coin">
          <img src={coinData?.image?.large || { image }} alt="" />
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