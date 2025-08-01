import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    options, 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    size = 'md',
    className = '', 
    containerClassName = '',
    disabled,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-sm',
      lg: 'py-2.5 text-base',
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-highstrat dark:text-gray-200 mb-1 font-montserrat">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={`block w-full rounded-lg border appearance-none font-montserrat
              ${error 
                ? 'border-error focus:ring-error focus:border-error' 
                : 'border-gray-300 dark:border-indigo-600 focus:ring-accent-blue focus:border-accent-blue'
              }
              ${disabled 
                ? 'bg-gray-100 dark:bg-indigo-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-white dark:bg-indigo-800 text-highstrat dark:text-white'
              }
              px-4 pr-10 ${sizeClasses[size]} shadow-sm focus:outline-none focus:ring-2
              transition-colors duration-200
              ${className}
            `}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>

          {error && (
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
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

Select.displayName = 'Select';

export default Select;
