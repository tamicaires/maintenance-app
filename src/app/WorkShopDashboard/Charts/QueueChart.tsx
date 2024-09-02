import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export function QueueChart() {
  const areaChartData = [
    { day: "08:00", maintenance: 18 },
    { day: "09:00", maintenance: 25 },
    { day: "10:00", maintenance: 23 },
    { day: "11:00", maintenance: 17 },
    { day: "12:00", maintenance: 20 },
    { day: "13:00", maintenance: 15 },
    { day: "14:00", maintenance: 10 },
  ];

  const areaChartConfig = {
    maintenance: {
      label: "Manutenções",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fluxo de Frotas em Fila</CardTitle>
        <CardDescription>Frotas em fila nas últimas 7 horas</CardDescription>
      </CardHeader>
      <CardContent className="w-[400px]">
        <ChartContainer config={areaChartConfig}>
          <AreaChart
            accessibilityLayer
            data={areaChartData}
            margin={{
              left: 0,
              right: 0,
              top: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillMaintenance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="maintenance"
              type="monotone"
              fill="url(#fillMaintenance)"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Aumento de 5.2% em relação a ontem <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Baseado nos dados dos últimos 7 dias
        </div>
      </CardFooter>
    </Card>
  );
}
