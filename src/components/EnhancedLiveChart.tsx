import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface DataPoint {
  time: string;
  value: number;
}

export function EnhancedLiveChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize with some data points
    const initialData: DataPoint[] = [];
    const now = Date.now();
    for (let i = 0; i < 20; i++) {
      initialData.push({
        time: new Date(now - (19 - i) * 60000).toLocaleTimeString(),
        value: Math.random() * 100 + 50,
      });
    }
    setData(initialData);

    // Add new data points periodically
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint: DataPoint = {
          time: new Date().toLocaleTimeString(),
          value: Math.random() * 100 + 50,
        };
        const newData = [...prev.slice(1), newPoint];

        // Determine trend
        if (newData.length >= 2) {
          const current = newData[newData.length - 1].value;
          const previous = newData[newData.length - 2].value;
          setTrend(
            current > previous ? "up" : current < previous ? "down" : "neutral"
          );
        }

        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(
      0,
      trend === "up"
        ? "rgba(16, 185, 129, 0.8)"
        : trend === "down"
        ? "rgba(239, 68, 68, 0.8)"
        : "rgba(59, 130, 246, 0.8)"
    );
    gradient.addColorStop(
      1,
      trend === "up"
        ? "rgba(16, 185, 129, 0.1)"
        : trend === "down"
        ? "rgba(239, 68, 68, 0.1)"
        : "rgba(59, 130, 246, 0.1)"
    );

    // Draw area chart
    const points = data.map((point, index) => ({
      x: (index / (data.length - 1)) * width,
      y: height - (point.value / 150) * height,
    }));

    ctx.beginPath();
    ctx.moveTo(0, height);
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.lineTo(point.x, point.y);
      } else {
        const prevPoint = points[index - 1];
        const cpx = (prevPoint.x + point.x) / 2;
        ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
      }
    });
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        const prevPoint = points[index - 1];
        const cpx = (prevPoint.x + point.x) / 2;
        ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
      }
    });
    ctx.strokeStyle =
      trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#3b82f6";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw points
    points.forEach((point, index) => {
      if (index === points.length - 1) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fillStyle =
          trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#3b82f6";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
    });
  }, [data, trend]);

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = (
    ((currentValue - previousValue) / previousValue) *
    100
  ).toFixed(1);

  return (
    <div className="relative h-64 w-full">
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          animate={{
            scale: trend !== "neutral" ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          {trend === "up" ? (
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          ) : trend === "down" ? (
            <TrendingDown className="h-5 w-5 text-red-400" />
          ) : (
            <Activity className="h-5 w-5 text-blue-400" />
          )}
          <span
            className={`text-sm font-medium ${
              trend === "up"
                ? "text-emerald-400"
                : trend === "down"
                ? "text-red-400"
                : "text-blue-400"
            }`}
          >
            {change > "0" ? "+" : ""}
            {change}%
          </span>
        </motion.div>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={256}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />

      <motion.div
        className="absolute bottom-4 right-4 text-right"
        animate={{
          color:
            trend === "up"
              ? "#10b981"
              : trend === "down"
              ? "#ef4444"
              : "#3b82f6",
        }}
      >
        <div className="text-2xl font-bold">{currentValue.toFixed(2)}</div>
        <div className="text-sm opacity-70">Current Value</div>
      </motion.div>
    </div>
  );
}
