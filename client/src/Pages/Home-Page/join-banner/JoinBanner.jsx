import React, { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import image from "../../../Assets/cryptoVisa2.webp"
import image2 from "../../../Assets/new-pay-modified.png"
import image3 from "../../../Assets/usdc.png"
import "./join-banner.scss"

/**
 * @component JoinBanner
 * This Banner holds the hypothetical rewards for the crypto website. 
 */

function JoinBanner() {

  //ScrollRef and childScrollRef are used to translate the card image when the user scrolls down the page. Child ref
  //targets the card image while scrollRef targets the parent div.
  const scrollRef = useRef(null)
  const childScrollRef = useRef(null)
  //Checker is used to ensure that the counter only runs once, right when the user scrolls it into view. Without this
  //value, the counter would run on the first render and then again when the user scrolls it into view.
  const [checker, setChecker] = useState(0)
  //Val is used to display the amount of earnings. It counts up from 0 to 275 in a non linear fashion.
  const [val, setVal] = useState(0)

  /**
   * useEffect hook that handles the card animation and uses the boundingClientRect to determine what offset the card 
   * should reach before it animates. We could not use something like window.scrollY as that only determines the offset 
   * from top of the document, whereas getBoundingClientRect() determines the offset of the element relative to the viewport.
   */

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
    //Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  //All of the refs used to animate the text into view, where rootMargin is the offset from the bottom of the screen.

  const { ref: wholeText, inView: textView1 } = useInView({
    rootMargin: '-100px 0px'
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

  //Incrementally increase the earnings counter when the user scrolls it into view. Multiple setTimeouts are used to
  //create a non linear increase in the counter.

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
          }, 260)
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
      <header id="reward-intro" ref={rewards} >
        <p id="rewards"></p>
        <h1 className={textView4 ? 'text-trans1 rewards-h1' : "text-trans0 rewards-h1"}>
          Our Rewards Program
        </h1>
      </header>
      <section className='join-banner' ref={scrollRef}>
        <div className="card-container">
          <div className="card" ref={childScrollRef}>
            <img src={image} alt="Crypto Credit Card" loading='lazy' />
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
                <img src={image2} alt="PYUSD Logo" />
                <h3>PYUSD</h3>
                <h2>4%</h2>
                <p>p.a.</p>
              </div>
              <div>
                <img src={image3} alt="USDC Logo" />
                <h3>USDC</h3>
                <h2>5.5%</h2>
                <p>p.a.</p>
              </div>
            </div>
            <div id="earning-button">
              <Link to="/trending" aria-label='Visit trending coins'>Start Earning Today <ArrowForwardIcon id="arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )

}

export default JoinBanner
