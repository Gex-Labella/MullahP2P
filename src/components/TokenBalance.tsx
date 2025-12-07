import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DollarSign, TrendingUp } from "lucide-react";

interface TokenBalance {
  symbol: string;
  balance: string;
  value: string;
  change: number;
}

export function TokenBalance() {
  // Mock data
  const balances: TokenBalance[] = [
    {
      symbol: "ETH",
      balance: "2.45",
      value: "$6,123.45",
      change: 2.5,
    },
    {
      symbol: "USDC",
      balance: "1,250.00",
      value: "$1,250.00",
      change: 0.1,
    },
    {
      symbol: "MUL",
      balance: "500.00",
      value: "$250.00",
      change: 5.2,
    },
  ];

  return (
    <Card className="border border-blue-500/20 shadow-lg shadow-blue-500/5">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-blue-500/5 to-emerald-500/5">
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-500" />
          Token Balances
        </CardTitle>
        <CardDescription>Your current token holdings</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {balances.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                  {token.symbol}
                </div>
                <div>
                  <div className="font-medium">{token.balance}</div>
                  <div className="text-sm text-muted-foreground">
                    {token.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{token.value}</div>
                <div
                  className={`text-xs flex items-center gap-1 ${
                    token.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <TrendingUp
                    className={`h-3 w-3 ${
                      token.change < 0 ? "transform rotate-180" : ""
                    }`}
                  />
                  {token.change >= 0 ? "+" : ""}
                  {token.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
