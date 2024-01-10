import React, {useState, useEffect} from 'react'
import "./marquee.scss"

function Marquee({data: nfts}) {

  return (
<section className='enable-animation'>
  <h2>Reverse</h2>
  <label htmlFor="enable-animation-2">Enable animation</label>
  <div className="marquee marquee--reverse">
    <ul className="marquee__content">
        { nfts &&
            nfts.map((nft, key) => {
                return (
                    <li key={key} className='marq-li'>
                        <img src={nft.thumb} alt="" />
                        <p>{nft.symbol}</p>
                        <p  className={nft.floor_price_24h_percentage_change > 0 ? "green" : "red"}>
                        {nft.floor_price_24h_percentage_change.toString().substring(0, 4)} %
                        </p>
                    </li>
                )
            })
        }
    </ul>

    <ul aria-hidden="true" className="marquee__content">
    { nfts &&
            nfts.map((nft, key) => {
                return (
                    <li key={key} className='marq-li'>
                        <img src={nft.thumb} alt="" />
                        <p>{nft.symbol}</p>
                        <p className={nft.floor_price_24h_percentage_change > 0 ? "green" : "red"}>
                        {nft.floor_price_24h_percentage_change.toString().substring(0, 4)} %
                        </p>
                    </li>
                )
            })
        }
    </ul>
  </div>
</section>

  )
}

export default Marquee