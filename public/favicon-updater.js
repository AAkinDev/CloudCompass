// Force favicon update script
(function() {
  'use strict';
  
  // Function to update favicon
  function updateFavicon() {
    const timestamp = Date.now();
    const faviconUrl = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/cloudproinsights-favicon.png?v=${timestamp}`;
    
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());
    
    // Add new favicon links
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.type = 'image/png';
    newLink.href = faviconUrl;
    document.head.appendChild(newLink);
    
    // Add shortcut icon
    const shortcutLink = document.createElement('link');
    shortcutLink.rel = 'shortcut icon';
    shortcutLink.type = 'image/png';
    shortcutLink.href = faviconUrl;
    document.head.appendChild(shortcutLink);
    
    console.log('Favicon updated with timestamp:', timestamp);
  }
  
  // Update favicon when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFavicon);
  } else {
    updateFavicon();
  }
  
  // Also update after a short delay to ensure it takes effect
  setTimeout(updateFavicon, 100);
})();
