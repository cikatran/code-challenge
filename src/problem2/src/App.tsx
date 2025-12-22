import React from 'react';
import { SwapForm, LoadingState, ErrorState } from './components';
import { useExchangeRates } from './hooks/useExchangeRates';
import { useCurrencySwap } from './hooks/useCurrencySwap';
import './App.css';

function App() {
  const { rates, loading, error, getAvailableCurrencies } = useExchangeRates();
  const {
    formData,
    handleInputChange,
    handleCurrencyChange,
    swapCurrencies,
    getCurrentExchangeRate,
    validation,
    isFormValid
  } = useCurrencySwap();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Swap submitted:', formData);
  };

  const availableCurrencies = getAvailableCurrencies();
  const currentExchangeRate = getCurrentExchangeRate(rates);

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

            {loading && <LoadingState />}
            {error && <ErrorState message={error} />}

            {!loading && !error && (
              <SwapForm
                formData={formData}
                availableCurrencies={availableCurrencies}
                onAmountChange={(field, value) => handleInputChange(field, value, rates)}
                onCurrencyChange={(field, value) => handleCurrencyChange(field, value, rates)}
                onSwap={swapCurrencies}
                onSubmit={handleSubmit}
                currentExchangeRate={currentExchangeRate}
                isFormValid={isFormValid}
                loading={loading}
                validationErrors={validation.validationErrors}
              />
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
