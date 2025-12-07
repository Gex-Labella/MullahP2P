"use client";

import { useState, useEffect, type SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Shield,
  Wallet2,
  Sparkles,
  Globe,
  Zap,
  Star,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ContractService from "../services/ContractService";

// Toast Component with higher z-index and portal-like behavior
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle,
  };

  const colors = {
    success: "from-green-500 to-emerald-500 border-green-400/30",
    error: "from-red-500 to-pink-500 border-red-400/30",
    info: "from-blue-500 to-indigo-500 border-blue-400/30",
  };

  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md px-4"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`bg-gradient-to-r ${colors[type]} p-4 rounded-2xl shadow-2xl backdrop-blur-xl border-2`}
      >
        <div className="flex items-center space-x-3 text-white">
          <Icon className="h-6 w-6 flex-shrink-0" />
          <p className="font-medium flex-1 text-sm md:text-base">{message}</p>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
          animate={{
            x: [0, Math.random() * 1920],
            y: [0, Math.random() * 1080],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
        />
      ))}
    </div>
  );
};

// Glassmorphism Card Component
const GlassmorphismCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Blockchain Visualizer Component
const BlockchainVisualizer = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-blue-400 rounded-full"
        />
      </div>
      <div className="absolute bottom-20 right-20">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-2 border-emerald-400 rounded-full"
        />
      </div>
      <div className="absolute top-1/2 left-1/4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-16 h-16 border-2 border-purple-400 rounded-full"
        />
      </div>
    </div>
  );
};

