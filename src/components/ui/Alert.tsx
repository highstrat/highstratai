import React from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert({
  children,
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
}: AlertProps) {
  // Variant-specific classes and icons
  const variantConfig = {
    info: {
      classes: 'bg-info/10 text-info border-info/20',
      icon: <Info className="h-5 w-5" />,
    },
    success: {
      classes: 'bg-success/10 text-success border-success/20',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    warning: {
      classes: 'bg-warning/10 text-warning border-warning/20',
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    error: {
      classes: 'bg-error/10 text-error border-error/20',
      icon: <AlertCircle className="h-5 w-5" />,
    },
  };

  return (
    <div className={`\n      rounded-lg border p-4 font-montserrat
      ${variantConfig[variant].classes}
      ${className}
    `}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon || variantConfig[variant].icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className={`text-sm ${title ? 'mt-2' : ''}`}>
            {children}
          </div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={onDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
