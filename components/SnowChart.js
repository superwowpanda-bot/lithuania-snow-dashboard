'use client';

import { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height="100%" minHeight={320}>
        <LineChart
          data={data}
          margin={isMobile ? { top: 12, right: 8, left: -16, bottom: 32 } : { top: 20, right: 20, left: 5, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: isMobile ? 11 : 12 }}
            interval={isMobile ? 8 : 4}
            angle={isMobile ? -35 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 52 : 30}
            tickFormatter={(value) => value.slice(5)}
          />
          <YAxis
            width={isMobile ? 36 : 50}
            label={isMobile ? undefined : { value: 'Snow depth (cm)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: isMobile ? 11 : 12 }}
          />
          <Tooltip />
          <Legend wrapperStyle={isMobile ? { fontSize: '12px', paddingTop: '6px' } : undefined} />
          {cities.map((city, i) => (
            <Line
              key={city}
              type="monotone"
              dataKey={city}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={isMobile ? 2.2 : 2}
              dot={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
