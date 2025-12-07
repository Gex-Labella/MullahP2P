import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Save,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
}

export default function SettingsHeader({ onSave, onReset, saving }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center justify-between pb-8 border-b-2 border-white/10"
    >
      <div className="flex items-center gap-4">
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
          className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500"
        >
          <SettingsIcon className="h-10 w-10 text-white" />
        </motion.div>

        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
            Application Settings
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
            >
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </motion.div>
          </h1>
          <p className="text-xl text-white/70 mt-2">
            Customize your P2P Mullah experience
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-300 h-14 px-8 text-lg backdrop-blur-xl"
        >
          <RefreshCw className="h-5 w-5 mr-3" />
          Reset to Defaults
        </Button>

        <Button
          onClick={onSave}
          disabled={saving}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 h-14 px-8 text-lg shadow-2xl shadow-blue-500/25"
        >
          {saving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3"
            />
          ) : (
            <Save className="h-5 w-5 mr-3" />
          )}
          {saving ? "Saving Changes..." : "Save All Changes"}
        </Button>
      </div>
    </motion.div>
  );
}
