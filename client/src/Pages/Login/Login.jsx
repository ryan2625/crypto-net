import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./login.scss"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function Login() {
  const [value, setValue] = useState('one');
  const [tabOpen, setTabOpen] = useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabOpen(!tabOpen)
  };

  useEffect(() => {
    const html = document.querySelector('html')
    html.style.scrollBehavior = "auto"
    window.scrollTo({
      top: 0,
      behavior: "auto"
    })
    html.style.scrollBehavior = ''
  }, [])
  

  return (
    <>
      <section className='login'>
      <Link to="/">Return to home</Link>
        <div className="login-container">
          <nav>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="invalid"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#4194ec"
                }
              }}
              aria-label="secondary tabs example"
              centered
              variant='fullWidth'
            >
              <Tab value="one" label="Login" />
              <Tab value="two" label="Signup" />
            </Tabs>
          </nav>
          {tabOpen ? 
          <div className="auth login-body">

          <h2>
            Login to track your favorite coins easily.
          </h2>
          <p>
            By continuing, you agree to the crypto-verse User Agreement and Privacy Policy. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose.
          </p>
          <form action="">
            <label htmlFor="Login-Email">Email</label>
            <input type="text" id="Login-Email" placeholder="Email" />
            <label htmlFor="Login-Password">Password</label>
            <input type="password" id="Login-Password" placeholder="Password" />
            <button>Login</button>
          </form>
          </div>
          : 
          <div className="auth signup-body">
          <h2>
            It's free! Track your favorite coins and stay up to date with the latest trends.
          </h2>
          <p>
            By continuing, you agree to the crypto-verse User Agreement and Privacy Policy. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose.
          </p>
          <form action="">
            <label htmlFor='Signup-Email'>Email</label>
            <input type="text" placeholder="Email" id="Signup-Email" />
            <label htmlFor="Signup-Password">Password</label>
            <input type="password" id="Signup-Password" placeholder="Password" />
            <button>Signup</button>
          </form>
          </div>
          }
        </div>
      </section>
    </>
  )
}

export default Login