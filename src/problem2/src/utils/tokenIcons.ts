// Token icon mapping for supported currencies
// Based on Switcheo token-icons repository: https://github.com/Switcheo/token-icons/tree/main/tokens

const BASE_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/';

// List of supported token symbols (token names in the repository)
const SUPPORTED_TOKENS = [
  // Popular cryptocurrencies
  'BTC', 'ETH', 'USDC', 'USDT', 'WBTC', 'WETH',

  // Stablecoins
  'BUSD', 'USC', 'YIELDUSD',

  // DeFi tokens
  'ATOM', 'OSMO', 'LUNA', 'STOSMO', 'STLUNA', 'RATOM', 'STATOM', 'STEVMOS',
  'EVMOS', 'IRIS', 'KUJI', 'STRD',

  // Other tokens
  'BLUR', 'GMX', 'OKB', 'OKT', 'SWTH', 'ZIL', 'AXLUSDC', 'WSTETH',

  // Special tokens
  'bNEO', 'LSI', 'IBCX', 'ampLUNA',
] as const;

// Token aliases (for case variations or alternative names)
const TOKEN_ALIASES: Record<string, string> = {
  'BNEO': 'bNEO',
  'AMPLUNA': 'ampLUNA',
};

/**
 * Get the token icon URL for a given currency
 * @param currency The currency symbol (e.g., 'ETH', 'BTC')
 * @returns The URL to the token icon SVG
 */
export const getTokenIcon = (currency: string): string => {
  const upperCurrency = currency.toUpperCase();

  // Check if there's an alias for this currency
  const tokenName = TOKEN_ALIASES[upperCurrency] || upperCurrency;

  // Check if the token is supported
  if (SUPPORTED_TOKENS.includes(tokenName as typeof SUPPORTED_TOKENS[number])) {
    return `${BASE_URL}${tokenName}.svg`;
  }

  // Return default icon for unsupported currencies
  return `${BASE_URL}generic.svg`;
};