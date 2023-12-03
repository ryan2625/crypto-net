import React, {useEffect, useState} from 'react'
import "../styles/individual-coin.scss"
function IndividualCoin({id}) {

    const [cdMarket, setcdMarket] = useState()

    useEffect(() => {

        const fetchData = async () => {
            console.log("COIND ID : " + id)
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn`)
          .then(response => response.json())
          .then(data => {
            console.log("INDIVIDUAL COIN Data: " + data);
            setcdMarket(data);
          })
          .catch(error => console.error(error));
        }
    
        fetchData();
        
      }, [id]);
    
    
  return (
    <div className='coin-description'>
        <ul>

            </ul>

        </div>
  )
}

export default IndividualCoin