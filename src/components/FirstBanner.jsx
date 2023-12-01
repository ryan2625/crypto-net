import React from 'react'
import "../styles/first-banner.scss"

function FirstBanner() {
  return (
    <div className='first-banner'>
      <h1>
        The World’s Leading Cryptocurrency Platform
      </h1>
      <h2>
        Buy Bitcoin, Ethereum, and all your favourite crypto
      </h2>
      <ul>
        <li>
          Trusted by more than 80M users world-wide
        </li>
        <li>
        Leader in regulatory compliance and security certifications
        </li>
        <li>
        The industry’s most comprehensive insurance coverage and verified proof of reserves
        </li>
      </ul>
    </div>
  )
}

export default FirstBanner