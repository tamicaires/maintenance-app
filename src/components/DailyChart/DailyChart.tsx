import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { hour: "09:00", queue: 5 },
  { hour: "10:00", queue: 8 },
  { hour: "11:00", queue: 12 },
  { hour: "12:00", queue: 10 },
  { hour: "13:00", queue: 7 },
  { hour: "14:00", queue: 9 },
  { hour: "15:00", queue: 6 },
];

const chartConfig = {
  queue: {
    label: "Frotas em Fila",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DailyChart() {
  const currentQueueCount = chartData[chartData.length - 1].queue;
  const previousQueueCount = chartData[chartData.length - 2].queue;
  const queueChange =
    ((currentQueueCount - previousQueueCount) / previousQueueCount) * 100;
  const trendingUp = queueChange > 0;

  return (
    <div className="pt-6">
      <div className="pb-6">
        <CardTitle style={{ paddingInline: 0 }}>Frotas em Fila</CardTitle>
        <CardDescription>Últimas 7 horas</CardDescription>
      </div>
      <div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            {/* <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="queue" fill="hsl(var(--primary))" radius={8} />
          </BarChart>
        </ChartContainer>
      </div>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendingUp ? "Aumento" : "Redução"} de{" "}
          {Math.abs(queueChange).toFixed(1)}% na última hora
          <TrendingUp
            className={`h-4 w-4 ${
              trendingUp ? "text-red-500" : "text-green-500"
            } ${!trendingUp && "rotate-180"}`}
          />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total de frotas em fila nas últimas 7 horas
        </div>
      </CardFooter>
    </div>
  );
}
