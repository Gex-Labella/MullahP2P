import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Clock,
  Map,
  BarChart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function P2PStatistics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <h1 className="text-2xl font-bold">P2P Statistics</h1>

      {/* Overview Cards - Updated with dashboard-grid styling */}
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card stat-card">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground stat-label">
                Total Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold stat-value">
                  145,892.34 ETH
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center stat-change change-positive">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12.5%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="card stat-card">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground stat-label">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold stat-value">24,561</div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center stat-change change-positive">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8.2%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="card stat-card">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground stat-label">
                Avg. Transaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold stat-value">3.42 ETH</div>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center stat-change change-negative">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  2.1%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="card stat-card">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground stat-label">
                Total Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold stat-value">42,678</div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center stat-change change-positive">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  15.3%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts - Updated with charts-row styling */}
      <div className="charts-row grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card chart-container">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Volume Trends
              </CardTitle>
              <CardDescription>
                Daily transaction volume over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="chart-placeholder h-full flex flex-col items-center justify-center">
                <BarChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-center text-muted-foreground">
                  Volume trends chart would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="card chart-container">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Activity
              </CardTitle>
              <CardDescription>
                Active users and new registrations
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="chart-placeholder h-full flex flex-col items-center justify-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-center text-muted-foreground">
                  User activity chart would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Top Currencies
            </CardTitle>
            <CardDescription>
              Most transferred tokens on platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["ETH", "USDT", "USDC", "DAI", "WBTC"].map((token, i) => (
                <div key={token} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full bg-blue-${
                        (i + 1) * 100
                      } flex items-center justify-center text-white font-bold`}
                    >
                      {i + 1}
                    </div>
                    <span>{token}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-mono">
                      {Math.floor(Math.random() * 10000).toLocaleString()}{" "}
                      transfers
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(Math.random() * 100).toFixed(2)}% of volume
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Peak Hours
            </CardTitle>
            <CardDescription>Transaction volume by hour</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <div className="chart-placeholder h-full flex flex-col items-center justify-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Peak hours chart would appear here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
            <CardDescription>User location heat map</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <div className="chart-placeholder h-full flex flex-col items-center justify-center">
              <Map className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-center text-muted-foreground">
                Geographic distribution map would appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
