"use client"

import { useEffect } from "react"

const GoogleAnalytics = () => {
  useEffect(() => {
    // Load the Google Analytics script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-101Z23JRLC";
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag once script is loaded
    script.onload = () => {
      // Ensure global dataLayer exists
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;

      gtag("js", new Date());
      gtag("config", "G-101Z23JRLC");
    };
  }, []);

  return null; // This component doesn’t render anything
};

export default GoogleAnalytics;
