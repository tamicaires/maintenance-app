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
import { useQueueChart } from "../../hooks/use-queue-chart";
import { Spinner } from "@/components/Spinner";
import EmptyState from "@/components/empty-state";
import { LoadingOverlay } from "@/components/loading-overlay";

export function QueueChart() {
  const { data: queueChart, isLoading: isQueueCharloading } = useQueueChart();

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
      <CardContent className="w-full">
        <LoadingOverlay isLoading={isQueueCharloading}>
          {queueChart && (
            <ChartContainer config={areaChartConfig}>
              <AreaChart
                accessibilityLayer
                data={queueChart.hourlyData}
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
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
          )}
        </LoadingOverlay>
        {/* {!queueChart ? (
          <EmptyState message="Análise não disponivel" />
        ) : (
          <ChartContainer config={areaChartConfig}>
            <AreaChart
              accessibilityLayer
              data={queueChart.hourlyData}
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
        )} */}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {queueChart && (
          <div>
            <div className="flex gap-2 font-medium leading-none">
              {queueChart.percentageChange >= 0 ? (
                <>
                  Aumento de {queueChart.percentageChange.toFixed(1)}% em
                  relação às 7 horas anteriores
                  <TrendingUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Diminuição de{" "}
                  {Math.abs(queueChart.percentageChange).toFixed(1)}% em relação
                  às 7 horas anteriores
                  <TrendingDown className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="leading-none text-muted-foreground">
              Baseado nos dados das últimas 7 horas
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
