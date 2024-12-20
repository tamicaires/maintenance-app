import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { ServiceCategory } from "@/shared/enums/service";
import { IServiceAssignment } from "@/shared/types/service-assigment";
import EmptyState from "@/components/EmptyState";

interface WorkOrderStatsProps {
  serviceAssignments: IServiceAssignment[];
}

export function WorkOrderStats({ serviceAssignments }: WorkOrderStatsProps) {
  const serviceStats = useMemo(() => {
    const stats = Object.values(ServiceCategory).map((category) => {
      const count = serviceAssignments.filter(
        (assignment) => assignment.service.serviceCategory === category
      ).length;

      return {
        category,
        count,
      };
    });

    return stats.sort((a, b) => b.count - a.count);
  }, [serviceAssignments]);

  if (serviceAssignments.length === 0) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Áreas Críticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState message="Nenhum serviço atribuído ainda." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-medium">Áreas Críticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          {serviceStats.some((stat) => stat.count > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceStats}>
                <XAxis
                  dataKey="category"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhum serviço realizado ainda.
            </p>
          )}
        </div>
        <div className="space-y-4 mt-4">
          {serviceStats.some((stat) => stat.count > 0) ? (
            serviceStats
              .filter((stat) => stat.count > 0)
              .slice(0, 3)
              .map((stat) => (
                <div key={stat.category} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {stat.category}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.count} serviços realizados
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {(serviceAssignments.length > 0
                      ? (stat.count / serviceAssignments.length) * 100
                      : 0
                    ).toFixed(0)}
                    %
                  </div>
                </div>
              ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              Nenhum serviço realizado ainda.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
