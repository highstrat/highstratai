// Complete, working component code here

import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium font-montserrat rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-accent-pink hover:bg-pink-600 text-white focus:ring-accent-pink/50 shadow-sm',
    secondary: 'bg-accent-blue hover:bg-blue-400 text-white focus:ring-accent-blue/50 shadow-sm',
    outline: 'bg-transparent border border-accent-pink text-accent-pink hover:bg-accent-pink/10 focus:ring-accent-pink/30 dark:hover:bg-accent-pink/20',
    text: 'bg-transparent text-accent-pink hover:bg-accent-pink/10 focus:ring-accent-pink/30 dark:hover:bg-accent-pink/20',
  };

  // Size-specific classes
  const sizeClasses = {
    xs: 'text-xs px-2.5 py-1.5',
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
    xl: 'text-base px-6 py-3',
  };

  return (
    <button
      className={`\n        ${baseClasses}\n        ${variantClasses[variant]}\n        ${sizeClasses[size]}\n        ${fullWidth ? 'w-full' : ''}\n        ${className}\n      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
