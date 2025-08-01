import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on system preference or localStorage
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (!('darkMode' in localStorage) && 
       window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkMode(isDark);
    updateTheme(isDark);
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateTheme(newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}
