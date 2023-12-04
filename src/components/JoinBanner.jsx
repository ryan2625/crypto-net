import React, { useRef, useState, useEffect } from 'react'
import image from "../assests/cryptoVisa1.jpg"
import "../styles/join-banner.scss"

function JoinBanner() {

    const scrollRef = useRef(null)
    const childScrollRef = useRef(null)

    useEffect(() => {

        const handleScroll = () => {
            if (scrollRef.current && childScrollRef.current) {
              const parentRect = scrollRef.current.getBoundingClientRect();
              const yOffset = parentRect.top;
              console.log(yOffset)

              if (yOffset <= 500 && yOffset >= -400) {
                childScrollRef.current.classList.add('card-translation');
              } else {
                childScrollRef.current.classList.remove('card-translation');
              }
            }
          };

          handleScroll()
    
          window.addEventListener('scroll', handleScroll);
          
      }, []); 

  return (
    <div className="total-banner">
    <div className='join-banner' ref={scrollRef}>
        <div className="card" ref={childScrollRef}>
            <img src={image} alt="" />
        </div>
    </div>
    <div className="second-card">
        
    </div>
    </div>
  )
}

export default JoinBanner