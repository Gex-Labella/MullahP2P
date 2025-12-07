import { motion } from "framer-motion";
import { Shield, Clock, Lock, Key } from "lucide-react";
import { GlassmorphismCard } from "../GlassmorphismCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  highSecurityMode: boolean;
  setHighSecurityMode: (v: boolean) => void;
  sessionTimeout: string;
  setSessionTimeout: (v: string) => void;
}

export default function SecuritySettings({
  highSecurityMode,
  setHighSecurityMode,
  sessionTimeout,
  setSessionTimeout,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <GlassmorphismCard>
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="border-b border-white/10 p-8">
            <CardTitle className="flex items-center gap-4 text-white text-2xl">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
              Security & Privacy Settings
            </CardTitle>
            <CardDescription className="text-white/70 text-lg mt-2">
              Configure security preferences and session management for your
              wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* High Security Mode */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                  <Lock className="h-7 w-7 text-emerald-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-xl mb-1">
                    High Security Mode
                  </div>
                  <div className="text-white/60 text-base">
                    Enables multi-factor authentication and additional
                    verification steps for all transactions
                  </div>
                </div>
              </div>
              <div className="scale-125">
                <Switch
                  checked={highSecurityMode}
                  onCheckedChange={setHighSecurityMode}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-emerald-500"
                />
              </div>
            </motion.div>

            {/* Session Timeout */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <Clock className="h-7 w-7 text-cyan-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-xl mb-1">
                    Auto Session Timeout
                  </div>
                  <div className="text-white/60 text-base">
                    Automatically log out after a period of inactivity to
                    protect your account
                  </div>
                </div>
              </div>
              <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                <SelectTrigger className="w-56 h-12 bg-white/10 text-white border-white/20 hover:bg-white/15 transition-colors text-lg">
                  <SelectValue placeholder="Select timeout duration" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 backdrop-blur-xl">
                  <SelectItem
                    value="15"
                    className="text-white hover:bg-white/10 text-lg py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Key className="h-4 w-4 text-orange-400" />
                      15 Minutes (High Security)
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="30"
                    className="text-white hover:bg-white/10 text-lg py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Key className="h-4 w-4 text-yellow-400" />
                      30 Minutes (Recommended)
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="60"
                    className="text-white hover:bg-white/10 text-lg py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Key className="h-4 w-4 text-green-400" />1 Hour
                      (Standard)
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="120"
                    className="text-white hover:bg-white/10 text-lg py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Key className="h-4 w-4 text-blue-400" />2 Hours
                      (Extended)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Security Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`p-6 rounded-2xl border-2 ${
                highSecurityMode
                  ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30"
                  : "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <Shield
                  className={`h-6 w-6 ${
                    highSecurityMode ? "text-green-400" : "text-yellow-400"
                  }`}
                />
                <div>
                  <div
                    className={`font-semibold text-lg ${
                      highSecurityMode ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    Security Level: {highSecurityMode ? "Maximum" : "Standard"}
                  </div>
                  <div className="text-white/70">
                    {highSecurityMode
                      ? "Your account is protected with the highest security measures"
                      : "Consider enabling high security mode for enhanced protection"}
                  </div>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </GlassmorphismCard>
    </motion.div>
  );
}
