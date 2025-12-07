import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Wallet,
  CopyCheck,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      // In a real app, this would use your StarknetContext
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock wallet connection
      setWalletAddress("0x1234567890abcdef1234567890abcdef12345678");
      setIsConnected(true);
      toast.success("Wallet connected successfully", {
        description: "You can now make transfers and view your balance.",
      });
    } catch (err) {
      toast.error("Failed to connect wallet", {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    toast.info("Wallet disconnected");
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.info("Address copied to clipboard");
    }
  };

  return (
    <Card className="border border-blue-500/20 shadow-lg shadow-blue-500/5">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-blue-500/5 to-emerald-500/5">
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-blue-500" />
          Wallet Connection
        </CardTitle>
        <CardDescription>
          Connect your wallet to use the application
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        {!isConnected ? (
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-emerald-500/30 group"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Connect Wallet
              </>
            )}
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md border border-border hover:bg-muted/80 transition-colors">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 mr-3 animate-pulse"></div>
                <div className="truncate max-w-[200px] font-mono">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-blue-500/10 transition-colors"
                  onClick={copyAddress}
                  title="Copy address"
                >
                  <CopyCheck className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-blue-500/10 transition-colors"
                  title="View on explorer"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm bg-green-500/10 p-2 rounded-md border border-green-500/20">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">
                Connected
              </span>
            </div>

            <div className="bg-blue-500/5 rounded-md p-3 border border-blue-500/20">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Balance</span>
                <span className="font-mono font-bold">5.234 ETH</span>
              </div>
              <div className="text-xs text-muted-foreground">
                ≈ $13,245.67 USD
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={disconnectWallet}
              className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors"
            >
              Disconnect
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
