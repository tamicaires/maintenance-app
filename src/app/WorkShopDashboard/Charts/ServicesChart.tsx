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
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

export function ServiceChart() {
  const barChartData = [
    { category: "eletrica", count: 27, fill: "hsl(var(--primary))" },
    { category: "alinhamento", count: 20, fill: "hsl(var(--secondary))" },
    { category: "estrutura", count: 18, fill: "hsl(var(--accent))" },
    { category: "motor", count: 17, fill: "hsl(var(--muted))" },
    { category: "outros", count: 9, fill: "hsl(var(--card))" },
  ];

  const barChartConfig = {
    count: {
      label: "Quantidade",
    },
    eletrica: {
      label: "Elétrica",
      color: "hsl(var(--primary))",
    },
    alinhamento: {
      label: "Alinhamento",
      color: "hsl(var(--secondary))",
    },
    estrutura: {
      label: "Estrutura",
      color: "hsl(var(--accent))",
    },
    motor: {
      label: "Motor",
      color: "hsl(var(--muted))",
    },
    outros: {
      label: "Outros",
      color: "hsl(var(--card))",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias de Serviços</CardTitle>
        <CardDescription>Principais tipos de serviços hoje</CardDescription>
      </CardHeader>
      <CardContent className="w-[400px]">
        <ChartContainer config={barChartConfig}>
          <BarChart
            accessibilityLayer
            data={barChartData}
            layout="vertical"
            margin={{
              left: 80,
              right: 10,
              top: 20,
              bottom: 20,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                barChartConfig[value as keyof typeof barChartConfig]?.label
              }
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={4}>
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Elétrica é a categoria mais frequente hoje
        </div>
        <div className="leading-none text-muted-foreground">
          Aumento de 2.5% em relação a ontem
        </div>
      </CardFooter>
    </Card>
  );
}
