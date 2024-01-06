import React from 'react'
import FirstBanner from "../components/hero/FirstBanner";
import MarketBanner from "../components/crypto-prices/MarketBanner";
import JoinBanner from "../components/join-banner/JoinBanner";
import Navbar from "../components/navbar/Navbar";

function Main({setId}) {
    return (
        <>
            <Navbar />
            <FirstBanner />
            <MarketBanner setId={setId} />
            <JoinBanner />
        </>
    )
}

export default Main