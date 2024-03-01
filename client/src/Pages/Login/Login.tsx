import React, { useState, useEffect, useRef, FormEvent} from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../Hooks/useSignup'
import { useLogin } from '../../Hooks/useLogin'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useScroll } from '../../Hooks/useScroll'
import CheckIcon from '@mui/icons-material/Check';
import HouseIcon from '@mui/icons-material/House';
import WestIcon from '@mui/icons-material/West';
import Navbar from '../Nav-Footer/navbar/Navbar'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./login.scss"


/**
 * @component Login
 * Here the user can signup/login using an email and a password. We have the custom hooks useSignup and useLogin which 
 * handle the logic for the signup and login process. We also grab the user from the auth context to display the 
 * confirmation method when logged in.
 */


const Login: React.FC = () => {

  //value/setValue is used to determine which tab is open and handles resetting the error message when the tabs are 
  //switched.
  const [value, setValue] = useState<string>('one');
  //tabOpen handles the state of which tab is being displayed to the user.
  const [tabOpen, setTabOpen] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('test@test.com')
  const [password, setPassword] = useState<string>('Test1234@')
  /**
   *  pageOpen ensures that the confirmation message will not run on the first render, as we run the code for the 
   * confirmation to display in the useEffect hook. This will run when the user sucessfully logs in and on the 
   * first page render (see dependency array).
   */
  const [pageOpen, setPageOpen] = useState<boolean>(false)
  const { token } = useAuthContext()
  const { signUp, error, setError, loading } = useSignup()
  const { login, error2, setError2, loading2 } = useLogin()
  const { scroller } = useScroll()
  //Ref for the confirmation that appears when a user logs in 
  const confirmation2 = useRef<HTMLDivElement>(null)

  /**
   * Handle the change event of the Tabs component. Resets error message on change
   *
   * @param {object} event - The event object of switching tabs.
   * @param {string} newValue - The new value of the selected tab.
   */

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>, newValue: string) => {
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
    if (token && pageOpen) {
      confirmation2.current!.className = "confirmation";
      setTimeout(() => {
        confirmation2.current!.className = "confirmation confirmation-show";
      }, 50);
    }
    setTimeout(() => {
      setPageOpen(true)
    }, 750)
  }, [token])

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(email, password)
  }

  const handleSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(email, password)
  };


  useEffect(() => {
    scroller()
  }, [])


  return (
    <>
      <Navbar sourced={false} />
      <section className='login'>
        <div className="login-container">
          <nav>
            <Tabs
              value={value}
              onChange={(e) => handleChange}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#4194ec"
                }
              }}
              aria-label="Login and Signup tabs"
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
                <label htmlFor="Login-Email">Demo Email: test@test.com</label>
                <input type="text"
                  id="Login-Email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email} />
                <label htmlFor="Login-Password">Demo Password: Test1234@</label>
                <input
                  type="password"
                  id="Login-Password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </form>
              <div className="buttons-login">
                <button className="returner">
                  <Link to="/" aria-label="Return to the home page"> &nbsp;
                    <HouseIcon className='house' aria-hidden="true" />
                    <WestIcon className='west' aria-hidden="true" />
                  </Link>
                </button>
                <button className={loading2 ? 'loading-phase auth-buttons' : "auth-buttons"}
                  onClick={(e) => handleSubmitLogin}
                  disabled={loading2}
                  aria-label="Login Button">
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
                  <Link to="/" aria-label='Return to home page'> &nbsp;
                    <HouseIcon className='house' aria-hidden="true" />
                    <WestIcon className='west' aria-hidden="true" />
                  </Link>
                </button>
                <button className={loading ? 'loading-phase auth-buttons' : "auth-buttons"}
                  onClick={(e) => handleSubmitSignup}
                  disabled={loading}
                  aria-label="Signup Button">
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