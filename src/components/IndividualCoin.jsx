import React, { useEffect, useState } from 'react'
import "../styles/individual-coin.scss"
import image from "../assests/loading.png"
function IndividualCoin({ id }) {

  const [coinData, setCoinData] = useState()

  useEffect(() => {

    const fetchData = async () => {
      console.log("COIND ID : " + id)
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn`)
        .then(response => response.json())
        .then(data => {
          console.log("API INDIVIDUALCOIN IS BEING CALLED");
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
  }, [id]);


  return (
    <div className="individual-page">
      <div className='coin-description'>
        <div className="intro-coin">
          <img src={coinData?.image?.large || { image }} alt="" />
          <h1>{coinData?.name || "Data not available"} <span>{coinData?.symbol?.toUpperCase() || "Data not available"}</span></h1>
          <h2>Rank: #{coinData?.coingecko_rank || "Data not available"}</h2>
          <h3>Genesis Date: {coinData?.genesis_date || "Data not available"}</h3>
          <h4>Hashing Algorithm: {coinData?.hashing_algorithm || "Data not available"}</h4>
        </div>
        {coinData &&
          <p>
            {coinData?.description?.cs || "Data not available"}
          </p>
        }
      </div>
    </div>
  )
}

export default IndividualCoin