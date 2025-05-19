import { useState } from 'react'
import './App.css'

function calculateCharges(price, shares, brokeragePercent) {
  shares = shares * 100;
  const brokerageRate = brokeragePercent / 100;
  const clearingFeeRate = 0.03 / 100;
  const stampDutyPer1000 = 1;

  const value = price * shares;
  const brokerage = value * brokerageRate;
  const clearing = Math.min(Math.ceil(value * clearingFeeRate * 100) / 100, 1000);
  const stampDuty = value > 0 ? Math.min(Math.floor(value / 1000) * stampDutyPer1000, 1000) + 1 : 0;
  const totalCharges = brokerage + clearing + stampDuty;
  const total = value + totalCharges;

  return {
    Total: total,
    'Share value': value,
    Charges: totalCharges,
    Brokerage: brokerage,
    Clearing: clearing,
    'Stamp Duty': stampDuty,
  };
}

function App() {
  const [buyPrice, setBuyPrice] = useState('0.2');
  const [sellPrice, setSellPrice] = useState('0.21');
  const [shares, setShares] = useState('1');
  const [brokerage, setBrokerage] = useState('0.42');
  const [buyResult, setBuyResult] = useState(null);
  const [sellResult, setSellResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const buy = calculateCharges(parseFloat(buyPrice), parseInt(shares), parseFloat(brokerage));
    const sell = calculateCharges(parseFloat(sellPrice), parseInt(shares), parseFloat(brokerage));
    setBuyResult(buy);
    setSellResult(sell);
  };

  return (
    <div className="container">
      <h1>Brokerage Calculator</h1>
      <form onSubmit={handleCalculate} className="calc-form">
        <div>
          <label>Buy Price: <input type="number" step="any" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} required /></label>
        </div>
        <div>
          <label>Sell Price: <input type="number" step="any" value={sellPrice} onChange={e => setSellPrice(e.target.value)} required /></label>
        </div>
        <div>
          <label>Shares (lots): <input type="number" value={shares} onChange={e => setShares(e.target.value)} required /></label>
        </div>
        <div>
          <label>Brokerage (%): <input type="number" step="any" value={brokerage} onChange={e => setBrokerage(e.target.value)} required /></label>
        </div>
        <button type="submit">Calculate</button>
      </form>
      <div className="results">
        {buyResult && (
          <div>
            <h2>Buy</h2>
            <ul>
              {Object.entries(buyResult).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> RM {value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>
              ))}
            </ul>
          </div>
        )}
        {sellResult && (
          <div>
            <h2>Sell</h2>
            <ul>
              {Object.entries(sellResult).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> RM {value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
