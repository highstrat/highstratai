import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  icon,
  className = '',
}: BadgeProps) {
  // Base classes for all badges
  const baseClasses = 'inline-flex items-center font-medium font-montserrat';

  // Variant-specific classes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-indigo-700 dark:text-gray-200',
    primary: 'bg-highstrat text-white',
    secondary: 'bg-accent-blue text-white',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
  };

  // Size-specific classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  // Border radius classes
  const radiusClasses = rounded ? 'rounded-full' : 'rounded-md';

  return (
    <span
      className={`\n        ${baseClasses}\n        ${variantClasses[variant]}\n        ${sizeClasses[size]}\n        ${radiusClasses}\n        ${className}\n      `}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
}
