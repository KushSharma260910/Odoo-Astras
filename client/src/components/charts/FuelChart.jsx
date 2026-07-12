import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const DEFAULT_DATA = [
  { month: 'Jan', consumption: 4200, cost: 12600 },
  { month: 'Feb', consumption: 3800, cost: 11400 },
  { month: 'Mar', consumption: 4600, cost: 13800 },
  { month: 'Apr', consumption: 5100, cost: 15300 },
  { month: 'May', consumption: 4900, cost: 14700 },
  { month: 'Jun', consumption: 5500, cost: 16500 },
];

function FuelChart({ data = DEFAULT_DATA }) {
  // Custom glassmorphic tooltip style
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-750 rounded-xl shadow-xl text-left text-xs text-white">
          <p className="font-bold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-medium mt-0.5">
              {entry.name}: {entry.name.includes('Cost') ? `$${entry.value.toLocaleString()}` : `${entry.value.toLocaleString()} gal`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col text-left mb-4">
        <h4 className="text-sm font-bold text-slate-850 dark:text-slate-100">Fuel Consumption Trend</h4>
        <p className="text-xs text-slate-400">Monthly gallons consumed and fuel expenses</p>
      </div>
      
      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/60" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#94A3B8" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              name="Gallons Used"
              dataKey="consumption"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorConsumption)"
            />
            <Area
              type="monotone"
              name="Total Cost ($)"
              dataKey="cost"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCost)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FuelChart;
