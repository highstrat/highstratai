import React from 'react';
import Image from 'next/image';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  status,
  className = '',
}: AvatarProps) {
  // Size-specific classes
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  // Status-specific classes
  const statusClasses = {
    online: 'bg-success',
    offline: 'bg-gray-400',
    busy: 'bg-error',
    away: 'bg-warning',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
          <Image
            src={src}
            alt={alt}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className={`\n          ${sizeClasses[size]} \n          rounded-full \n          bg-accent-pink/10 \n          text-accent-pink \n          flex \n          items-center \n          justify-center \n          font-medium \n          font-montserrat\n        `}>
          {initials || alt.charAt(0).toUpperCase()}
        </div>
      )}

      {status && (
        <span className={`\n          absolute bottom-0 right-0 \n          block h-2.5 w-2.5 \n          rounded-full \n          ring-2 ring-white dark:ring-indigo-900\n          ${statusClasses[status]}\n        `} />
      )}
    </div>
  );
}
