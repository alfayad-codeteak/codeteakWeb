"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      // Instant scroll to top immediately on route change
      window.scrollTo(0, 0);
      
      // Direct scrollTop assignment for better mobile support
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    
    // Also scroll after a small delay to ensure content is fully loaded
    // This handles cases where content might load after initial render
    const timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }, 100);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname]);

  return null;
}


