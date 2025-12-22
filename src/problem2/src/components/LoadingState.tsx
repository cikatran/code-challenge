import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading exchange rates...' }) => {
  return (
    <div className="loading">
      <span>{message}</span>
    </div>
  );
};