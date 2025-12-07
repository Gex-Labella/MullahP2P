import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Activity,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface NetworkData {
  name: string;
  status: "operational" | "issues" | "outage";
  latency: string;
  lastBlock: number;
  blockTime: string;
  nodes: number;
  activeNodes: number;
  color: string;
}

export function NetworkStatusComponent() {
  const [networks, setNetworks] = useState<NetworkData[]>([
    {
      name: "Ethereum",
      status: "operational",
      latency: "45ms",
      lastBlock: 18345234,
      blockTime: "12s",
      nodes: 5000,
      activeNodes: 4850,
      color: "blue",
    },
    {
      name: "Starknet",
      status: "operational",
      latency: "120ms",
      lastBlock: 985321,
      blockTime: "30s",
      nodes: 1500,
      activeNodes: 1432,
      color: "purple",
    },
    {
      name: "Optimism",
      status: "issues",
      latency: "350ms",
      lastBlock: 112344456,
      blockTime: "2s",
      nodes: 800,
      activeNodes: 720,
      color: "red",
    },
    {
      name: "Arbitrum",
      status: "operational",
      latency: "150ms",
      lastBlock: 181234123,
      blockTime: "0.5s",
      nodes: 1200,
      activeNodes: 1150,
      color: "emerald",
    },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworks((prev) =>
        prev.map((network) => ({
          ...network,
          lastBlock:
            network.status === "operational"
              ? network.lastBlock + 1
              : network.lastBlock,
          latency: `${
            Math.floor(Math.random() * 50) +
            (network.status === "issues" ? 300 : 40)
          }ms`,
          activeNodes: Math.min(
            network.nodes,
            network.activeNodes + Math.floor(Math.random() * 5) - 2
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-1 border border-blue-500/20 shadow-lg shadow-blue-500/5">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-blue-500/5 to-emerald-500/5">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Network Status
          </span>
        </CardTitle>
        <CardDescription>Live status of supported networks</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {networks.map((network) => (
            <NetworkRow key={network.name} network={network} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function NetworkRow({ network }: { network: NetworkData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="hover:bg-muted/50 transition-colors">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <StatusIndicator status={network.status} color={network.color} />
          <span className="font-medium">{network.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              network.status === "operational"
                ? "secondary"
                : network.status === "issues"
                ? "outline"
                : "destructive"
            }
            className={
              network.status === "operational"
                ? `bg-${network.color}-500/10 text-${network.color}-700 dark:text-${network.color}-300 border border-${network.color}-500/30`
                : ""
            }
          >
            {network.status === "operational" ? (
              <CheckCircle2 className="h-3 w-3 mr-1" />
            ) : network.status === "issues" ? (
              <AlertTriangle className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {network.status}
          </Badge>
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 pb-4 bg-muted/30"
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-background/50 p-3 rounded-md border border-border">
              <div className="text-muted-foreground mb-1">Last Block</div>
              <div className="font-mono font-medium">
                # {network.lastBlock.toLocaleString()}
              </div>
            </div>

            <div className="bg-background/50 p-3 rounded-md border border-border">
              <div className="text-muted-foreground mb-1">Latency</div>
              <div className="font-mono font-medium flex items-center">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    parseInt(network.latency) < 100
                      ? "bg-green-500"
                      : parseInt(network.latency) < 200
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                {network.latency}
              </div>
            </div>

            <div className="bg-background/50 p-3 rounded-md border border-border">
              <div className="text-muted-foreground mb-1">Block Time</div>
              <div className="font-mono font-medium">{network.blockTime}</div>
            </div>

            <div className="bg-background/50 p-3 rounded-md border border-border">
              <div className="text-muted-foreground mb-1">Active Nodes</div>
              <div className="font-mono font-medium">
                {network.activeNodes} / {network.nodes}
              </div>
              <div className="w-full h-1.5 bg-muted mt-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${network.color}-500 transition-all duration-500`}
                  style={{
                    width: `${(network.activeNodes / network.nodes) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StatusIndicator({ status, color }: { status: string; color: string }) {
  const pulseAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const, // Add type assertion
    },
  };

  if (status === "operational") {
    return (
      <motion.div
        className={`h-3 w-3 rounded-full bg-${color}-500`}
        animate={pulseAnimation}
      ></motion.div>
    );
  }
  if (status === "issues") {
    return (
      <motion.div
        className="h-3 w-3 rounded-full bg-yellow-500"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        }}
      ></motion.div>
    );
  }
  return <div className="h-3 w-3 rounded-full bg-red-500"></div>;
}
