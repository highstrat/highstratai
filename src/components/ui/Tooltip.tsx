import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 0,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };
  
  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };
  
  const updatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return;
    
    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = 0;
    let y = 0;
    
    switch (position) {
      case 'top':
        x = childRect.left + (childRect.width / 2) - (tooltipRect.width / 2);
        y = childRect.top - tooltipRect.height - 8;
        break;
      case 'right':
        x = childRect.right + 8;
        y = childRect.top + (childRect.height / 2) - (tooltipRect.height / 2);
        break;
      case 'bottom':
        x = childRect.left + (childRect.width / 2) - (tooltipRect.width / 2);
        y = childRect.bottom + 8;
        break;
      case 'left':
        x = childRect.left - tooltipRect.width - 8;
        y = childRect.top + (childRect.height / 2) - (tooltipRect.height / 2);
        break;
    }
    
    // Ensure tooltip stays within viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8));
    
    setCoords({ x, y });
  };
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // Clone the child element to add event handlers
  const child = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  });
  
  return (
    <>
      {child}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-2 py-1 text-xs font-medium
            bg-highstrat text-white rounded shadow-lg
            pointer-events-none font-montserrat
            ${className}
          `}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
          }}
        >
          {content}
          <div
            className={`
              absolute w-2 h-2 bg-highstrat transform rotate-45
              ${position === 'top' ? 'bottom-[-4px] left-1/2 ml-[-4px]' : ''}
              ${position === 'right' ? 'left-[-4px] top-1/2 mt-[-4px]' : ''}
              ${position === 'bottom' ? 'top-[-4px] left-1/2 ml-[-4px]' : ''}
              ${position === 'left' ? 'right-[-4px] top-1/2 mt-[-4px]' : ''}
            `}
          />
        </div>
      )}
    </>
  );
}
