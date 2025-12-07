import { useState, useEffect } from 'react';

interface NetworkStatusState {
  online: boolean;
  rtt: number | null; // Round trip time (latency)
  downlink: number | null; // Bandwidth estimate in Mbps
  effectiveType: string | null; // 'slow-2g', '2g', '3g', or '4g'
}

export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatusState>({
    online: navigator.onLine,
    rtt: null,
    downlink: null,
    effectiveType: null
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || 
                         (navigator as any).mozConnection || 
                         (navigator as any).webkitConnection;
      
      setNetworkStatus({
        online: navigator.onLine,
        rtt: connection?.rtt || null,
        downlink: connection?.downlink || null,
        effectiveType: connection?.effectiveType || null
      });
    };
    
    // Add event listeners
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    // Set initial state
    updateNetworkStatus();
    
    // Listen for connection changes (if supported)
    const connection = (navigator as any).connection || 
                       (navigator as any).mozConnection || 
                       (navigator as any).webkitConnection;
    
    if (connection && connection.addEventListener) {
      connection.addEventListener('change', updateNetworkStatus);
    }
    
    // Clean up
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      
      if (connection && connection.removeEventListener) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);
  
  return networkStatus;
}