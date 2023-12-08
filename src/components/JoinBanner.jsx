import React, { useRef, useState, useEffect } from 'react'
import image from "../assests/cryptoVisa2.webp"
import image2 from "../assests/new-pay-modified.png"
import image3 from "../assests/usdc.png"
import "../styles/join-banner.scss"
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function JoinBanner() {

  const scrollRef = useRef(null)
  const childScrollRef = useRef(null)

  const [checker, setChecker] = useState(0)
  const [val, setVal] = useState(0)

  useEffect(() => {

    const handleScroll = () => {
      if (scrollRef.current && childScrollRef.current) {
        const parentRect = scrollRef.current.getBoundingClientRect();
        const yOffset = parentRect.top;

        if (yOffset <= 500 && yOffset >= -1550) {
          childScrollRef.current.classList.add('card-translation');
        } else {
          childScrollRef.current.classList.remove('card-translation');
        }
      }
    };

    handleScroll()

    window.addEventListener('scroll', handleScroll);

  }, []);

  const { ref: wholeText, inView: textView1 } = useInView({
    rootMargin: '150px 0px'
  });

  const { ref: rewardText, inView: textView2 } = useInView({
    rootMargin: '-75px 0px'
  });

  const { ref: earnBanner, inView: textView3 } = useInView({
    rootMargin: '-200px 0px'
  });

  const { ref: rewards, inView: textView4 } = useInView({
    rootMargin: '-100px 0px'
  })

  const { ref: counter, inView: countView } = useInView({
    rootMargin: '-350px 0px',
    onChange: (inView, entry) => {
      var ensure = 0
      const handleIncrease = () => {
        if (ensure < 260) {
          setTimeout(() => {
            setVal((prev) => prev + 9)
            ensure += 9
            handleIncrease()
          }, 27)
        }
        if (ensure < 271 && ensure >= 261) {
          setTimeout(() => {
            setVal((prev) => prev + 1)
            ensure += 1
            handleIncrease()
          }, 70)
        }
        if (ensure < 275 && ensure > 270) {
          setTimeout(() => {
            setVal((prev) => prev + 1)
            ensure += 1
            handleIncrease()
          }, 230)
        }
      }
      setChecker(checker + 1)
      if (checker === 1) {
        handleIncrease()
      }
    }
  });


  return (
    <>
      <div id="reward-intro" ref={rewards} >
        <p id="rewards"></p>
        <h1 className={textView4 ? 'text-trans1 rewards-h1' : "text-trans0 rewards-h1"}>
          Our Rewards Program
        </h1>
      </div>

      <div className='join-banner' ref={scrollRef}>
        <div className="card-container">
        <div className="card" ref={childScrollRef}>
          <img src={image} alt="" />
        </div>
        </div>
        <div className="first-text" ref={wholeText}>
          <div className="main-text">
            <h2 className={textView1 ? "text-trans1" : "text-trans0"}>Earn up to</h2>
            <h1 ref={counter}>${val} <span>USD</span></h1>
          </div>
          <div className={textView2 ? "secondary-text  translated" : "secondary-text"} ref={rewardText}>
            <div className="left">
              <h3>UP TO <span>5.25%</span></h3>
              <h4>Optimised rewards</h4>
            </div>
            <div className="right">
              <h3>UP TO <span>$5.05</span></h3>
              <h4>Rewards paid weekly</h4>
            </div>
          </div>
        </div>
        <div ref={earnBanner}>
          <div className={textView3 ? "translated second-card" : "second-card"}>
            <div className="earn">
              <h1>Earn Plus</h1>
              <h4>Enjoy a simpler reward structure, higher allocation limit, and greater perks
              </h4>
            </div>
            <div className="icons">
              <div>
                <img src={image2} alt="" />
                <h3>PYUSD</h3>
                <h2>4%</h2>
                <p>p.a.</p>
              </div>
              <div>
                <img src={image3} alt="" />
                <h3>USDC</h3>
                <h2>5.5%</h2>
                <p>p.a.</p>
              </div>
            </div>
            <div id="earning-button">
              <button>Start Earning Today           <ArrowForwardIcon id="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default JoinBanner