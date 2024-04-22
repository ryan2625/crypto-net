//@ts-nocheck
import React, { useState, useEffect } from 'react'
import FirstBanner from "./hero/FirstBanner";
import MarketBanner from "./crypto-prices/MarketBanner";
import JoinBanner from "./join-banner/JoinBanner";
import Navbar from "../Nav-Footer/navbar/Navbar"
import Ethereum from './eth-model/Ethereum';
import "./Eth.scss"
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion"

/**
 * @component MainPage
 * This component stores the entire home page as well as the navbar component. This component gives the navbar prop 
 * sourced={true} because the navbar will then display the Home, Prices, and Rewards Links which are only located on this 
 * page. 
 * 
 * UPDATE 3/18/2024: I made some of the pages
 * @ts-nocheck because I didn't have time to give types
 * to my 3D components. RIP.
 * 
 * @param {function} setId : Used to set the state of the coin id when navigating to the coin page (received from App.js).
 */

interface Props {
    setId: React.Dispatch<React.SetStateAction<string | null>>
}

const Main: React.FC<Props> = ({ setId }) => {

    const [callRef, setCallRef] = useState(false)
    const [callRef3, setCallRef3] = useState(false)
    const [callRefX, setCallRefX] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 1450) {
            document.body.style.zoom = .85
        }
    }, [])

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
            const delay = 1 + i * 0.5;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            };
        }
    };

    const { ref: textRef, inView: callRef2 } = useInView({
        rootMargin: '-150px 0px',
        onChange: (inView) => {
            if (inView) {
                setCallRef3(true);
                setCallRef(true)
            }
        },
    });

    const { ref: callRef5, inView: callRef5V } = useInView({
        rootMargin: '-100px 0px',
        onChange: (inView) => {
            if (inView) {
                setCallRefX(true)
            }
        }
    });

    return (
        <>
            <Navbar sourced={true} />
            <FirstBanner />
            <MarketBanner setId={setId} />
            <JoinBanner />
            <div class="three-action">
                <Ethereum />
                <div className="call-action" ref={textRef}>
                    <h2 className={callRef ? "callRefBase callRefEdit" : "callRefBase"}>
                        THE FUTURE
                    </h2>
                    <h3 className={callRef ? "callRefH3Base callRefH3" : "callRefH3Base"}><span>IS HERE</span></h3>
                    <div className="draw-box">
                        <motion.svg
                            width="500"
                            height="250"
                            viewBox="0 0 500 250"
                            initial="hidden"
                            animate={callRef3 ? "visible" : "hidden"}
                        >
                            <motion.line
                                x1="10" y1="127"
                                x2="252" y2="10"
                                stroke="#005da4"
                                variants={draw}
                                custom={1}
                            />
                            <motion.line
                                x1="250" y1="10"
                                x2="490" y2="125"
                                stroke="#005da4"
                                variants={draw}
                                custom={2}
                            />
                            <motion.line
                                x1="490" y1="123"
                                x2="250" y2="240"
                                stroke="#005da4"
                                variants={draw}
                                custom={1}
                            />
                            <motion.line
                                x1="252" y1="240"
                                x2="10" y2="125"
                                stroke="#005da4"
                                variants={draw}
                                custom={2}
                            />
                        </motion.svg>
                        <Link ref={callRef5} to="/login" className={callRefX ? "three-join three-anim" : "three-join"}>JOIN NOW</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
