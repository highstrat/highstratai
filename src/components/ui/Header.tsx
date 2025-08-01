'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface HeaderProps {
  className?: string;
  showNavigation?: boolean;
  children?: React.ReactNode;
  logoVariant?: 'default' | 'stylized' | 'compact' | 'auto';
}

export const Header: React.FC<HeaderProps> = ({ 
  className = '', 
  showNavigation = true,
  children,
  logoVariant = 'auto'
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor screen size for logo switching
  useEffect(() => {
    const checkScreenSize = () => {
      // Switch to compact mode on smaller screens or when space is limited
      setIsCompactMode(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Determine which logo to use based on theme, screen size, and variant preference
  const getLogoConfig = () => {
    if (!mounted) return { src: '', alt: '', type: 'loading' };

    const isDark = resolvedTheme === 'dark';
    
    // Auto logic: Use stylized logo for larger screens, traditional for smaller
    if (logoVariant === 'auto') {
      if (isCompactMode) {
        // Use compact traditional logos for small screens
        return {
          src: isDark 
            ? '/images/logos/HIGHSTRAT AI white transparent (1).png'
            : '/images/logos/HIGHSTRAT AI purple transparent.png',
          alt: 'HIGHSTRAT AI - Enterprise Strategy & AI Solutions',
          type: 'traditional-compact'
        };
      } else {
        // Use stylized logo for larger screens
        return {
          src: '/images/logos/HIGHSTRAT AI stylized geometric.png',
          alt: 'HIGHSTRAT AI - High-Powered Technology Strategy with Geometric Design',
          type: 'stylized'
        };
      }
    }

    // Specific variant handling
    switch (logoVariant) {
      case 'stylized':
        return {
          src: '/images/logos/HIGHSTRAT AI stylized geometric.png',
          alt: 'HIGHSTRAT AI - High-Powered Technology Strategy with Geometric Design',
          type: 'stylized'
        };
      
      case 'compact':
        return {
          src: isDark 
            ? '/images/logos/HIGHSTRAT AI white transparent (1).png'
            : '/images/logos/HIGHSTRAT AI purple transparent.png',
          alt: 'HIGHSTRAT AI - Enterprise Strategy & AI Solutions',
          type: 'traditional-compact'
        };
      
      case 'default':
      default:
        return {
          src: isDark
            ? (isCompactMode 
                ? '/images/logos/HIGHSTRAT AI white transparent (1).png'
                : '/images/logos/HIGHSTRAT AI white motto transparent.png')
            : (isCompactMode
                ? '/images/logos/HIGHSTRAT AI purple transparent.png'
                : '/images/logos/HIGHSTRAT AI purple motto transparent.png'),
          alt: isCompactMode 
            ? 'HIGHSTRAT AI - Enterprise Strategy & AI Solutions'
            : 'HIGHSTRAT AI - High-Powered Technology Strategy',
          type: isCompactMode ? 'traditional-compact' : 'traditional-full'
        };
    }
  };

  const logoConfig = getLogoConfig();

  // Get responsive classes based on logo type
  const getLogoClasses = (type: string) => {
    const baseClasses = 'h-8 lg:h-12 w-auto object-contain transition-all duration-300';
    
    switch (type) {
      case 'stylized':
        return `${baseClasses} max-w-[180px] sm:max-w-[220px] lg:max-w-[280px]`;
      case 'traditional-compact':
        return `${baseClasses} max-w-[120px] sm:max-w-[140px]`;
      case 'traditional-full':
        return `${baseClasses} max-w-[200px] sm:max-w-[280px] lg:max-w-[320px]`;
      default:
        return baseClasses;
    }
  };

  if (!mounted) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <header className={`bg-white dark:bg-highstrat border-b border-gray-200 dark:border-indigo-800 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <div className="h-8 lg:h-12 w-32 lg:w-48 bg-gray-200 dark:bg-indigo-700 animate-pulse rounded" />
            </div>
            {children && (
              <div className="flex items-center space-x-4">
                {children}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`bg-white dark:bg-highstrat border-b border-gray-200 dark:border-indigo-800 transition-colors duration-200 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="block focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 dark:focus:ring-offset-highstrat rounded-lg transition-all duration-200 hover:opacity-80"
              aria-label="HIGHSTRAT AI - Go to homepage"
            >
              <img
                src={logoConfig.src}
                alt={logoConfig.alt}
                className={getLogoClasses(logoConfig.type)}
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              {/* Fallback text logo */}
              <div 
                className="hidden font-montserrat font-bold text-highstrat dark:text-white text-lg lg:text-2xl"
                style={{ display: 'none' }}
              >
                HIGHSTRAT AI
              </div>
            </Link>
          </div>

          {/* Navigation or Additional Content */}
          {showNavigation && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/dashboard" 
                className="text-gray-700 dark:text-gray-200 hover:text-accent-pink dark:hover:text-accent-blue font-montserrat font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link 
                href="/risks" 
                className="text-gray-700 dark:text-gray-200 hover:text-accent-pink dark:hover:text-accent-blue font-montserrat font-medium transition-colors duration-200"
              >
                Risk Management
              </Link>
              <Link 
                href="/strategy" 
                className="text-gray-700 dark:text-gray-200 hover:text-accent-pink dark:hover:text-accent-blue font-montserrat font-medium transition-colors duration-200"
              >
                Strategy
              </Link>
            </nav>
          )}

          {/* Right Side Content */}
          {children && (
            <div className="flex items-center space-x-4">
              {children}
            </div>
          )}

          {/* Mobile Menu Button (if navigation is shown) */}
          {showNavigation && (
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-700 dark:text-gray-200 hover:text-accent-pink dark:hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 dark:focus:ring-offset-highstrat p-2 rounded-md transition-colors duration-200"
                aria-label="Open mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
