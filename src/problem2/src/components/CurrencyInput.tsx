import React from 'react';
import { TokenIcon } from './TokenIcon';

interface CurrencyInputProps {
  label: string;
  value: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (currency: string) => void;
  selectedCurrency: string;
  availableCurrencies: string[];
  readOnly?: boolean;
  error?: string;
  placeholder?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onAmountChange,
  onCurrencyChange,
  selectedCurrency,
  availableCurrencies,
  readOnly = false,
  error,
  placeholder = '0.00'
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="currency-input-group">
        <div className="custom-select-wrapper">
          <div className="selected-currency">
            <TokenIcon currency={selectedCurrency} size={20} />
            <span>{selectedCurrency}</span>
          </div>
          <select
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="currency-select-with-icon"
            disabled={readOnly}
          >
            {availableCurrencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            value={value}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder={placeholder}
            className={`amount-input ${error ? 'error' : ''}`}
            readOnly={readOnly}
            aria-label={`${label.toLowerCase()} amount`}
            aria-invalid={!!error}
            aria-describedby={error ? `${label.toLowerCase()}-amount-error` : undefined}
          />
          {error && (
            <span id={`${label.toLowerCase()}-amount-error`} className="error-message">
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};