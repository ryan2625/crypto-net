import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstBanner from './components/FirstBanner';
import IndividualCoin from './components/IndividualCoin';
import Navbar from './components/Navbar';

function App() {

  const [id, setId] = useState(null);

  return (
    <div className="hello">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<FirstBanner setId={setId} />} />
          <Route path="/coin/:id" element={<IndividualCoin id={id}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
