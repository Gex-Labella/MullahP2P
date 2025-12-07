import { motion } from "framer-motion";
import { Wrench, Code, Zap, Terminal, Settings, Database } from "lucide-react";
import { GlassmorphismCard } from "../GlassmorphismCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

interface Props {
  showAdvanced: boolean;
  setShowAdvanced: (v: boolean) => void;
}

export default function AdvancedSettings({
  showAdvanced,
  setShowAdvanced,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <GlassmorphismCard>
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="border-b border-white/10 p-8">
            <CardTitle className="flex items-center gap-4 text-white text-2xl">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Wrench className="h-8 w-8 text-purple-400" />
              </div>
              Advanced Developer Settings
            </CardTitle>
            <CardDescription className="text-white/70 text-lg mt-2">
              Enable experimental features and developer tools for power users
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Main Advanced Toggle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <Code className="h-7 w-7 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-xl mb-1">
                    Enable Advanced Tools
                  </div>
                  <div className="text-white/60 text-base">
                    Unlock developer options, debugging tools, and experimental
                    features
                  </div>
                </div>
              </div>
              <div className="scale-125">
                <Switch
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-emerald-500"
                />
              </div>
            </motion.div>

            {/* Advanced Features Panel */}
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-6 pt-6 border-t border-white/20"
              >
                <div className="flex items-center gap-3 text-emerald-400 text-lg font-semibold">
                  <Zap className="h-6 w-6" />
                  Advanced Features Enabled
                </div>

                {/* Developer Tools Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Terminal className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-semibold text-white text-lg">
                          Debug Console
                        </div>
                        <div className="text-white/60">Real-time logging</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                    >
                      Open Console
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Database className="h-8 w-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-semibold text-white text-lg">
                          API Explorer
                        </div>
                        <div className="text-white/60">
                          Direct blockchain access
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                    >
                      Launch Explorer
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Settings className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-semibold text-white text-lg">
                          Network Config
                        </div>
                        <div className="text-white/60">
                          Custom RPC endpoints
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
                    >
                      Configure
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Zap className="h-8 w-8 text-orange-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-semibold text-white text-lg">
                          Experimental
                        </div>
                        <div className="text-white/60">Beta features</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                    >
                      Enable Beta
                    </Button>
                  </motion.div>
                </div>

                {/* Warning Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                  <div className="text-red-400 text-sm">
                    <strong>Warning:</strong> Advanced features may affect app
                    stability. Use at your own discretion.
                  </div>
                </motion.div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </GlassmorphismCard>
    </motion.div>
  );
}
