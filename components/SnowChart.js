'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#7c3aed', '#ea580c'];

export default function SnowChart({ data, cities }) {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={520}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 5, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval={4}
            tickFormatter={(value) => value.slice(5)}
          />
          <YAxis
            label={{ value: 'Snow depth (cm)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          {cities.map((city, i) => (
            <Line
              key={city}
              type="monotone"
              dataKey={city}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
