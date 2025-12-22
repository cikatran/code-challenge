import { useState } from 'react';
import type { ValidationErrors } from '../types';

export const useValidation = () => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateAmount = (amount: string): string | null => {
    if (!amount.trim()) {
      return 'Amount is required';
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      return 'Please enter a valid number';
    }

    if (amountNum <= 0) {
      return 'Amount must be greater than 0';
    }

    if (amountNum > 999999999) {
      return 'Amount is too large';
    }

    return null;
  };

  const clearError = (field: keyof ValidationErrors) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setError = (field: keyof ValidationErrors, message: string) => {
    setValidationErrors(prev => ({ ...prev, [field]: message }));
  };

  const hasErrors = () => {
    return Object.values(validationErrors).some(error => !!error);
  };

  const hasError = (field: keyof ValidationErrors) => {
    return !!validationErrors[field];
  };

  const getError = (field: keyof ValidationErrors) => {
    return validationErrors[field];
  };

  return {
    validationErrors,
    validateAmount,
    clearError,
    setError,
    hasErrors,
    hasError,
    getError
  };
};