import React from 'react';

const CloudCompassLogo = ({ className = "", size = "default", showText = true }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-12 h-8", 
    large: "w-16 h-12",
    xl: "w-20 h-16"
  };

  const textSizes = {
    small: "text-sm",
    default: "text-lg",
    large: "text-xl", 
    xl: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        className={`${sizeClasses[size]} flex-shrink-0`}
        viewBox="0 0 120 80" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: "#3B82F6", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "#1D4ED8", stopOpacity: 1}} />
          </linearGradient>
        </defs>
        
        {/* Main cloud shape */}
        <path 
          d="M20 40 Q20 25 35 25 Q45 15 60 15 Q75 15 85 25 Q100 25 100 40 Q100 55 85 55 Q75 65 60 65 Q45 65 35 55 Q20 55 20 40 Z" 
          fill="url(#cloudGradient)" 
          stroke="#1E40AF" 
          strokeWidth="2"
        />
        
        {/* Compass needle (white) */}
        <path 
          d="M60 25 L55 35 L60 45 L65 35 Z" 
          fill="white" 
          stroke="white" 
          strokeWidth="1"
        />
        
        {/* Compass center dot */}
        <circle cx="60" cy="35" r="3" fill="#3B82F6"/>
        
        {/* Compass needle pointer */}
        <path 
          d="M60 20 L58 30 L60 35 L62 30 Z" 
          fill="white" 
          stroke="white" 
          strokeWidth="1"
        />
      </svg>
      
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
          CloudCompass
        </span>
      )}
    </div>
  );
};

export default CloudCompassLogo; 