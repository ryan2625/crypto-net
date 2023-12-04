import React, { useEffect, useState } from 'react'
import "../styles/individual-coin.scss"
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
    <div className='coin-description'>
      { coinData&&
      <ul>
        <li>
          {coinData.description.cs || "loading"}
        </li>
        <li>
          {coinData.id  || "loading"}
        </li>
        <li>
          {coinData.symbol  || "loading"}
        </li>
        <li>
          {coinData.description.ko  || "loading"}
        </li>
      </ul>
}

    </div>
  )
}

export default IndividualCoin