export interface ExchangeRates {
  [currency: string]: number;
}

export interface SwapFormData {
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
}

export interface ValidationErrors {
  fromAmount?: string;
  toAmount?: string;
}

export interface TokenIconProps {
  currency: string;
  size?: number;
  className?: string;
  fallback?: string;
}