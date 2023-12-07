import React from 'react'
import FirstBanner from '../components/FirstBanner'
import MarketBanner from '../components/MarketBanner'
import JoinBanner from '../components/JoinBanner'
import Navbar from '../components/Navbar';

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