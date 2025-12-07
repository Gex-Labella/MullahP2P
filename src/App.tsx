import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { motion } from "framer-motion";

// StarkNet Provider
import { StarknetProvider, useStarknet } from "./contexts";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NetworkStatus from "./pages/NetworkStatus";
import P2PStatistics from "./pages/P2PStatistics";
import Settings from "./pages/Settings";

// Layout components
import Layout from "./components/layout/Layout";

// Create mock components if not available
const MockEthereum3D = () => (
  <div className="w-24 h-24 mx-auto">
    <svg
      width="96"
      height="96"
      viewBox="0 0 784 784"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-pulse"
    >
      <path
        d="M392 784C608.569 784 784 608.569 784 392C784 175.431 608.569 0 392 0C175.431 0 0 175.431 0 392C0 608.569 175.431 784 392 784Z"
        fill="#627EEA"
      />
      <path
        d="M406.24 97.9999V315.31L588.3 395.65L406.24 97.9999Z"
        fill="white"
        fillOpacity="0.602"
      />
      <path
        d="M406.24 97.9999L224.16 395.65L406.24 315.31V97.9999Z"
        fill="white"
      />
    </svg>
  </div>
);

const MockParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white/10 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 1}px`,
          height: `${Math.random() * 4 + 1}px`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      />
    ))}
  </div>
);

// Create a separate LoadingScreen component that uses the Starknet context
function LoadingScreen() {
  const { isConnected, connectWallet } = useStarknet();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <MockParticleBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="loading-screen flex flex-col items-center justify-center min-h-screen relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center"
        >
          {/* Enhanced Loading Animation */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="mb-8"
          >
            <div className="spinner w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto"></div>
          </motion.div>

          {/* App Name with Gradient */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="app-name text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent mb-2">
              P2P Mullah
            </h1>
            <p className="text-white/70 text-lg">Loading your dashboard...</p>
          </motion.div>

          {/* Connection Status and Ethereum 3D */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {!isConnected && (
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-white/60"
              >
                Click the Ethereum logo to connect your wallet
              </motion.p>
            )}

            <motion.div
              onClick={!isConnected ? connectWallet : undefined}
              className={`${
                !isConnected
                  ? "cursor-pointer hover:scale-105 transition-transform duration-200"
                  : ""
              }`}
              title={!isConnected ? "Connect Wallet" : "Wallet Connected"}
              whileHover={!isConnected ? { scale: 1.05 } : {}}
              whileTap={!isConnected ? { scale: 0.95 } : {}}
            >
              <MockEthereum3D />
            </motion.div>

            {/* Enhanced Connection Status Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className={`flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm border ${
                isConnected
                  ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
                  : "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
              }`}
            >
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? "bg-emerald-400" : "bg-yellow-400"
                }`}
                animate={{
                  scale: isConnected ? [1, 1.2, 1] : [1, 1.1, 1],
                  opacity: isConnected ? [1, 0.7, 1] : [1, 0.8, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-medium">
                {isConnected ? "Wallet Connected" : "Wallet Not Connected"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function App() {
  // Loading animation state
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  });

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <StarknetProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-background text-foreground">
          <Toaster
            richColors
            position="top-right"
            theme={darkMode ? "dark" : "light"}
            closeButton
          />
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="network-status" element={<NetworkStatus />} />
                <Route path="statistics" element={<P2PStatistics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              {/* Redirect any unknown routes to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </div>
      )}
    </StarknetProvider>
  );
}
