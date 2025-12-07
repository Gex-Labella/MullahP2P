/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useStarknet } from "../contexts";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, PieChart as PieChartIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ArrowUp,
  ArrowDown,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRightLeft,
  Clock,
  PieChart,
  Wallet,
  Shield,
  RefreshCw,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

export default function Dashboard() {
  const {
    account,
    connectWallet,
    disconnectWallet,
    isConnected,
    isConnecting,
    error,
    chainId,
  } = useStarknet();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Dummy distribution data
  const userDistribution = [
    { name: "Buyers", value: 400 },
    { name: "Sellers", value: 300 },
    { name: "Guests", value: 200 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  const transactionTrend = [
    { month: "Jan", volume: 240 },
    { month: "Feb", volume: 320 },
    { month: "Mar", volume: 180 },
    { month: "Apr", volume: 400 },
    { month: "May", volume: 350 },
  ];

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const refreshData = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="loading-screen fixed inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-50">
        <div className="w-16 h-16 mb-6 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
          P2P Mullah
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="header flex justify-between items-center mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-title text-2xl font-bold">Dashboard Overview</h1>
          {/* Ethereum indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Ethereum
            </span>
          </div>
        </div>
        <div className="header-actions flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle w-12 h-7 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full p-1 flex items-center relative"
          >
            <div
              className={`theme-toggle-handle w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 absolute transition-all duration-300 ${
                darkMode ? "left-[calc(100%-22px)]" : "left-1"
              }`}
            ></div>
            {darkMode ? (
              <Moon className="h-4 w-4 ml-1 text-white" />
            ) : (
              <Sun className="h-4 w-4 ml-auto mr-1 text-slate-600" />
            )}
          </button>

          {/* Refresh */}
          <Button
            onClick={refreshData}
            disabled={refreshing}
            size="sm"
            variant="outline"
            className="border-slate-200 dark:border-slate-700"
          >
            <motion.div
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={{
                duration: 1,
                repeat: refreshing ? Infinity : 0,
                ease: "linear",
              }}
              className="mr-2"
            >
              <RefreshCw className="h-4 w-4" />
            </motion.div>
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="card stat-card bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="stat-label text-slate-500 dark:text-slate-400 font-medium">
            Total Transactions
          </div>
          <div className="stat-value text-4xl font-bold my-2 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            1,248
          </div>
          <div className="stat-change flex items-center text-emerald-500">
            <ArrowUp className="h-3.5 w-3.5 mr-1" />
            <span className="text-sm">12.5% from last month</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="card stat-card bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="stat-label text-slate-500 dark:text-slate-400 font-medium">
            Active Users
          </div>
          <div className="stat-value text-4xl font-bold my-2 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            586
          </div>
          <div className="stat-change flex items-center text-emerald-500">
            <ArrowUp className="h-3.5 w-3.5 mr-1" />
            <span className="text-sm">8.3% from last week</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="card stat-card bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="stat-label text-slate-500 dark:text-slate-400 font-medium">
            Total Volume
          </div>
          <div className="stat-value text-4xl font-bold my-2 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            $248.5K
          </div>
          <div className="stat-change flex items-center text-emerald-500">
            <ArrowUp className="h-3.5 w-3.5 mr-1" />
            <span className="text-sm">5.7% from last month</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="charts-row grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions LineChart */}
        <Card className="lg:col-span-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Activity className="h-5 w-5 text-blue-500 mr-2" />
              Transaction Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                  />
                  <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1F2937" : "white",
                      border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                      borderRadius: "8px",
                      color: darkMode ? "#F9FAFB" : "#111827",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#3B82F6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Distribution PieChart */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <PieChartIcon className="h-5 w-5 text-blue-500 mr-2" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={userDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} ${((percent || 0) * 100).toFixed(0)}%`
                    }
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Recent Transactions & Wallet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold flex items-center">
                <ArrowRightLeft className="h-5 w-5 text-blue-500 mr-2" />
                Recent Transactions
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-400"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="transaction-item flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <div className="transaction-icon w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white mr-4">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>
                <div className="transaction-details flex-1">
                  <div className="transaction-title font-medium">
                    ETH to BTC Exchange
                  </div>
                  <div className="transaction-date text-sm text-slate-500 dark:text-slate-400">
                    Today, 10:24 AM
                  </div>
                </div>
                <div className="transaction-amount font-mono font-semibold text-emerald-500">
                  +0.254 BTC
                </div>
              </div>

              <div className="transaction-item flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <div className="transaction-icon w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white mr-4">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="transaction-details flex-1">
                  <div className="transaction-title font-medium">
                    USD Deposit
                  </div>
                  <div className="transaction-date text-sm text-slate-500 dark:text-slate-400">
                    Yesterday, 2:43 PM
                  </div>
                </div>
                <div className="transaction-amount font-mono font-semibold text-emerald-500">
                  +$500.00
                </div>
              </div>

              <div className="transaction-item flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                <div className="transaction-icon w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white mr-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="transaction-details flex-1">
                  <div className="transaction-title font-medium">
                    Marketplace Purchase
                  </div>
                  <div className="transaction-date text-sm text-slate-500 dark:text-slate-400">
                    Oct 23, 11:06 AM
                  </div>
                </div>
                <div className="transaction-amount font-mono font-semibold text-red-500">
                  -0.824 ETH
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Status Card */}
        <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-500" />
              Wallet Status
            </CardTitle>
            <CardDescription>
              {isConnected
                ? "Connected to StarkNet"
                : "Connect your StarkNet wallet"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {isConnected ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="h-4 w-4 text-emerald-500 mr-2" />
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                      Connected Account
                    </p>
                  </div>
                  <p className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all">
                    {account?.address}
                  </p>
                  {chainId && (
                    <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Chain ID:
                        </span>
                        <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
                          {chainId}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="w-full border-slate-200 dark:border-slate-700"
                >
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white"
              >
                {isConnecting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : null}
                {isConnecting ? "Connecting..." : "Connect StarkNet Wallet"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
