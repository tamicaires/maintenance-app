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
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IWorkOrder } from "@/shared/types/work-order.interface";
import { TypeOfMaintenance } from "@/shared/enums/work-order";

interface TypeMaintenanceChartProps {
  workOrders: IWorkOrder[];
}

export function TypeMaintenanceChart({
  workOrders,
}: TypeMaintenanceChartProps) {
  // const pieChartData = useMemo(() => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const todayOrders = workOrders.filter(
  //     (order) => new Date(order.createdAt) >= today
  //   );

  //   const counts = {
  //     [TypeOfMaintenance.PREVENTIVA]: 0,
  //     [TypeOfMaintenance.CORRETIVA]: 0,
  //     [TypeOfMaintenance.PREDITIVA]: 0,
  //   };

  //   todayOrders.forEach((order) => {
  //     counts[order.typeOfMaintenance as TypeOfMaintenance]++;
  //   });

  //   return [
  //     {
  //       type: "Preventiva",
  //       value: counts[TypeOfMaintenance.PREVENTIVA],
  //       fill: "hsl(var(--primary))",
  //     },
  //     {
  //       type: "Corretiva",
  //       value: counts[TypeOfMaintenance.CORRETIVA],
  //       fill: "hsl(var(--chart-3))",
  //     },
  //     {
  //       type: "Preditiva",
  //       value: counts[TypeOfMaintenance.PREDITIVA],
  //       fill: "hsl(var(--chart-5))",
  //     },
  //   ];
  // }, [workOrders]);

  const pieChartData = useMemo(() => {
    const counts = {
      [TypeOfMaintenance.PREVENTIVA]: 0,
      [TypeOfMaintenance.CORRETIVA]: 0,
      [TypeOfMaintenance.PREDITIVA]: 0,
    };

    workOrders.forEach((order) => {
      counts[order.typeOfMaintenance as TypeOfMaintenance]++;
    });

    return [
      {
        type: "Preventiva",
        value: counts[TypeOfMaintenance.PREVENTIVA],
        fill: "hsl(var(--primary))",
      },
      {
        type: "Corretiva",
        value: counts[TypeOfMaintenance.CORRETIVA],
        fill: "hsl(var(--chart-3))",
      },
      {
        type: "Preditiva",
        value: counts[TypeOfMaintenance.PREDITIVA],
        fill: "hsl(var(--chart-5))",
      },
    ];
  }, [workOrders]);

  console.log("Pie Chart Data", pieChartData);
  console.log("Pie Chart Dados certos", workOrders);
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
    preditiva: {
      label: "Preditiva",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const yesterdayOrders = workOrders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= yesterday && orderDate < new Date();
  });

  const yesterdayPreventiveCount = yesterdayOrders.filter(
    (order) => order.typeOfMaintenance === TypeOfMaintenance.PREVENTIVA
  ).length;

  const todayPreventiveCount =
    pieChartData.find((data) => data.type === "Preventiva")?.value || 0;

  const percentageChange =
    yesterdayPreventiveCount > 0
      ? ((todayPreventiveCount - yesterdayPreventiveCount) /
          yesterdayPreventiveCount) *
        100
      : 0;

      const barChartData = useMemo(() => {
        const counts = {
          [TypeOfMaintenance.PREVENTIVA]: 0,
          [TypeOfMaintenance.CORRETIVA]: 0,
          [TypeOfMaintenance.PREDITIVA]: 0,
        };
    
        workOrders.forEach((order) => {
          counts[order.typeOfMaintenance as TypeOfMaintenance]++;
        });
    
        return [
          {
            type: "Preventiva",
            value: counts[TypeOfMaintenance.PREVENTIVA],
            fill: "hsl(var(--primary))",
          },
          {
            type: "Corretiva",
            value: counts[TypeOfMaintenance.CORRETIVA],
            fill: "hsl(var(--chart-3))",
          },
          {
            type: "Preditiva",
            value: counts[TypeOfMaintenance.PREDITIVA],
            fill: "hsl(var(--chart-5))",
          },
        ];
      }, [workOrders]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Manutenção</CardTitle>
        <CardDescription>Distribuição de manutenções</CardDescription>
      </CardHeader>
      <CardContent className="w-[400px]">
        <ChartContainer config={pieChartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              {/* <YAxis /> */}
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              {/* <Legend /> */}
              <Bar dataKey="value" name="Tipo Manutenção" label>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* <PieChart>
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
          </PieChart> */}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {percentageChange >= 0 ? (
            <>
              Preventivas aumentaram {percentageChange.toFixed(1)}%
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Preventivas diminuíram {Math.abs(percentageChange).toFixed(1)}%
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Comparado a ontem
        </div>
      </CardFooter>
    </Card>
  );
}

// import { useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import { IWorkOrder } from "@/shared/types/work-order.interface";
// import { TypeOfMaintenance } from "@/shared/enums/work-order";

// interface TypeMaintenanceChartProps {
//   workOrders: IWorkOrder[];
// }

// export function TypeMaintenanceChart({
//   workOrders,
// }: TypeMaintenanceChartProps) {
//   const barChartData = useMemo(() => {
//     const counts = {
//       [TypeOfMaintenance.PREVENTIVA]: 0,
//       [TypeOfMaintenance.CORRETIVA]: 0,
//       [TypeOfMaintenance.PREDITIVA]: 0,
//     };

//     workOrders.forEach((order) => {
//       counts[order.typeOfMaintenance as TypeOfMaintenance]++;
//     });

//     return [
//       {
//         type: "Preventiva",
//         value: counts[TypeOfMaintenance.PREVENTIVA],
//         fill: "hsl(var(--primary))",
//       },
//       {
//         type: "Corretiva",
//         value: counts[TypeOfMaintenance.CORRETIVA],
//         fill: "hsl(var(--chart-3))",
//       },
//       {
//         type: "Preditiva",
//         value: counts[TypeOfMaintenance.PREDITIVA],
//         fill: "hsl(var(--chart-5))",
//       },
//     ];
//   }, [workOrders]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Tipos de Manutenção</CardTitle>
//         <CardDescription>Distribuição de manutenções abertas</CardDescription>
//       </CardHeader>
//       <CardContent className="w-full h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={barChartData}
//             margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="type" />
//             <YAxis />
//             <Tooltip content={<ChartTooltipContent hideLabel />} />
//             <Legend />
//             <Bar dataKey="value" name="Quantidade" label>
//               {barChartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.fill} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
