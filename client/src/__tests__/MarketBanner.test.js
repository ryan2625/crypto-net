//@ts-nocheck
import MarketBanner from '../Pages/Home-Page/crypto-prices/MarketBanner';
import { render, screen, cleanup } from '@testing-library/react'
import React, { useState } from "react";
import Footer from '../Pages/Nav-Footer/footer/Footer';
import App from "../App"
import { AuthContextProvider } from '../Contexts/AuthContext';
import "jest-canvas-mock";

// test("Crypto price api call", () => {
//     render(<App/>)
//     const marketBanner = screen.getByTestId("market-banner")
//     expect(marketBanner).toHaveTextContent("Bitcoin")
//     expect(marketBanner).toBeInTheDocument()
// })

test("Simple Jest test on footer", () => {
    render(<Footer/>)
    const footer = screen.getByTestId("the-footer")
    expect(footer).toHaveTextContent("Resources")
    expect(footer).toBeInTheDocument()
})