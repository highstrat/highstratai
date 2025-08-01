import React from 'react';
import { withSuperflex } from '../../utils/superflexIntegration';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
  text?: string;
}

const ManualLoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  text,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-[#bf2e8a]',
    secondary: 'text-[#7ac5d7]',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        className={`
          animate-spin ${sizeClasses[size]} ${colorClasses[color]}
        `}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      
      {text && (
        <p className={`
          mt-2 font-montserrat font-medium ${colorClasses[color]} ${textSizeClasses[size]}
        `}>
          {text}
        </p>
      )}
    </div>
  );
};

// Create Superflex-integrated LoadingSpinner component
const LoadingSpinner = withSuperflex(ManualLoadingSpinner, 'LoadingSpinner', {
  fallbackToManual: true,
  preserveProps: true,
  debugMode: true
});

export default LoadingSpinner;
export { ManualLoadingSpinner };
