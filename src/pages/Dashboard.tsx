
import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { PieChart } from '@/components/charts/PieChart';

// Sample data
const monthlyData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 13 },
  { name: 'Apr', value: 25 },
  { name: 'May', value: 18 },
  { name: 'Jun', value: 30 },
  { name: 'Jul', value: 28 },
  { name: 'Aug', value: 35 },
  { name: 'Sep', value: 29 },
  { name: 'Oct', value: 33 },
  { name: 'Nov', value: 42 },
  { name: 'Dec', value: 38 },
];

const claimTypeData = [
  { name: 'Medical', value: 35 },
  { name: 'Auto', value: 25 },
  { name: 'Property', value: 20 },
  { name: 'Life', value: 15 },
  { name: 'Other', value: 5 },
];

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 3200 },
  { name: 'Sep', value: 2800 },
  { name: 'Oct', value: 4300 },
  { name: 'Nov', value: 4800 },
  { name: 'Dec', value: 5100 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your financial analytics dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Claims" value="4,321" change={12} />
        <StatCard title="Active Claims" value="867" change={-3} />
        <StatCard title="Total Revenue" value="$2.4M" change={8} />
        <StatCard title="Avg. Processing Time" value="3.2 days" change={-15} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Monthly Claims">
          <BarChart data={monthlyData} dataKey="name" barKey="value" />
        </ChartCard>
        <ChartCard title="Revenue Trend">
          <LineChart data={revenueData} dataKey="name" lineKey="value" />
        </ChartCard>
        <ChartCard title="Claims by Type">
          <PieChart data={claimTypeData} dataKey="value" nameKey="name" />
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Top Performing Employees">
          <div className="space-y-4 max-h-80 overflow-auto pr-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-fin-light-blue flex items-center justify-center text-white font-medium">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <p className="font-medium">{`Employee ${String.fromCharCode(65 + i)}`}</p>
                    <p className="text-sm text-gray-500">Claims processed: {100 - i * 10}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(8000 - i * 500).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Total value</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Recent Activities">
          <div className="space-y-4 max-h-80 overflow-auto pr-2">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium">Claim #{10045 + i} {i % 3 === 0 ? 'approved' : i % 3 === 1 ? 'pending' : 'rejected'}</p>
                  <p className="text-sm text-gray-500">{i % 3 === 0 ? '2 hours ago' : i % 3 === 1 ? '5 hours ago' : '1 day ago'}</p>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded ${
                  i % 3 === 0
                    ? "bg-green-100 text-green-700"
                    : i % 3 === 1
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected"}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;
