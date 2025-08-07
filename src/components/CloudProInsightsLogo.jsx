import React from 'react';
import { getAssetUrl } from '../utils/cacheBuster';

const CloudProInsightsLogo = ({ className = "", size = "default", showText = true }) => {
  const sizeClasses = {
    small: "w-32 h-32",      // was w-16 h-16 (doubled)
    default: "w-48 h-32",    // was w-24 h-16 (doubled)
    large: "w-64 h-48",      // was w-32 h-24 (doubled)
    xl: "w-80 h-64"          // was w-40 h-32 (doubled)
  };

  const textSizes = {
    small: "text-sm",
    default: "text-lg",
    large: "text-xl", 
    xl: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={getAssetUrl('/public/assets/logos/CPI-logo.png')}
        alt="CloudProInsights"
        className={`${sizeClasses[size]} flex-shrink-0 object-contain`}
        onError={(e) => {
          // Fallback to SVG if image fails to load
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = `
            <svg class="${sizeClasses[size]} flex-shrink-0" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="M20 40 Q20 25 35 25 Q45 15 60 15 Q75 15 85 25 Q100 25 100 40 Q100 55 85 55 Q75 65 60 65 Q45 65 35 55 Q20 55 20 40 Z" 
                    fill="url(#cloudGradient)" stroke="#1E40AF" stroke-width="2"/>
              <path d="M60 25 L55 35 L60 45 L65 35 Z" fill="white" stroke="white" stroke-width="1"/>
              <circle cx="60" cy="35" r="3" fill="#3B82F6"/>
              <path d="M60 20 L58 30 L60 35 L62 30 Z" fill="white" stroke="white" stroke-width="1"/>
            </svg>
          `;
        }}
      />
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
            CloudProInsights
          </span>
          <span className={`italic text-gray-500 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
            Smarter Cloud Decisions Start Here.
          </span>
        </div>
      )}
    </div>
  );
};

export default CloudProInsightsLogo; 