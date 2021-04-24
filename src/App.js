import ConverterInput from "./components/ConverterInput";
import { useEffect, useState } from "react";
import currencies from "./data/currency";
import "./App.css";
function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [fromActive, setFromActive] = useState(true);
  const [error, setError] = useState(false);
  const API_KEY = "4cb33e18f7113f9ce12344ab";
  const BASE_URL = "https://v6.exchangerate-api.com/v6";
  let REQ_URL;
  if (fromActive) {
    REQ_URL = `${BASE_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${fromAmount}`;
  } else {
    REQ_URL = `${BASE_URL}/${API_KEY}/pair/${toCurrency}/${fromCurrency}/${toAmount}`;
  }

  useEffect(() => {
    fetch(REQ_URL)
      .then((res) => res.json())
      .then((data) => {
        setToAmount(data.conversion_result);
        if (data.result === "error") {
          setError(true);
        } else {
          setError(false);
        }
      });
  }, []);

  useEffect(() => {
    fetch(REQ_URL)
      .then((res) => res.json())
      .then((data) => {
        setAmount(data.conversion_result);
        if (data.result === "error") {
          setError(true);
        } else {
          setError(false);
        }
      });
  }, [fromCurrency, toCurrency,REQ_URL, fromAmount, toAmount, amount]);

  const handleFromChange = (e) => {
    setFromAmount(e.target.value);
    //setToAmount(amount);
    setFromActive(true);
  };

  const handleToChange = (e) => {
    setToAmount(e.target.value);
    //setFromAmount(amount);
    setFromActive(false);
  };

  return (
    <div className="app">
      {error ? (
        <h2>Something went wrong !</h2>
      ) : fromActive ? (
        <h3>{`${fromCurrency}-${fromAmount} equals ${toCurrency}-${toAmount}`}</h3>
      ) : (
        <h3>{`${toCurrency}-${toAmount} equals ${fromCurrency}-${amount}`}</h3>
      )}
      <ConverterInput
        name="fromCurrency"
        curreniesOptions={currencies}
        currencyChange={(e) => setFromCurrency(e.target.value)}
        selectedCurrency={fromCurrency}
        amount={fromActive ? fromAmount : amount}
        amountChange={handleFromChange}
      />
      <div className="equals">=</div>
      <ConverterInput
        name="toCurrency"
        curreniesOptions={currencies}
        currencyChange={(e) => setToCurrency(e.target.value)}
        selectedCurrency={toCurrency}
        amount={fromActive ? amount : toAmount}
        amountChange={handleToChange}
      />
    </div>
  );
}

export default App;
