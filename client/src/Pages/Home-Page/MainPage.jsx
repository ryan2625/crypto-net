import React from 'react'
import FirstBanner from "./hero/FirstBanner";
import MarketBanner from "./crypto-prices/MarketBanner";
import JoinBanner from "./join-banner/JoinBanner";
import Navbar from "../components/navbar/Navbar";

/**
 * @component MainPage
 * This component stores the entire home page as well as the navbar component. This component gives the navbar prop 
 * sourced={true} because the navbar will then display the Home, Prices, and Rewards Links which are only located on this 
 * page. 
 * 
 * @param {function} setId : Used to set the state of the coin id when navigating to the coin page.
 */

function Main({ setId }) {
    return (
        <>
            <Navbar sourced={true} />
            <FirstBanner />
            <MarketBanner setId={setId} />
            <JoinBanner />
        </>
    )
}

export default Main