// Token icon mapping for supported currencies
// Based on Switcheo token-icons repository: https://github.com/Switcheo/token-icons/tree/main/tokens

export const TOKEN_ICONS: Record<string, string> = {
  // Popular cryptocurrencies
  'BTC': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BTC.svg',
  'ETH': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg',
  'USDC': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDC.svg',
  'USDT': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDT.svg',
  'WBTC': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WBTC.svg',
  'WETH': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WETH.svg',

  // Stablecoins
  'BUSD': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BUSD.svg',
  'USC': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USC.svg',
  'YIELDUSD': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/YIELDUSD.svg',

  // DeFi tokens
  'ATOM': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ATOM.svg',
  'OSMO': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OSMO.svg',
  'LUNA': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LUNA.svg',
  'STOSMO': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STOSMO.svg',
  'STLUNA': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STLUNA.svg',
  'RATOM': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/RATOM.svg',
  'STATOM': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STATOM.svg',
  'STEVMOS': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STEVMOS.svg',
  'EVMOS': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/EVMOS.svg',
  'IRIS': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IRIS.svg',
  'KUJI': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KUJI.svg',
  'STRD': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STRD.svg',

  // Other tokens
  'BLUR': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BLUR.svg',
  'GMX': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/GMX.svg',
  'OKB': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OKB.svg',
  'OKT': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OKT.svg',
  'SWTH': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg',
  'ZIL': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ZIL.svg',
  'AXLUSDC': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/AXLUSDC.svg',
  'WSTETH': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WSTETH.svg',

  // Special tokens
  'bNEO': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/bNEO.svg',
  'BNEO': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/bNEO.svg',
  'LSI': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LSI.svg',
  'IBCX': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IBCX.svg',
  'ampLUNA': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ampLUNA.svg',
  'AMPLUNA': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ampLUNA.svg',

  // Default icon for unsupported currencies
  'DEFAULT': 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/generic.svg'
};

/**
 * Get the token icon URL for a given currency
 * @param currency The currency symbol (e.g., 'ETH', 'BTC')
 * @returns The URL to the token icon SVG
 */
export const getTokenIcon = (currency: string): string => {
  const upperCurrency = currency.toUpperCase();
  return TOKEN_ICONS[upperCurrency] || TOKEN_ICONS.DEFAULT;
};