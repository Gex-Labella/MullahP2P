import { motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { GlassmorphismCard } from "../GlassmorphismCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

const networks = [
  {
    id: "ethereum",
    name: "Ethereum Mainnet",
    color: "bg-blue-500",
    status: "active",
    fees: "Medium",
  },
  {
    id: "starknet",
    name: "Starknet Mainnet",
    color: "bg-purple-500",
    status: "active",
    fees: "Low",
  },
  {
    id: "polygon",
    name: "Polygon",
    color: "bg-indigo-500",
    status: "coming-soon",
    fees: "Very Low",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    color: "bg-cyan-500",
    status: "coming-soon",
    fees: "Low",
  },
];

interface Props {
  selectedNetwork: string;
  setSelectedNetwork: (v: string) => void;
}

export default function NetworkPreferences({
  selectedNetwork,
  setSelectedNetwork,
}: Props) {
  return (
    <GlassmorphismCard>
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe className="h-5 w-5 text-blue-400" />
            Network Preferences
          </CardTitle>
          <CardDescription className="text-white/70">
            Configure your default blockchain networks
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {networks.map((network, i) => (
            <motion.label
              key={network.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                selectedNetwork === network.id
                  ? "bg-white/10 border-white/30"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <input
                type="radio"
                value={network.id}
                checked={selectedNetwork === network.id}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="sr-only"
              />
              <div
                className={`h-4 w-4 rounded-full ${network.color} ${
                  selectedNetwork === network.id ? "animate-pulse" : ""
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-white">{network.name}</span>
                  <Badge
                    className={`text-xs ${
                      network.status === "active"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    } border backdrop-blur-sm`}
                  >
                    {network.status === "active" ? "Active" : "Coming Soon"}
                  </Badge>
                </div>
                <div className="text-sm text-white/60">
                  Transaction fees: {network.fees}
                </div>
              </div>
              {selectedNetwork === network.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center"
                >
                  <Check className="h-3 w-3 text-white" />
                </motion.div>
              )}
            </motion.label>
          ))}
        </CardContent>
      </Card>
    </GlassmorphismCard>
  );
}
