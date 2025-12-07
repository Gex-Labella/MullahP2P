import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import confetti from "canvas-confetti";
import Lottie from "lottie-react";
import { Ethereum3D } from "../components/Ethereum3D";
import successAnimation from "../animations/success.json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RefreshCw, Send, Clock, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function P2PTransfer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !recipient) {
      toast.error("Please enter both amount and recipient address");
      return;
    }

    setIsSending(true);

    try {
      // In a real app, this would use your TokenService
      await new Promise((resolve) => setTimeout(resolve, 2000));

      handleSuccessfulTransfer();
      toast.success("Transfer initiated successfully!", {
        description: `${amount} ${selectedToken} is on its way to ${recipient.slice(
          0,
          6
        )}...${recipient.slice(-4)}`,
      });
      setAmount("");
      setRecipient("");
    } catch (error) {
      toast.error("Transfer failed. Please try again.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSuccessfulTransfer = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Trigger Lottie animation
    setShowSuccessAnim(true);
    setTimeout(() => setShowSuccessAnim(false), 3000); // hide after 3s
  };

  return (
    <Card className="border border-blue-500/20 shadow-lg shadow-blue-500/5">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-blue-500/5 to-emerald-500/5">
        <div className="flex items-center gap-2">
          <Ethereum3D size={25} />
          <CardTitle>P2P Transfer</CardTitle>
        </div>
        <CardDescription>
          Send tokens to another address securely
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {showSuccessAnim && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-4"
          >
            <Lottie
              animationData={successAnimation}
              style={{ height: 120 }}
              loop={false}
            />
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="token"
              className="text-foreground font-medium flex items-center"
            >
              Select Token
            </Label>
            <div className="relative">
              <select
                id="token"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm appearance-none pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
              >
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
                <option value="DAI">DAI</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-foreground font-medium flex items-center"
            >
              Amount
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                min="0"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-3 pr-16"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium bg-blue-500/10 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                {selectedToken}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="recipient"
              className="text-foreground font-medium flex items-center"
            >
              Recipient Address
            </Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSending}
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-emerald-500/30 group"
            >
              {isSending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  Send Transfer
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 border-t border-border/40 pt-4">
          <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Recent Transfers</span>
          </p>
          <div className="text-center py-6 text-sm text-muted-foreground bg-muted/30 rounded-md border border-dashed border-border/40">
            <Send className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            No recent transfers found
            <p className="text-xs mt-1">
              Your transfer history will appear here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
