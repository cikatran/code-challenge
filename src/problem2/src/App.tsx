import { useState, useEffect } from 'react';
import './App.css';

interface ExchangeRates {
  [currency: string]: number;
}

interface SwapFormData {
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
}


function App() {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SwapFormData>({
    fromAmount: '',
    toAmount: '',
    fromCurrency: 'ETH', // Use ETH as default send currency
    toCurrency: 'USD'
  });

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const priceData = await response.json();

        const exchangeRates: ExchangeRates = {
          USD: 1
        };

        // The API returns an array of objects with currency, date, and price
        priceData.forEach((item: any) => {
          if (item && item.currency && item.price) {
            exchangeRates[item.currency.toUpperCase()] = item.price;
          }
        });

        console.log('Exchange rates loaded:', exchangeRates); // Debug log
        setRates(exchangeRates);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching rates:', err);
        setError('Failed to fetch exchange rates');
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Calculate exchange amount
  const calculateExchange = (amount: string, fromCurrency: string, toCurrency: string) => {
    console.log('calculateExchange called:', { amount, fromCurrency, toCurrency, rates: Object.keys(rates) });

    if (!amount || !rates[fromCurrency] || !rates[toCurrency]) {
      console.log('calculateExchange failed validation:', {
        hasAmount: !!amount,
        hasFromRate: !!rates[fromCurrency],
        hasToRate: !!rates[toCurrency]
      });
      return '';
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return '';

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    const exchangedAmount = (amountNum * fromRate) / toRate;
    console.log('calculateExchange result:', { fromRate, toRate, exchangedAmount });
    return exchangedAmount.toFixed(6);
  };

  // Handle input changes
  const handleInputChange = (field: keyof SwapFormData, value: string) => {
    if (field === 'fromAmount') {
      const calculated = calculateExchange(value, formData.fromCurrency, formData.toCurrency);
      setFormData(prev => ({ ...prev, fromAmount: value, toAmount: calculated }));
    } else if (field === 'toAmount') {
      const calculated = calculateExchange(value, formData.toCurrency, formData.fromCurrency);
      setFormData(prev => ({ ...prev, toAmount: value, fromAmount: calculated }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Handle currency change
  const handleCurrencyChange = (field: 'fromCurrency' | 'toCurrency', value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Recalculate if there's an amount
    if (formData.fromAmount) {
      const calculated = calculateExchange(formData.fromAmount, newFormData.fromCurrency, newFormData.toCurrency);
      setFormData(prev => ({ ...prev, toAmount: calculated }));
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFormData(prev => ({
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount
    }));
  };

  
  // Get available currencies
  const availableCurrencies = Object.keys(rates).sort((a, b) => {
    const priority = { 'ETH': 0, 'USD': 1, 'WBTC': 2 };
    return ((priority[a as keyof typeof priority] ?? 999) - (priority[b as keyof typeof priority] ?? 999)) || a.localeCompare(b);
  });

  // Calculate current exchange rate
  const currentExchangeRate = rates[formData.fromCurrency] && rates[formData.toCurrency]
    ? (rates[formData.toCurrency] / rates[formData.fromCurrency]).toFixed(6)
    : null;

  // Debug logs
  console.log('Available currencies:', availableCurrencies);
  console.log('Form data:', formData);
  console.log('Current exchange rate:', currentExchangeRate);

  
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Fancy Currency Swap</h1>
          <p>
            A modern, intuitive currency exchange interface built with React and TypeScript.
            Experience real-time exchange rates, beautiful token icons, and seamless interactions.
          </p>
        </header>

        <main className="main-content">
          <div className="swap-form">
            <h2>Swap</h2>
            <p className="subtitle">Exchange one currency for another at real-time rates</p>

            {loading && (
              <div className="loading">
                <span>Loading exchange rates...</span>
              </div>
            )}

            {error && (
              <div className="error">
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && (
              <form onSubmit={(e) => { e.preventDefault(); console.log('Swap submitted:', formData); }}>
                {/* From Currency */}
                <div className="form-group">
                  <label>You send</label>
                  <div className="currency-input-group">
                    <select
                      value={formData.fromCurrency}
                      onChange={(e) => handleCurrencyChange('fromCurrency', e.target.value)}
                      className="currency-select"
                    >
                      {availableCurrencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.fromAmount}
                      onChange={(e) => handleInputChange('fromAmount', e.target.value)}
                      placeholder="0.00"
                      className="amount-input"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="swap-separator">
                  <button
                    type="button"
                    onClick={swapCurrencies}
                    className="swap-button"
                    disabled={loading}
                  >
                    ⇅
                  </button>
                </div>

                {/* To Currency */}
                <div className="form-group">
                  <label>You receive</label>
                  <div className="currency-input-group">
                    <select
                      value={formData.toCurrency}
                      onChange={(e) => handleCurrencyChange('toCurrency', e.target.value)}
                      className="currency-select"
                    >
                      {availableCurrencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.toAmount}
                      onChange={(e) => handleInputChange('toAmount', e.target.value)}
                      placeholder="0.00"
                      className="amount-input"
                      readOnly
                    />
                  </div>
                </div>

                {/* Exchange Rate Info */}
                {currentExchangeRate && (
                  <div className="exchange-rate-info">
                    <span>1 {formData.fromCurrency} = {currentExchangeRate} {formData.toCurrency}</span>
                    <span>1 {formData.toCurrency} = {(1 / parseFloat(currentExchangeRate)).toFixed(6)} {formData.fromCurrency}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="confirm-button"
                  disabled={loading || !formData.fromAmount || !formData.toAmount}
                >
                  CONFIRM SWAP
                </button>
              </form>
            )}
          </div>
        </main>

        <footer className="footer">
          <div className="footer-links">
            <p>
              Powered by{' '}
              <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">Vite</a>
              ,{' '}
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
              , and{' '}
              <a href="https://chakra-ui.com" target="_blank" rel="noopener noreferrer">Chakra UI</a>
            </p>
            <p>
              Exchange rates provided by{' '}
              <a href="https://interview.switcheo.com" target="_blank" rel="noopener noreferrer">Switcheo API</a>
              {' '}• Token icons from{' '}
              <a href="https://github.com/Switcheo/token-icons" target="_blank" rel="noopener noreferrer">Switcheo Token Icons</a>
            </p>
            <p className="copyright">© 2024 Code Challenge. This is a demo application for testing purposes.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
