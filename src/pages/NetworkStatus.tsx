import { motion } from "framer-motion";
import { NetworkStatusComponent } from "../components/NetworkStatus";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { TrendingUp, Cpu, Database, Clock, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export default function NetworkStatus() {
  // Network resources data
  const resources = [
    { name: "Memory Pool", usage: 68, status: "Healthy" },
    { name: "Block Utilization", usage: 42, status: "Good" },
    { name: "Node Response", usage: 92, status: "Excellent" },
    { name: "Transaction Queue", usage: 26, status: "Low" },
  ];

  // Recent blocks data generation
  const generateBlocks = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => ({
        number: 123456 - index,
        time: new Date(Date.now() - index * 60000).toLocaleTimeString(),
        transactions: 42 - Math.floor(Math.random() * 10),
        size: Math.floor(Math.random() * 100) + 150,
        validator: `0x${Math.random().toString(16).substring(2, 10)}`,
      }));
  };

  const blocks = generateBlocks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* The NetworkStatusComponent is now enhanced with the new visualizations */}
        <NetworkStatusComponent />

        {/* Gas Trends Card */}
        <Card className="border border-border/40 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border-b border-border/40">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Gas Trends
            </CardTitle>
            <CardDescription>
              Gas price trends over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center pt-6">
            <div className="chart-placeholder">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              Gas price chart would appear here
            </div>
          </CardContent>
        </Card>

        {/* Network Resources Card */}
        <Card className="border border-border/40 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border-b border-border/40">
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Network Resources
            </CardTitle>
            <CardDescription>
              Current network resource utilization
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.name}>
                    <TableCell className="font-medium">
                      {resource.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                            style={{ width: `${resource.usage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{resource.usage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        {resource.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Blocks Table */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border border-border/40 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border-b border-border/40">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Recent Blocks
            </CardTitle>
            <CardDescription>
              Latest blocks confirmed on the network
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Block #</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Validator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blocks.map((block) => (
                  <TableRow key={block.number}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 flex items-center justify-center text-xs">
                          <Database className="h-3 w-3" />
                        </div>
                        #{block.number}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {block.time}
                      </div>
                    </TableCell>
                    <TableCell>{block.transactions}</TableCell>
                    <TableCell>{block.size} KB</TableCell>
                    <TableCell className="font-mono text-xs">
                      {block.validator}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
