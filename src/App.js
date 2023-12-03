import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstBanner from './components/FirstBanner';
import IndividualCoin from './components/IndividualCoin';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="hello">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<FirstBanner />} />
          <Route path="/coin/:id" element={<IndividualCoin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
