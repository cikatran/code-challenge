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
        {fallback || currency.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <>
      <img
        src={iconUrl}
        alt={`${currency} icon`}
        width={size}
        height={size}
        className={`token-icon ${className}`}
        style={{ display: loaded ? 'block' : 'none' }}
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
            fontSize: size * 0.5,
            fontWeight: 'bold',
            color: '#4a5568'
          }}
        >
          {fallback || currency.slice(0, 2).toUpperCase()}
        </div>
      )}
    </>
  );
};