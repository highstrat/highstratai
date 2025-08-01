import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Home, BarChart3, Users, FileText, Shield, Database, Settings } from 'lucide-react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/', icon: Home, current: true },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: false },
    { name: 'Projects', href: '/projects', icon: FileText, current: false },
    { name: 'Team', href: '/team', icon: Users, current: false },
    { name: 'Security', href: '/security', icon: Shield, current: false },
    { name: 'Data Sources', href: '/data-sources', icon: Database, current: false },
    { name: 'Settings', href: '/settings', icon: Settings, current: false },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-indigo-900 font-montserrat">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-indigo-900/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`  
          fixed inset-y-0 left-0 z-50 flex flex-col 
          bg-highstrat transition-all duration-300 ease-in-out
          ${isMobile 
            ? sidebarOpen ? 'translate-x-0' : '-translate-x-full' 
            : collapsed ? 'w-20' : 'w-64'
          }
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Sidebar header */}
        <div className={`  
          flex items-center justify-between h-16 px-4 border-b border-accent-blue/20
          ${collapsed && !isMobile ? 'justify-center' : ''}
        `}>
          {(!collapsed || isMobile) && (
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">HIGHSTRAT</span>
            </div>
          )}

          {isMobile ? (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-accent-blue"
            >
              <X size={24} />
            </button>
          ) : (
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-accent-blue"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`  
                    flex items-center px-3 py-3 rounded-lg transition-colors duration-200
                    ${item.current 
                      ? 'bg-accent-blue text-highstrat' 
                      : 'text-white hover:bg-accent-blue/20'
                    }
                    ${collapsed && !isMobile ? 'justify-center' : ''}
                  `}
                >
                  <item.icon size={20} className={collapsed && !isMobile ? 'mx-auto' : 'mr-3'} />
                  {(!collapsed || isMobile) && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer with dark mode toggle */}
        <div className={`  
          p-4 border-t border-accent-blue/20 flex
          ${collapsed && !isMobile ? 'justify-center' : 'justify-between items-center'}
        `}>
          {(!collapsed || isMobile) && (
            <span className="text-sm text-accent-blue">© HIGHSTRAT AI</span>
          )}
          <DarkModeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-indigo-800 border-b border-gray-200 dark:border-indigo-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Left side: Mobile menu button and breadcrumb */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-highstrat dark:text-white hover:text-accent-pink"
              >
                <Menu size={24} />
              </button>
              
              <div className="ml-4 lg:ml-0">
                <h1 className="text-xl font-semibold text-highstrat dark:text-white">Dashboard</h1>
              </div>
            </div>

            {/* Right side: User profile, notifications, etc. */}
            <div className="flex items-center space-x-4">
              <button className="text-highstrat dark:text-white hover:text-accent-pink">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-accent-pink flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-indigo-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
