'use client';

import { useEffect } from 'react';

export const DynamicFavicon = () => {
  useEffect(() => {
    const updateFavicon = (isDark: boolean) => {
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      
      if (favicon) {
        favicon.href = isDark ? '/white.svg' : '/black.svg';
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = isDark ? '/white.svg' : '/black.svg';
        document.head.appendChild(newFavicon);
      }
    };

    // Check initial theme
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateFavicon(darkModeQuery.matches);

    // Listen for theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      updateFavicon(e.matches);
    };

    darkModeQuery.addEventListener('change', handleChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return null;
};
