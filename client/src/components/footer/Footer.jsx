import React from 'react'
import "./footer.scss"
import image from "../../assets/appleStore.svg"
import image2 from "../../assets/playStore.svg"

function Footer() {
    return (
        <div className="footer">
            <div className="links">
                <div>
                    <ul>
                        <li>
                            Resources
                        </li>
                        <li>
                            Perpetuals
                        </li>
                        <li>
                            Bitcoin Treasury
                        </li>
                        <li>
                            Crypto Heatmap
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            Support
                        </li>
                        <li>
                            Request Form
                        </li>
                        <li>
                            Advertising
                        </li>
                        <li>
                            Help Center
                        </li>
                        <li>
                            FAQ
                        </li>
                        <li>
                            Live Chat
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            About
                        </li>
                        <li>
                            About Us
                        </li>
                        <li>
                            Careers
                        </li>
                        <li>
                        Company Vlog
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            Community
                        </li>
                        <li>
                            X/Twitter
                        </li>
                        <li>
                            Telegram
                        </li>
                        <li>
                            Instagram
                        </li>
                        <li>
                            Reddit
                        </li>
                        <li>
                            Facebook
                        </li>
                        <li>
                            Discord
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div className='divider'>

            </div>
            <div className="disclaimer">
                <div className="copyright">
                    <h5>© 2023 crypto-verse. All Rights Reserved.</h5>
                    <div className="image-store">
                        <img src={image} alt="" />
                        <img src={image2} alt="" />
                    </div>
                </div>
                <div className="legal">
                    <span>IMPORTANT DISCLAIMER:</span> All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (“Site”) is for your general information only, procured from third party sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. No content on our Site is meant to be a solicitation or offer. If you actually read this, I hope you enjoyed my website!
                </div>
            </div>
        </div>
    )
}

export default Footer