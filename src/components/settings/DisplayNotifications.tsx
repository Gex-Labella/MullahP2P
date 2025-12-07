import { motion } from "framer-motion";
import { Bell, Moon, Volume2, RefreshCw } from "lucide-react";
import { GlassmorphismCard } from "../GlassmorphismCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Switch } from "../ui/switch";

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;
  autoRefresh: boolean;
  setAutoRefresh: (v: boolean) => void;
}

export default function DisplayNotifications({
  isDarkMode,
  setIsDarkMode,
  soundEnabled,
  setSoundEnabled,
  notificationsEnabled,
  setNotificationsEnabled,
  autoRefresh,
  setAutoRefresh,
}: Props) {
  const items = [
    {
      id: "dark",
      title: "Dark Mode",
      desc: "Switch between light and dark themes",
      icon: <Moon className="h-5 w-5 text-blue-400" />,
      value: isDarkMode,
      toggle: setIsDarkMode,
    },
    {
      id: "sound",
      title: "Sound Effects",
      desc: "Enable or disable sound notifications",
      icon: <Volume2 className="h-5 w-5 text-emerald-400" />,
      value: soundEnabled,
      toggle: setSoundEnabled,
    },
    {
      id: "notifications",
      title: "Push Notifications",
      desc: "Receive real-time alerts",
      icon: <Bell className="h-5 w-5 text-yellow-400" />,
      value: notificationsEnabled,
      toggle: setNotificationsEnabled,
    },
    {
      id: "refresh",
      title: "Auto Refresh",
      desc: "Keep balances & data up-to-date",
      icon: <RefreshCw className="h-5 w-5 text-cyan-400" />,
      value: autoRefresh,
      toggle: setAutoRefresh,
    },
  ];

  return (
    <GlassmorphismCard>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Bell className="h-5 w-5 text-blue-400" />
            Display & Notifications
          </CardTitle>
          <CardDescription className="text-white/70">
            Manage UI preferences and notifications
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <div className="font-medium text-white">{item.title}</div>
                  <div className="text-sm text-white/60">{item.desc}</div>
                </div>
              </div>
              <Switch
                checked={item.value}
                onCheckedChange={item.toggle}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-emerald-500"
              />
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </GlassmorphismCard>
  );
}
