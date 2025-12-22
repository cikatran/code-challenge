import React from 'react';
import { getTokenIcon } from '../utils/tokenIcons';

interface TokenIconProps {
  currency: string;
  size?: number;
  className?: string;
  fallback?: string;
}

export const TokenIcon: React.FC<TokenIconProps> = ({
  currency,
  size = 24,
  className = '',
  fallback = '?'
}) => {
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const iconUrl = getTokenIcon(currency);

  const handleImageError = () => {
    console.log(`Failed to load icon for ${currency} from ${iconUrl}`);
    setError(true);
  };

  const handleImageLoad = () => {
    console.log(`Successfully loaded icon for ${currency}`);
    setLoaded(true);
  };

  React.useEffect(() => {
    // Reset states when currency changes
    setError(false);
    setLoaded(false);
  }, [currency]);

  // Get fallback symbol - special case for USD
  const getFallbackSymbol = (currency: string) => {
    if (currency.toUpperCase() === 'USD') return '$';
    return fallback || currency.slice(0, 2).toUpperCase();
  };

  // Show fallback text if image fails to load
  if (error) {
    return (
      <div
        className={`token-icon-fallback ${className}`}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e2e8f0',
          borderRadius: '50%',
          fontSize: size * 0.5,
          fontWeight: 'bold',
          color: '#4a5568'
        }}
      >
        {getFallbackSymbol(currency)}
      </div>
    );
  }

  return (
    <div
      className="token-icon-container"
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0
      }}
    >
      <img
        src={iconUrl}
        alt={`${currency} icon`}
        width={size}
        height={size}
        className={`token-icon ${className}`}
        style={{
          display: loaded ? 'block' : 'none',
          borderRadius: '50%',
          objectFit: 'cover'
        }}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      {/* Show fallback while loading */}
      {!loaded && (
        <div
          className={`token-icon-fallback ${className}`}
          style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e2e8f0',
            borderRadius: '50%',
            fontSize: Math.max(8, size * 0.4),
            fontWeight: 'bold',
            color: '#4a5568',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {getFallbackSymbol(currency)}
        </div>
      )}
    </div>
  );
};