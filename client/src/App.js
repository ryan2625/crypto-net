import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndividualCoin from './Pages/Coin-Data/IndividualCoin';
import Main from './Pages/Home-Page/MainPage';
import Login from './Pages/Login/Login';
import Portfolio from './Pages/Portfolio/Portfolio';
import Trending from './Pages/Trending/Trending';
import Footer from './Pages/components/footer/Footer'

/**
 * crypto-verse
 *
 An app that allows users to view and track the value of cryptocurrencies. This app implements coingecko's API to fetch the data for cryptocurrencies. Users can also signup/login to create an account and add different coins to their portfolio. This app contains 5 different pages, where the routes are defined below. This app makes requests to the coingecko API often, so to prevent throttling/redundant API calls, the data is saved in local storage often (even though this may make the data out of date).
 *
 * Author: Ryan Freas
 * Created: 12/01/23
 *
 */
function App() {

  // Use state to set the ID of the coin the user clicks on. Passes this data down as props to set the coin data of 
  // the dynamic individual coin page. 

  const [id, setId] = useState(null);

  return (
    <div className="hello">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main setId={setId} />} />
          <Route path="/coins/:id" element={<IndividualCoin id={id} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portfolio" element={<Portfolio setId={setId} />} />
          <Route path="/trending" element={<Trending setId={setId} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
