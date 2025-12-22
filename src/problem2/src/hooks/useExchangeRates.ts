import { useState, useEffect } from 'react';
import type { ExchangeRates } from '../types';

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        console.log('Exchange rates loaded:', exchangeRates);
        setRates(exchangeRates);
        setError(null);
      } catch (err) {
        console.error('Error fetching rates:', err);
        setError('Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Get available currencies sorted by priority
  const getAvailableCurrencies = () => {
    return Object.keys(rates).sort((a, b) => {
      const priority = { 'ETH': 0, 'USD': 1, 'WBTC': 2 };
      return ((priority[a as keyof typeof priority] ?? 999) - (priority[b as keyof typeof priority] ?? 999)) || a.localeCompare(b);
    });
  };

  return {
    rates,
    loading,
    error,
    getAvailableCurrencies
  };
};