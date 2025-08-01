import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  noPadding?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  title,
  subtitle,
  footer,
  noPadding = false,
  bordered = true,
  hoverable = false,
}: CardProps) {
  return (
    <div 
      className={`\n        bg-white dark:bg-card-dark
        ${bordered ? 'border border-gray-200 dark:border-indigo-700' : ''}
        rounded-lg shadow-sm dark:shadow-lg dark:shadow-indigo-900/20
        overflow-hidden
        ${hoverable ? 'transition-all duration-200 hover:shadow-md dark:hover:shadow-xl dark:hover:shadow-indigo-900/30 hover:-translate-y-1' : ''}
        ${className}
      `}>
      {/* Card Header */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-indigo-700">
          {title && (
            <h3 className="text-lg font-semibold text-highstrat dark:text-white font-montserrat">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-montserrat">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-indigo-800 border-t border-gray-200 dark:border-indigo-700">
          {footer}
        </div>
      )}
    </div>
  );
}
