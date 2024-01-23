import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useScroll } from "../../hooks/useScroll"
import Navbar from '../components/navbar/Navbar';
import Marquee from './marquee/Marquee';
import "./trending.scss"

/**
 * @component Trending
 * Displays the top trending NFTs and coins as defined by the criteria of the API. A scrolling marquee of the top NFTs is displayed at the top.
 * 
 * @param {function} setId : Used to set the state of the id of the coin when you click a link in the table.
 */

function Trending({ setId }) {

    //Use state to set the trending coins and trending NFTs, which are then mapped out to the two tables below. 
    //We grab the scroll hook to scroll to the top of the page.

    const [trending, setTrending] = useState([])
    const [nfts, setNFTs] = useState([])
    const { scroller } = useScroll();

    /**
     * UseEffect used to first scroll to the top of the page instantly, then checks to see if 
     * there is already NFT/Coin data in the local storage. If not, then it fetches the data from the API and sets the 
     * state.
     */

    useEffect(() => {
        scroller()
        const fetchData = async () => {
            const res = await fetch("https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-Z7basDpAgs5kZ5wE72YuVcUn").then(response => response.json()).then(data => {
                setNFTs(data.nfts)
                setTrending(data.coins.slice(0, 10))
                localStorage.setItem("trending", JSON.stringify(data.coins.slice(0, 10)))
                localStorage.setItem("nfts", JSON.stringify(data.nfts))
            })
        }
        if (localStorage.getItem("trending") === null) {
            fetchData()
        } else {
            setTrending(JSON.parse(localStorage.getItem("trending")))
            setNFTs(JSON.parse(localStorage.getItem("nfts")))
        }
    }, [])

    return (
        <>
            <Navbar sourced={false} />
            <Marquee data={nfts} />
            <section className='portfolio-display'>
                <header id="first-h1" style={{ textAlign: "center", marginBottom: '4rem' }}>Gain insight through the latest trending coins of the <span>crypto-verse</span></header>
                <h1>Trending NFTs</h1>
                <p className='off-white'>Trending NFTs based on the highest trading volume in the last 24 hours.</p>
                <div className="trending-nfts">
                    <div className="nft-header">
                        <h3 >COIN</h3>
                        <h3>24H CHANGE</h3>
                        <h3 className='optional-display'>AVG/
                            <span className='off-white2'>FLOOR</span> PRICE</h3>
                        <h3 className='optional-display'>7D</h3>
                    </div>
                    {
                        nfts.map((nft, key) => {
                            return (
                                <div className="nft-row" key={key}>
                                    <div className='identifier updated-identifier'>
                                        <img src={nft.thumb} alt="NFT thumbnail" />
                                        <div>
                                            <h3>{nft.name.toString().slice(0, 13)}</h3>
                                            <p>{nft.symbol.toString().slice(0, 13)}</p>
                                        </div>
                                    </div>
                                    <p
                                        className={nft.floor_price_24h_percentage_change > 0 ? "green" : "red"}>
                                        {nft.floor_price_24h_percentage_change.toString().substring(0, 4)}%
                                    </p>
                                    <div className='optional-display p-container'>
                                        <p>{nft.data.h24_average_sale_price}</p>
                                        <p className='optional-display off-white2'>{nft.data.floor_price}</p>
                                    </div>
                                    <img
                                        className="optional-display sparkline"
                                        src={nft.data.sparkline}
                                        alt="NFT 7D trends" />
                                </div>
                            )
                        })}
                </div>
                <div className="trending-main">
                    <h1>Top Trending Coins</h1>
                    <p className='off-white'>The 10 most searched coins in the last 24 hours.</p>
                    <div className="coin-base" style={{ padding: 0 }}>
                        <div className="api-table">
                            <div className="heading">
                                <h3 className="first-head hash">RANK &#160; </h3>
                                <h3 className="first-head">&#160; COIN</h3>
                                <h3>PRICE</h3>
                                <h3>24H CHANGE</h3>
                                <h3>MARKET RANK</h3>
                            </div>
                            {
                                trending.map((coin, key) => {
                                    return (
                                        <Link
                                            state="trending"
                                            className='row-link row'
                                            key={key} onClick={() => setId(coin.item.id)} to={"/coins/" + coin.item.name.toLowerCase()}
                                            aria-label='Explore Trending Coins Details'>
                                            <h3 className='first-head'>{coin.item.score + 1}</h3>
                                            <div className="identifier">
                                                <img
                                                    src={coin.item.small}
                                                    alt={coin.item.name}
                                                    loading='lazy' />
                                                <div>
                                                    <h2>{coin.item.name}</h2>
                                                    <h3>{coin.item.symbol.toUpperCase()}</h3>
                                                </div>
                                            </div>
                                            <h3 className='market-capper'>
                                                {coin.item.data.price}
                                            </h3>
                                            <h3
                                                className={coin.item.data.price_change_percentage_24h.usd > 0 ? "green" : "red"}>
                                                {coin.item.data.price_change_percentage_24h.usd.toString().substring(0, 4)}%
                                            </h3>
                                            <h3>
                                                {new Intl.NumberFormat().format(coin.item.market_cap_rank)}
                                            </h3>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Trending