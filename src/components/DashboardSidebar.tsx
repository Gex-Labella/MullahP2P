import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Home,
  BarChart3,
  Settings,
  Activity,
  User,
  LogOut,
  Menu,
  X,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Sparkles,
  Zap,
  Shield,
  Wallet,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface DashboardSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function DashboardSidebar({
  currentPage,
  onNavigate,
  onLogout,
}: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "statistics",
      label: "P2P Statistics",
      icon: BarChart3,
      color: "text-emerald-400",
      bgColor: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-500/30",
    },
    {
      id: "network",
      label: "Network Status",
      icon: Activity,
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
    },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="h-full bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900 backdrop-blur-xl border-r border-white/10">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                    className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 784 784"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M392 784C608.569 784 784 608.569 784 392C784 175.431 608.569 0 392 0C175.431 0 0 175.431 0 392C0 608.569 175.431 784 392 784Z"
                        fill="currentColor"
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
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                      P2P Mullah
                    </h1>
                    <p className="text-white/60 text-sm">Dashboard</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              {isCollapsed ? (
                <Menu className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <Button
                variant="ghost"
                onClick={() => onNavigate(item.id)}
                className={`w-full justify-start h-12 transition-all duration-300 group ${
                  currentPage === item.id
                    ? `bg-gradient-to-r ${item.bgColor} border ${item.borderColor} text-white`
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    currentPage === item.id
                      ? item.color
                      : "text-white/60 group-hover:text-white"
                  } transition-colors`}
                />

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-3 truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {currentPage === item.id && !isCollapsed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Status Indicators */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-4 mt-8 space-y-3"
            >
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Wallet className="h-4 w-4 text-emerald-400" />
                  <span className="text-white/80 text-sm">Wallet Status</span>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 border">
                  Connected
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <span className="text-white/70">Network</span>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-purple-400" />
                    <span className="text-white/70">Security</span>
                  </div>
                  <span className="text-emerald-400 text-xs">High</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile & Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center"
              >
                <User className="h-5 w-5 text-white" />
              </motion.div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-white text-sm font-medium truncate">
                      John Doe
                    </p>
                    <p className="text-white/60 text-xs truncate">
                      john@example.com
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-white/60 hover:text-red-400 hover:bg-red-500/10 p-2"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
