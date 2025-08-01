import React, { Fragment } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  className = '',
}: ModalProps) {
  if (!isOpen) return null;

  // Size-specific classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleOverlayClick}
    >
      <div 
        className={`\n          w-full ${sizeClasses[size]} bg-white dark:bg-indigo-800 \n          rounded-lg shadow-xl overflow-hidden
          transform transition-all duration-300 ease-out
          font-montserrat
          ${className}
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        {title && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-indigo-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-highstrat dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="px-6 py-4">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-indigo-700 bg-gray-50 dark:bg-indigo-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.body
  );
}