export default function Login() {
  const [activeTab, setActiveTab] = useState<"email" | "wallet">("email");
  const [isConnected, setIsConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Toast helper function
  const showToast = (message: string, type: "success" | "error" | "info") => {
    console.log("Showing toast:", message, type);
    setToast({ message, type });
  };

  // Helper to fetch wallet balance
  const loadWalletBalance = async () => {
    try {
      const balance: string = await ContractService.getBalance();
      setWalletBalance(balance);
    } catch (error) {
      console.error("Failed to load balance:", error);
      setWalletBalance(null);
      showToast("Failed to load wallet balance", "error");
    }
  };

  // Check wallet connection on mount
  useEffect(() => {
    const checkWallet = async () => {
      if (ContractService.isWalletConnected()) {
        setActiveTab("wallet");
        setIsConnected(true);
        await loadWalletBalance();
        showToast("Wallet already connected!", "success");
      }
    };
    void checkWallet();
  }, []);

  // Handle email login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter both email and password", "error");
      return;
    }

    setIsLoggingIn(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Logging in with:", { email, password });
      showToast("🎉 Welcome back to P2P Mullah!", "success");

      // Navigate to Dashboard after successful login
      setTimeout(() => {
        window.location.href = "/Dashboard.html"; // or just "/Dashboard"
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      showToast("Login failed. Please try again.", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle wallet connection
  const handleConnectWallet = async (walletType: string = "metamask") => {
    console.log("Connecting wallet:", walletType);
    setIsConnectingWallet(true);

    try {
      if (walletType === "metamask") {
        showToast("🦊 Connecting to MetaMask...", "info");
        const success = await ContractService.connectWallet();
        if (success) {
          setActiveTab("wallet");
          setIsConnected(true);
          await loadWalletBalance();
          setRecentTransactions((prev) => [
            `MetaMask wallet connected at ${new Date().toLocaleTimeString()}`,
            ...prev,
          ]);
          showToast("🦊 Connected to MetaMask successfully!", "success");

          // Navigate to Dashboard after successful wallet connection
          setTimeout(() => {
            window.location.href = "/Dashboard.html"; // or just "/Dashboard"
          }, 1000);
        } else {
          showToast("❌ Failed to connect to MetaMask", "error");
        }
      } else if (walletType === "argentx") {
        showToast("🚀 ArgentX integration coming soon!", "info");
      } else if (walletType === "braavos") {
        showToast("🚀 Braavos integration coming soon!", "info");
      } else {
        showToast(`🚀 ${walletType} integration coming soon!`, "info");
      }
    } catch (error: unknown) {
      console.error("Wallet connection failed:", error);
      let errorMessage = "Failed to connect wallet";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showToast(`❌ ${errorMessage}`, "error");
    } finally {
      setIsConnectingWallet(false);
    }
  };

  // Handle signup navigation
  const handleSignupClick = () => {
    window.location.href = "/Signup.html"; // or just "/Signup"
  };

  const walletOptions = [
    {
      name: "MetaMask",
      icon: Chrome,
      color: "from-orange-500 to-yellow-500",
      network: "Ethereum",
      working: true,
    },
    {
      name: "ArgentX",
      icon: Shield,
      color: "from-purple-500 to-indigo-500",
      network: "Starknet",
      working: false,
    },
    {
      name: "Braavos",
      icon: Wallet2,
      color: "from-indigo-500 to-blue-500",
      network: "Starknet",
      working: false,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ParticleBackground />
      <BlockchainVisualizer />

      {/* Toast with AnimatePresence */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Main Container - Perfectly Centered */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header - Centered */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="mb-8 text-center relative z-20"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              <motion.div
                animate={{
                  rotate: 360,
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(16, 185, 129, 0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity },
                }}
                className="p-3 md:p-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 mb-3 sm:mb-0 sm:mr-4"
              >
                <Activity className="h-10 w-10 md:h-14 md:w-14 text-white" />
              </motion.div>
              <motion.h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                P2P Mullah
              </motion.h1>
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-3 sm:mt-0 sm:ml-4"
              >
                <Sparkles className="h-8 w-8 md:h-12 md:w-12 text-yellow-400" />
              </motion.div>
            </div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/80 text-sm md:text-lg"
            >
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                <span>Multi-Chain</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" />
                <span>Instant Transfer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                <span>Secure</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content Card - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
            className="max-w-3xl mx-auto"
          >
            <GlassmorphismCard>
              <Card className="border-0 bg-transparent shadow-none">
                <CardHeader className="text-center p-6 md:p-10 pb-4 md:pb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mx-auto h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center mb-6 shadow-2xl"
                  >
                    <User className="h-10 w-10 md:h-12 md:w-12 text-white" />
                  </motion.div>
                  <CardTitle className="text-2xl md:text-5xl text-white mb-3">
                    {activeTab === "email"
                      ? "Welcome Back"
                      : isConnected
                      ? "Your Wallet"
                      : "Connect Wallet"}
                  </CardTitle>
                  <CardDescription className="text-lg md:text-2xl text-white/70">
                    {activeTab === "email"
                      ? "Sign in to your P2P Mullah account"
                      : isConnected
                      ? "Manage your digital assets"
                      : "Connect your wallet to get started"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 md:p-10 pt-4 space-y-8">
                  {/* Tab Selector - Centered and Larger */}
                  <div className="relative bg-black/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10 max-w-lg mx-auto">
                    <motion.div
                      className="absolute inset-y-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl shadow-lg"
                      initial={false}
                      animate={{
                        x: activeTab === "email" ? 6 : "calc(50% - 6px)",
                        width: "calc(50% - 6px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                    <div className="relative flex">
                      <button
                        className={`flex-1 py-4 px-6 rounded-xl text-base font-medium transition-all z-10 ${
                          activeTab === "email"
                            ? "text-white"
                            : "text-white/60 hover:text-white/80"
                        }`}
                        onClick={() => setActiveTab("email")}
                      >
                        <Mail className="h-5 w-5 inline mr-2" />
                        Email Login
                      </button>
                      <button
                        className={`flex-1 py-4 px-6 rounded-xl text-base font-medium transition-all z-10 ${
                          activeTab === "wallet"
                            ? "text-white"
                            : "text-white/60 hover:text-white/80"
                        }`}
                        onClick={() => setActiveTab("wallet")}
                      >
                        <Wallet2 className="h-5 w-5 inline mr-2" />
                        Wallet
                      </button>
                    </div>
                  </div>

                  {/* Email Login Form - Large Inputs */}
                  {activeTab === "email" && (
                    <div className="max-w-2xl mx-auto">
                      <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-3">
                          <Label
                            htmlFor="email"
                            className="text-white/90 flex items-center justify-center text-lg"
                          >
                            <Mail className="h-5 w-5 mr-2" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e: {
                              target: { value: SetStateAction<string> };
                            }) => setEmail(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/30 h-16 md:h-20 backdrop-blur-sm text-center text-lg md:text-xl w-full rounded-xl"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="password"
                            className="text-white/90 flex items-center justify-center text-lg"
                          >
                            <Lock className="h-5 w-5 mr-2" />
                            Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e: {
                                target: { value: SetStateAction<string> };
                              }) => setPassword(e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/30 h-16 md:h-20 pr-14 backdrop-blur-sm text-center text-lg md:text-xl w-full rounded-xl"
                              required
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-5 flex items-center text-white/50 hover:text-white/80"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-6 w-6" />
                              ) : (
                                <Eye className="h-6 w-6" />
                              )}
                            </button>
                          </div>
                          <div className="text-center">
                            <button
                              type="button"
                              className="text-sm text-blue-400 hover:text-blue-300 underline"
                            >
                              Forgot password?
                            </button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoggingIn}
                          className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white h-16 md:h-20 text-xl shadow-2xl shadow-blue-500/25 hover:shadow-emerald-500/25 transition-all duration-300 rounded-xl"
                        >
                          {isLoggingIn ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="h-7 w-7 border-2 border-white border-t-transparent rounded-full mr-3"
                            />
                          ) : (
                            <User className="h-7 w-7 mr-3" />
                          )}
                          {isLoggingIn ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    </div>
                  )}

                  {/* Wallet Section */}
                  {activeTab === "wallet" && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                      {!isConnected ? (
                        <div className="space-y-5">
                          {walletOptions.map((wallet, index) => (
                            <motion.div
                              key={wallet.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={() =>
                                  handleConnectWallet(wallet.name.toLowerCase())
                                }
                                disabled={isConnectingWallet}
                                className="w-full bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 h-20 md:h-24 text-lg transition-all group relative overflow-hidden rounded-xl"
                              >
                                <div
                                  className={`absolute inset-0 bg-gradient-to-r ${wallet.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                                />
                                <wallet.icon className="h-8 w-8 md:h-10 md:w-10 mr-4 transition-transform group-hover:scale-110 relative z-10" />
                                <div className="flex-1 text-left relative z-10">
                                  <div className="font-semibold text-lg md:text-xl">
                                    Connect with {wallet.name}
                                  </div>
                                  <div className="text-sm md:text-base opacity-70">
                                    Sign in to {wallet.network}
                                  </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 relative z-10">
                                  <Badge
                                    variant="outline"
                                    className="border-white/30 text-white/80 text-sm"
                                  >
                                    {wallet.network}
                                  </Badge>
                                  {wallet.working && (
                                    <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                                  )}
                                </div>
                              </Button>
                            </motion.div>
                          ))}

                          {isConnectingWallet && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center text-white/80 py-6"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="inline-block h-8 w-8 border-2 border-blue-400 border-t-transparent rounded-full mr-3"
                              />
                              Connecting to wallet...
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-8 text-white">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 p-8 rounded-2xl border border-white/10 text-center"
                          >
                            <div className="flex items-center justify-center mb-6">
                              <span className="text-white/70 mr-3 text-lg">
                                Wallet Balance
                              </span>
                              <Wallet2 className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                              {walletBalance ?? "Loading..."}
                            </div>
                          </motion.div>

                          <div>
                            <h3 className="font-medium mb-4 flex items-center justify-center text-lg">
                              <Activity className="h-5 w-5 mr-2 text-purple-400" />
                              Recent Transactions
                            </h3>
                            {recentTransactions.length === 0 ? (
                              <p className="text-base text-white/50 text-center py-10 border border-white/10 rounded-xl">
                                No transactions yet.
                              </p>
                            ) : (
                              <div className="space-y-3">
                                {recentTransactions
                                  .slice(0, 3)
                                  .map((tx, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="p-4 bg-white/5 rounded-xl border border-white/10 text-base text-center"
                                    >
                                      {tx}
                                    </motion.div>
                                  ))}
                              </div>
                            )}
                          </div>

                          <Button
                            onClick={() => {
                              const amount = (Math.random() * 2).toFixed(3);
                              const newTx = `Mock transaction: Sent ${amount} ETH at ${new Date().toLocaleTimeString()}`;
                              setRecentTransactions((prev) => [newTx, ...prev]);
                              showToast(
                                `✅ Sent ${amount} ETH successfully!`,
                                "success"
                              );
                            }}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 h-14 text-lg rounded-xl"
                          >
                            <Zap className="h-6 w-6 mr-2" />
                            Send Test Transaction
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sign up link - Centered with routing */}
                  <div className="text-center text-white/60 pt-6 text-lg">
                    Don't have an account?{" "}
                    <button
                      onClick={handleSignupClick}
                      className="text-blue-400 hover:text-blue-300 font-medium underline"
                    >
                      Sign up here
                    </button>
                  </div>
                </CardContent>
              </Card>
            </GlassmorphismCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
