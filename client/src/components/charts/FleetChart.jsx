import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DEFAULT_DATA = [
  { name: 'Available', value: 24, color: '#10B981' },
  { name: 'On Trip', value: 18, color: '#3B82F6' },
  { name: 'Under Maintenance', value: 5, color: '#F59E0B' },
  { name: 'Out of Service', value: 3, color: '#EF4444' }
];

function FleetChart({ data = DEFAULT_DATA }) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      const percentage = ((entry.value / total) * 100).toFixed(1);
      return (
        <div className="p-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-750 rounded-xl shadow-xl text-left text-xs text-white">
          <p className="font-bold flex items-center">
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.payload.color }}></span>
            {entry.name}
          </p>
          <p className="mt-1 font-semibold text-slate-350">
            Vehicles: <span className="text-white font-extrabold">{entry.value}</span> ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col text-left">
        <h4 className="text-sm font-bold text-slate-850 dark:text-slate-100">Fleet Status Composition</h4>
        <p className="text-xs text-slate-400">Current allocation of all fleet vehicles</p>
      </div>

      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text inside Donut */}
        <div className="absolute top-[40%] -translate-y-1/2 flex flex-col items-center pointer-events-none select-none">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
            {total}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            Total Fleet
          </span>
        </div>
      </div>
    </div>
  );
}

export default FleetChart;
