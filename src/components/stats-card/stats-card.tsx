import React from "react";

export interface StatsCardData {
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down";
  };
  data: Array<{ value: number }>;
}

export interface PageData {
  page: string;
  age: string;
  exits: string;
  pageViews: string;
  exitRate: string;
  avgDuration: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
}

// export function StatsCard({ title, value, change, data }: StatsCardData) {
//   return (
//     <Card className="p-4">
//       <div className="text-sm text-gray-600 mb-1">{title}</div>
//       <div className="text-2xl font-semibold mb-2">{value}</div>
//       <div className="flex items-center justify-between">
//         <span className={cn(
//           'text-xs',
//           change.trend === 'up' ? 'text-green-600' : 'text-red-600'
//         )}>
//           {change.value}
//         </span>
//         <div className="h-8 w-24">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data}>
//               <Area
//                 type="monotone"
//                 dataKey="value"
//                 stroke={change.trend === 'up' ? '#22c55e' : '#ef4444'}
//                 fill={change.trend === 'up' ? '#22c55e20' : '#ef444420'}
//                 strokeWidth={1.5}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </Card>
//   );
// }

import { Bar, BarChart, Line, LineChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { IoMdArrowUp } from "react-icons/io";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  chartData: number[];
  chartType: "bars" | "single-bar" | "line";
}

export function StatsCard({
  title,
  value,
  change,
  chartData,
  chartType,
}: StatsCardProps) {
  const data = chartData.map((value, index) => ({
    index,
    value,
  }));

  const chartConfig = {
    value: {
      label: "Value",
      color: chartType === "bars" ? "hsl(213, 94%, 95%)" : "hsl(217, 91%, 60%)",
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "bars":
        return (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={data}
              width={96}
              height={32}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <Bar dataKey="value" radius={[0, 0, 0, 0]} barSize={6} />
            </BarChart>
          </ChartContainer>
        );

      case "single-bar":
        return (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={[{ value: 100 }]}
              width={6}
              height={32}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <Bar dataKey="value" radius={[0, 0, 0, 0]} barSize={6} />
            </BarChart>
          </ChartContainer>
        );

      case "line":
        return (
          <ChartContainer config={chartConfig}>
            <LineChart
              data={data}
              width={96}
              height={32}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        );
    }
  };

  return (
    <div className="bg-card p-4 shadow-md rounded-md">
      <div className="text-sm text-accent-foreground mb-1">{title}</div>
      <div className="flex items-start justify-between">
        <div className="flex gap-3 items-center">
          <div className="text-3xl font-semibold">{value}</div>
          <div className="flex gap-3 items-center">
            <div className="bg-green-500 bg-opacity-15 p-1 text-green-500 rounded-full">
              <IoMdArrowUp className="h-3 w-3" />
            </div>
            <span className="text-xs text-green-500">+{change}</span>
          </div>
        </div>
        <div className="w-24">{renderChart()}</div>
      </div>
      <div className="text-[11px] text-gray-400">
        {/* Change from yesterday */}
      </div>
    </div>
  );
}
