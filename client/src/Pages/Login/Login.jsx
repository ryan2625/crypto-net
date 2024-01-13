import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../hooks/useAuthContext'
import CheckIcon from '@mui/icons-material/Check';
import HouseIcon from '@mui/icons-material/House';
import WestIcon from '@mui/icons-material/West';
import Navbar from '../../components/navbar/Navbar';
import "./login.scss"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function Login() {
  const [value, setValue] = useState('one');
  const [tabOpen, setTabOpen] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pageOpen, setPageOpen] = useState(false)
  const { user } = useAuthContext()
  const { signUp, error, setError } = useSignup()
  const { login, error2, setError2 } = useLogin()
  const confirmation2 = useRef(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabOpen(!tabOpen)
    if (newValue === "one") {
      setError2("")
    } else {
      setError("")
    }
    setEmail("")
    setPassword("")
  };

  useEffect(() => {
    if (user && pageOpen) {
      confirmation2.current.className = "confirmation";
      setTimeout(() => {
        confirmation2.current.className = "confirmation confirmation-show";
      }, 50);
    }
    setTimeout(() => {
      setPageOpen(true)
    }, 750)
  }, [user])

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    await signUp(email, password)
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
      <Navbar sourced={false} />
      <section className='login'>
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
                Login to track your favorite coins and view the latest trends on crypto-verse.
              </h2>
              <p>
                By continuing, you agree to the crypto-verse User Agreement and Privacy Policy. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose.
              </p>
              <form onSubmit={handleSubmitLogin}>
                <label htmlFor="Login-Email">Email</label>
                <input type="text"
                  id="Login-Email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email} />
                <label htmlFor="Login-Password">Password</label>
                <input
                  type="password"
                  id="Login-Password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </form>
              <div className="buttons-login">
              <button className="returner">
                  <Link to="/"> &nbsp;
                    <HouseIcon className='house' />
                    <WestIcon className='west' />
                  </Link>
                </button>
                <button className='auth-buttons'
                onClick={handleSubmitLogin}>
                  Login
                </button>
              </div>
              {error2 &&
                <div className="error-logging">
                  {error2}
                </div>}
            </div>
            :
            <div className="auth signup-body">
              <h2>
                It's free! Track your favorite coins and stay up to date with the latest trends.
              </h2>
              <p>
                By continuing, you agree to the crypto-verse User Agreement and Privacy Policy. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose.
              </p>
              <form onSubmit={handleSubmitSignup}>
                <label htmlFor='Signup-Email'>Email</label>
                <input type="text"
                  placeholder="Email"
                  id="Signup-Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email} />
                <label htmlFor="Signup-Password">Password</label>
                <input type="password"
                  id="Signup-Password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </form>
              <div className="buttons-login">
              <button className="returner">
                  <Link to="/"> &nbsp;
                    <HouseIcon className='house' />
                    <WestIcon className='west' />
                  </Link>
                </button>
                <button className='auth-buttons'
                onClick={handleSubmitSignup}>
                  Signup
                </button>
              </div>
              {error &&
                <div className="error-logging">
                  {error}
                </div>}
            </div>
          }
          <div className="confirmation" ref={confirmation2}>
            <h4>Login Success!</h4><span><CheckIcon /></span>
          </div>
        </div>
      </section >
    </>
  )
}

export default Login