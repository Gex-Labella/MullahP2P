import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../store/hooks";

const DummyChart: React.FC = () => {
  const { data, activeIndex } = useAppSelector((state) => state.chart);

  return (
    <div className="w-full h-64 p-4 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-semibold mb-2">Sample Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2 text-sm text-gray-500">
        Active index: <strong>{activeIndex}</strong>
      </p>
    </div>
  );
};

export default DummyChart;
