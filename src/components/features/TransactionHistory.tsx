import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowDownRight, ArrowUpRight, Clock, Search } from "lucide-react";
import { Input } from "../ui/input";

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: string;
  token: string;
  address: string;
  timestamp: Date;
  status: "completed" | "pending" | "failed";
}

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: "0x1a2b3c",
      type: "send",
      amount: "1.5",
      token: "ETH",
      address: "0x1234...5678",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: "completed",
    },
    {
      id: "0x4d5e6f",
      type: "receive",
      amount: "50",
      token: "USDT",
      address: "0xabcd...efgh",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "completed",
    },
    {
      id: "0x7g8h9i",
      type: "send",
      amount: "0.25",
      token: "ETH",
      address: "0x9876...5432",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "pending",
    },
  ];

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by address or token..."
              className="pl-10 bg-background border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No transactions found
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        tx.type === "send"
                          ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                          : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {tx.type === "send" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {tx.type === "send" ? "Sent" : "Received"} {tx.token}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-mono ${
                        tx.type === "send"
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {tx.type === "send" ? "-" : "+"}
                      {tx.amount} {tx.token}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      {tx.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
