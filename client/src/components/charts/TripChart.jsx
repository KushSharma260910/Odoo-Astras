import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DEFAULT_DATA = [
  { month: 'Jan', trips: 140, revenue: 54000 },
  { month: 'Feb', trips: 132, revenue: 49500 },
  { month: 'Mar', trips: 165, revenue: 61000 },
  { month: 'Apr', trips: 185, revenue: 72000 },
  { month: 'May', trips: 170, revenue: 68500 },
  { month: 'Jun', trips: 210, revenue: 84000 },
];

function TripChart({ data = DEFAULT_DATA }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-750 rounded-xl shadow-xl text-left text-xs text-white">
          <p className="font-bold mb-1.5">{label} Logistics Summary</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-6">
              <span className="flex items-center text-blue-450">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
                Trips Run:
              </span>
              <span className="font-bold">{payload[0].value} trips</span>
            </p>
            <p className="flex justify-between gap-6">
              <span className="flex items-center text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                Net Revenue:
              </span>
              <span className="font-bold">${payload[1].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col text-left mb-4">
        <h4 className="text-sm font-bold text-slate-850 dark:text-slate-100">Trips & Revenue Performance</h4>
        <p className="text-xs text-slate-400">Monthly trip completion metrics mapped against gross revenue</p>
      </div>

      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: -20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/60" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            {/* Left Y Axis for Trips volume */}
            <YAxis 
              yAxisId="left" 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            {/* Right Y Axis for Revenue dollars */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `$${val/1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
            />
            <Bar yAxisId="left" name="Trips Completed" dataKey="trips" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={28} />
            <Line yAxisId="right" name="Gross Revenue ($)" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TripChart;
