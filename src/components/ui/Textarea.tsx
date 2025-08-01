import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    className = '', 
    containerClassName = '',
    disabled,
    readOnly,
    ...props 
  }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-brand-indigo dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            className={`
              block w-full rounded-lg border
              ${error 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 dark:border-dark-600 focus:ring-brand-blue focus:border-brand-blue'
              }
              ${disabled 
                ? 'bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-white dark:bg-dark-800 text-brand-indigo dark:text-white'
              }
              ${readOnly 
                ? 'bg-gray-50 dark:bg-dark-700 cursor-default' 
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
          
          {error && (
            <div className="absolute top-2 right-2 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
