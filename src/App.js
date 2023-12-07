import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndividualCoin from './Pages/IndividualCoin';
import Main from './Pages/MainPage';
import Footer from './components/Footer';

function App() {

  const [id, setId] = useState(null);

  return (
    <div className="hello">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main setId={setId} />} />
          <Route path="/coins/:id" element={<IndividualCoin id={id}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
