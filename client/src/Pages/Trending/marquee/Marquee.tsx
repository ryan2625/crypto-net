//@ts-nocheck
import React, { useState, useEffect } from 'react'
import "./marquee.scss"

/**
 * @component Marquee 
 * Displays a scrolling marquee of the top NFTs at the top of the Trending page.
 * 
 * @param {Array} data - NFT data received as props from the Trending component.
 */

function Marquee({ data: nftsData }) {

    const [nfts, setDataNFT] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("nfts") === null) {
            setDataNFT(nftsData)
        } else {
            setDataNFT(JSON.parse(localStorage.getItem("nfts")))
        }
    }, [nftsData])

    return (
        <section className='enable-animation'>
            <h2>Reverse</h2>
            <label htmlFor="enable-animation-2">Enable animation</label>
            <div className="marquee marquee--reverse">
                <ul className="marquee__content">
                    {nfts &&
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

                <ul aria-hidden="true" className="marquee__content">
                    {nfts &&
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