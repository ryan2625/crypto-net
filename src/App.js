import './App.scss';
import FirstBanner from './components/FirstBanner';
import MarketBanner from './components/MarketBanner';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="hello">
      <Navbar />
      <FirstBanner />
      <MarketBanner />
    </div>
  );
}

export default App;
