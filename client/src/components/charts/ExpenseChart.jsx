import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DEFAULT_DATA = [
  { month: 'Jan', Fuel: 12600, Maintenance: 4800, Payroll: 18000, Tolls: 2200 },
  { month: 'Feb', Fuel: 11400, Maintenance: 6200, Payroll: 18000, Tolls: 1900 },
  { month: 'Mar', Fuel: 13800, Maintenance: 3900, Payroll: 19500, Tolls: 2500 },
  { month: 'Apr', Fuel: 15300, Maintenance: 8100, Payroll: 21000, Tolls: 2800 },
  { month: 'May', Fuel: 14700, Maintenance: 5400, Payroll: 21000, Tolls: 2700 },
  { month: 'Jun', Fuel: 16500, Maintenance: 4500, Payroll: 22500, Tolls: 3100 },
];

function ExpenseChart({ data = DEFAULT_DATA }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((acc, curr) => acc + curr.value, 0);
      return (
        <div className="p-3 bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-750 rounded-xl shadow-xl text-left text-xs text-white">
          <p className="font-bold mb-1.5">{label} Expenses</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={index} className="flex justify-between gap-6">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: entry.color }}></span>
                  {entry.name}:
                </span>
                <span className="font-bold">${entry.value.toLocaleString()}</span>
              </p>
            ))}
            <p className="flex justify-between gap-6 pt-1.5 border-t border-slate-700 font-bold text-blue-400">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
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
        <h4 className="text-sm font-bold text-slate-850 dark:text-slate-100">Operating Cost Breakdown</h4>
        <p className="text-xs text-slate-400">Detailed expenditure across operation categories</p>
      </div>

      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
            <Bar dataKey="Fuel" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Maintenance" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Payroll" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Tolls" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseChart;
