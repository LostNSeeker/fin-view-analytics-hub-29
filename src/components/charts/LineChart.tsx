
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: any[];
  dataKey: string;
  lineKey: string;
  lineColor?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  lineKey,
  lineColor = "#3949ab",
  height = 300,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid stroke="#f5f5f5" vertical={false} />
        <XAxis
          dataKey={dataKey}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          dy={10}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '10px',
          }}
        />
        <Line
          type="monotone"
          dataKey={lineKey}
          stroke={lineColor}
          strokeWidth={2}
          dot={{ stroke: lineColor, strokeWidth: 2, r: 4, fill: '#fff' }}
          activeDot={{ r: 6, stroke: lineColor, strokeWidth: 2, fill: '#fff' }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
