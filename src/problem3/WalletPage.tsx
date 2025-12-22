import React, { useMemo } from 'react';
import { BoxProps } from '@mui/material/Box';

// Define blockchain type for type safety
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | string;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
  formatted: string;
}

interface Props extends BoxProps {
  children?: React.ReactNode;
}

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ amount, usdValue, formattedAmount, className }) => {
  return (
    <div className={className}>
      {/* Component implementation would go here */}
      <span>Amount: {formattedAmount} | USD: ${usdValue.toFixed(2)}</span>
    </div>
  );
};

// Create a priority map for better performance
const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
};

// Extract priority function outside component for better performance
const getPriority = (blockchain: Blockchain): number => {
  return BLOCKCHAIN_PRIORITY[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    // Filter out balances with zero or negative amounts and low priority
    const filteredBalances = balances.filter((balance: WalletBalance) => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0;
    });

    // Sort balances by priority (highest first)
    return filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      return rightPriority - leftPriority; // Higher priority first
    });
  }, [balances]); // Removed prices from dependencies as it's not used in sorting

  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance): FormattedWalletBalance => ({
      ...balance,
      formatted: balance.amount.toFixed()
    }));
  }, [sortedBalances]);

  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          key={`${balance.currency}-${balance.blockchain}`} // Use composite key for uniqueness
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

// Mock hooks for demonstration (would be imported from actual implementation)
const useWalletBalances = (): WalletBalance[] => {
  return [
    { currency: 'BTC', amount: 1.5, blockchain: 'Bitcoin' },
    { currency: 'ETH', amount: 2.0, blockchain: 'Ethereum' },
    { currency: 'OSMO', amount: 100, blockchain: 'Osmosis' },
    { currency: 'ZIL', amount: 500, blockchain: 'Zilliqa' },
  ];
};

const usePrices = (): Record<string, number> => {
  return {
    'BTC': 45000,
    'ETH': 3000,
    'OSMO': 5,
    'ZIL': 0.1,
  };
};

export default WalletPage;