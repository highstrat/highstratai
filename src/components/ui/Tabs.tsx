import React, { useState } from 'react';
import React, { useState, createContext, useContext } from 'react';
import { withSuperflex } from '../../utils/superflexIntegration';

interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}


interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value,
  onValueChange,
  className = '',
  tabsClassName = '',
  contentClassName = '',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultValue || '');

  const activeTab = value !== undefined ? value : internalActiveTab;

    <div className={`font-montserrat ${className}`}>
      <div className={`flex ${variantClasses[variant].tabs} ${tabsClassName}`}>

  return (
    <div className={className}>
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={getTabClasses(tab)}
            className={`${
              variantClasses[variant].tab(activeTabId === tab.id)
            } ${
              tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            } transition-all duration-200`}
        `}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
      <div 
        className={`${getContentContainerClasses()} ${contentClassName}`}
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
      >
        {tabs.find(tab => tab.id === activeTabId)?.content}
      </div>
    </TabsContext.Provider>
  );
};

const ManualTabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`\n      flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1\n      ${className}\n    `}>
      {children}
      </div>
    </div>
  );
};
const ManualTabsTrigger: React.FC<TabsTriggerProps> = ({ 
  children, 
  value, 
  disabled = false, 
  className = '' 
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      className={`\n        flex-1 px-3 py-2 text-sm font-medium font-montserrat rounded-md transition-all duration-200\n        focus:outline-none focus:ring-2 focus:ring-[#7ac5d7]/50\n        ${isActive
          ? 'bg-white dark:bg-gray-700 text-[#0e0934] dark:text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-[#0e0934] dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
        }\n        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}\n        ${className}\n      `}
    >
      {children}
    </button>
  );
};

const ManualTabsContent: React.FC<TabsContentProps> = ({ 
  children, 
  value, 
  className = '' 
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }

  const { activeTab } = context;

  if (activeTab !== value) {
    return null;
  }

  return (
    <div className={`mt-4 focus:outline-none ${className}`}>
      {children}
    </div>
  );
};

// Create Superflex-integrated components
const Tabs = withSuperflex(ManualTabs, 'Tabs', {
  fallbackToManual: true,
  preserveProps: true,
  debugMode: true
});

const TabsList = withSuperflex(ManualTabsList, 'TabsList', {
  fallbackToManual: true,
  preserveProps: true,
  debugMode: true
});

const TabsTrigger = withSuperflex(ManualTabsTrigger, 'TabsTrigger', {
  fallbackToManual: true,
  preserveProps: true,
  debugMode: true
});

const TabsContent = withSuperflex(ManualTabsContent, 'TabsContent', {
  fallbackToManual: true,
  preserveProps: true,
  debugMode: true
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
export { ManualTabs, ManualTabsList, ManualTabsTrigger, ManualTabsContent };
