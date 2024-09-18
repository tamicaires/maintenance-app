import { useMemo } from "react";
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
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { IWorkOrder } from "@/interfaces/work-order.interface";
import { MaintenanceStatus } from "@/shared/enums/work-order";

interface QueueChartProps {
  workOrders: IWorkOrder[];
}

export function QueueChart({ workOrders }: QueueChartProps) {
  const areaChartData = useMemo(() => {
    const now = new Date();
    const sevenHoursAgo = new Date(now.getTime() - 7 * 60 * 60 * 1000);

    const hourlyData = new Array(7).fill(0).map((_, index) => {
      const hour = new Date(now.getTime() - (6 - index) * 60 * 60 * 1000);
      return {
        hour: hour.getHours().toString().padStart(2, "0") + ":00",
        count: 0,
      };
    });

    workOrders.forEach((order) => {
      if (order.status === MaintenanceStatus.FILA && order.entryQueue) {
        const entryTime = new Date(order.entryQueue);
        if (entryTime >= sevenHoursAgo && entryTime <= now) {
          const index = hourlyData.findIndex(
            (data) =>
              data.hour ===
              entryTime.getHours().toString().padStart(2, "0") + ":00"
          );
          if (index !== -1) {
            hourlyData[index].count++;
          }
        }
      }
    });

    return hourlyData;
  }, [workOrders]);

  const totalQueueCount = areaChartData.reduce(
    (sum, data) => sum + data.count,
    0
  );
  const previousTotalQueueCount = workOrders.filter(
    (order) =>
      order.status === MaintenanceStatus.FILA &&
      new Date(order.entryQueue!) <
        new Date(new Date().getTime() - 14 * 60 * 60 * 1000)
  ).length;

  const percentageChange =
    ((totalQueueCount - previousTotalQueueCount) / previousTotalQueueCount) *
    100;

  const areaChartConfig = {
    queue: {
      label: "Em Fila",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-auto">
      <CardHeader>
        <CardTitle>Fluxo de Frotas em Fila</CardTitle>
        <CardDescription>Frotas em fila nas últimas 7 horas</CardDescription>
      </CardHeader>
      <CardContent className="w-60 sm:w-[408px]">
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
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillQueue" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="count"
              type="monotone"
              fill="url(#fillQueue)"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {percentageChange >= 0 ? (
            <>
              Aumento de {percentageChange.toFixed(1)}% em relação às 7 horas
              anteriores
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Diminuição de {Math.abs(percentageChange).toFixed(1)}% em relação
              às 7 horas anteriores
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Baseado nos dados das últimas 14 horas
        </div>
      </CardFooter>
    </Card>
  );
}
