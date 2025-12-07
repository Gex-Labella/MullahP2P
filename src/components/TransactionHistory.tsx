import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: string;
  token: string;
  address: string;
  time: string;
  status: "pending" | "completed" | "failed";
}

export function TransactionHistory() {
  // Mock data
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "sent",
      amount: "0.5",
      token: "ETH",
      address: "0x742d35Cc...",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "received",
      amount: "1.2",
      token: "ETH",
      address: "0x12345678...",
      time: "5 hours ago",
      status: "completed",
    },
  ];

  return (
    <Card className="border border-blue-500/20 shadow-lg shadow-blue-500/5">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-blue-500/5 to-emerald-500/5">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Transaction History
        </CardTitle>
        <CardDescription>Your recent transactions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      tx.type === "sent"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {tx.type === "sent" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {tx.amount} {tx.token}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tx.address}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{tx.time}</div>
                  <div
                    className={`text-xs ${
                      tx.status === "completed"
                        ? "text-green-500"
                        : tx.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No transactions yet</p>
            <p className="text-sm mt-1">Your transactions will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
