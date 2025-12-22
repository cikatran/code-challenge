import { useState, useCallback } from 'react';
import type { SwapFormData, ExchangeRates } from '../types';
import { useValidation } from './useValidation';

export const useCurrencySwap = () => {
  const [formData, setFormData] = useState<SwapFormData>({
    fromAmount: '',
    toAmount: '',
    fromCurrency: 'ETH',
    toCurrency: 'USD'
  });

  const validation = useValidation();

  // Calculate exchange amount
  const calculateExchange = useCallback((amount: string, fromCurrency: string, toCurrency: string, rates: ExchangeRates) => {
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
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((field: keyof SwapFormData, value: string, rates: ExchangeRates) => {
    if (field === 'fromAmount') {
      validation.clearError('fromAmount');
    }

    if (field === 'fromAmount') {
      const validationError = validation.validateAmount(value);
      if (validationError) {
        validation.setError('fromAmount', validationError);
        setFormData(prev => ({ ...prev, fromAmount: value, toAmount: '' }));
        return;
      }

      const calculated = calculateExchange(value, formData.fromCurrency, formData.toCurrency, rates);
      setFormData(prev => ({ ...prev, fromAmount: value, toAmount: calculated }));
    } else if (field === 'toAmount') {
      const calculated = calculateExchange(value, formData.toCurrency, formData.fromCurrency, rates);
      setFormData(prev => ({ ...prev, toAmount: value, fromAmount: calculated }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  }, [formData.fromCurrency, formData.toCurrency, calculateExchange, validation]);

  // Handle currency change
  const handleCurrencyChange = useCallback((field: 'fromCurrency' | 'toCurrency', value: string, rates: ExchangeRates) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Recalculate if there's an amount
    if (formData.fromAmount) {
      const calculated = calculateExchange(formData.fromAmount, newFormData.fromCurrency, newFormData.toCurrency, rates);
      setFormData(prev => ({ ...prev, toAmount: calculated }));
    }
  }, [formData, calculateExchange]);

  // Swap currencies
  const swapCurrencies = useCallback(() => {
    setFormData(prev => ({
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount
    }));
  }, []);

  // Calculate current exchange rate
  const getCurrentExchangeRate = useCallback((rates: ExchangeRates) => {
    return rates[formData.fromCurrency] && rates[formData.toCurrency]
      ? (rates[formData.toCurrency] / rates[formData.fromCurrency]).toFixed(6)
      : null;
  }, [formData.fromCurrency, formData.toCurrency]);

  return {
    formData,
    setFormData,
    handleInputChange,
    handleCurrencyChange,
    swapCurrencies,
    getCurrentExchangeRate,
    validation,
    isFormValid: !validation.hasErrors() && !!formData.fromAmount && !!formData.toAmount
  };
};