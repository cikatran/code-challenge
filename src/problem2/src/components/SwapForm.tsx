import React from 'react';
import { TokenIcon } from './TokenIcon';
import { CurrencyInput } from './CurrencyInput';

interface SwapFormProps {
  formData: {
    fromAmount: string;
    toAmount: string;
    fromCurrency: string;
    toCurrency: string;
  };
  availableCurrencies: string[];
  onAmountChange: (field: 'fromAmount' | 'toAmount', value: string) => void;
  onCurrencyChange: (field: 'fromCurrency' | 'toCurrency', value: string) => void;
  onSwap: () => void;
  onSubmit: (e: React.FormEvent) => void;
  currentExchangeRate: string | null;
  isFormValid: boolean;
  loading?: boolean;
  validationErrors: {
    fromAmount?: string;
    toAmount?: string;
  };
}

export const SwapForm: React.FC<SwapFormProps> = ({
  formData,
  availableCurrencies,
  onAmountChange,
  onCurrencyChange,
  onSwap,
  onSubmit,
  currentExchangeRate,
  isFormValid,
  loading = false,
  validationErrors
}) => {
  return (
    <form onSubmit={onSubmit}>
      {/* From Currency */}
      <CurrencyInput
        label="From"
        value={formData.fromAmount}
        onAmountChange={(value) => onAmountChange('fromAmount', value)}
        onCurrencyChange={(currency) => onCurrencyChange('fromCurrency', currency)}
        selectedCurrency={formData.fromCurrency}
        availableCurrencies={availableCurrencies}
        error={validationErrors.fromAmount}
      />

      {/* Swap Button */}
      <div className="swap-separator">
        <button
          type="button"
          onClick={onSwap}
          className="swap-button"
          disabled={loading}
        >
          ⇅
        </button>
      </div>

      {/* To Currency */}
      <CurrencyInput
        label="To"
        value={formData.toAmount}
        onAmountChange={(value) => onAmountChange('toAmount', value)}
        onCurrencyChange={(currency) => onCurrencyChange('toCurrency', currency)}
        selectedCurrency={formData.toCurrency}
        availableCurrencies={availableCurrencies}
        readOnly={true}
        placeholder="0.00"
      />

      {/* Exchange Rate Info */}
      {currentExchangeRate && (
        <div className="exchange-rate-info">
          <span>
            <TokenIcon currency={formData.fromCurrency} size={16} />
            <span>1 {formData.fromCurrency} = {currentExchangeRate} {formData.toCurrency}</span>
          </span>
          <span>
            <TokenIcon currency={formData.toCurrency} size={16} />
            <span>1 {formData.toCurrency} = {(1 / parseFloat(currentExchangeRate)).toFixed(6)} {formData.fromCurrency}</span>
          </span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="confirm-button"
        disabled={loading || !isFormValid}
      >
        CONFIRM SWAP
      </button>
    </form>
  );
};