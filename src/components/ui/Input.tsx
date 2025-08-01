import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    className = '', 
    containerClassName = '',
    disabled,
    readOnly,
    ...props 
  }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-highstrat dark:text-gray-200 mb-1 font-montserrat">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">{leftIcon}</span>
            </div>
          )}

          <input
            ref={ref}
            className={`  
              block w-full rounded-lg border font-montserrat
              ${error 
                ? 'border-error focus:ring-error focus:border-error' 
                : 'border-gray-300 dark:border-indigo-600 focus:ring-accent-blue focus:border-accent-blue'
              }
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${disabled 
                ? 'bg-gray-100 dark:bg-indigo-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-white dark:bg-indigo-800 text-highstrat dark:text-white'
              }
              ${readOnly 
                ? 'bg-gray-50 dark:bg-indigo-700 cursor-default' 
                : ''
              }
              py-2 px-4 shadow-sm text-sm focus:outline-none focus:ring-2
              transition-colors duration-200
              ${className}
            `}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />

          {rightIcon && !error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">{rightIcon}</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-error" aria-hidden="true" />
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={`mt-1 text-sm font-montserrat ${error ? 'text-error' : 'text-gray-500 dark:text-gray-400'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
