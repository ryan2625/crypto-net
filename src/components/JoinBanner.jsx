import React, { useRef, useState, useEffect } from 'react'
import image from "../assests/cryptoVisa2.png"
import "../styles/join-banner.scss"
import { useInView } from 'react-intersection-observer';

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

        if (yOffset <= 500 && yOffset >= -550) {
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
    rootMargin: '-200px 0px'
  });

  const { ref: rewardText, inView: textView2 } = useInView({
    rootMargin: '-100px 0px'
  });

  const { ref: counter, inView: countView } = useInView({
    rootMargin: '-350px 0px',
    onChange: (inView, entry) => {
      var ensure = 0
      const handleIncrease = () => {
        if (ensure < 260) {
          setTimeout(() => {
            setVal((prev) => prev + 12)
            ensure += 12
            handleIncrease()
          }, 30)
        }
        if (ensure < 270 && ensure > 263) {
          setTimeout(() => {
            setVal((prev) => prev + 1)
            ensure += 1
            handleIncrease()
          }, 100)
        }
        if (ensure < 272 && ensure > 269) {
          setTimeout(() => {
            setVal((prev) => prev + 1)
            ensure += 1
            handleIncrease()
          }, 300)
        }
      }
      setChecker(checker + 1)
      if (checker === 1) {
        handleIncrease()
      }
    }
  });


  return (
    <div className="total-banner">
      <div className='join-banner' ref={scrollRef}>
        <div className="card" ref={childScrollRef}>
          <img src={image} alt="" />
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
      </div>
      <div className="second-card">

      </div>
    </div>
  )
}

export default JoinBanner