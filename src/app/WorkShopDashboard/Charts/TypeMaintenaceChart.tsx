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
import { Cell, Legend, Pie, PieChart } from "recharts";

export function TypeMaintenanceChart() {
  const pieChartConfig = {
    value: {
      label: "Quantidade",
    },
    preventiva: {
      label: "Preventiva",
      color: "hsl(var(--primary))",
    },
    corretiva: {
      label: "Corretiva",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const pieChartData = [
    { type: "Preventiva", value: 27, fill: "hsl(var(--primary))" },
    { type: "Corretiva", value: 20, fill: "hsl(var(--chart-5))" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Manutenção</CardTitle>
        <CardDescription>Distribuição de manutenções hoje</CardDescription>
      </CardHeader>
      <CardContent className="w-[400px]">
        <ChartContainer config={pieChartConfig} className="h-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="type"
              innerRadius="50%"
              outerRadius="80%"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Preventivas aumentaram 3.1% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Comparado a ontem
        </div>
      </CardFooter>
    </Card>
  );
}
