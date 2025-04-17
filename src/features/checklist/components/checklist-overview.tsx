import { OverviewCard } from "@/components/overview-card/overview-card";
import { ClipboardList, Users } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
      <OverviewCard
        title="Total Checklists"
        value={36}
        icon={ClipboardList}
        trend={{ value: "2.5%", positive: true }}
      />
      {/* <OverviewCard
        title="Finalizados"
        value={24}
        icon={CheckCircle}
        trend={{ value: "12%", positive: true }}
      /> */}
      <OverviewCard
        title="Tempo médio"
        value={"12:14"}
        icon={Users}
        trend={{ value: "1", positive: true }}
      />
      {/* <OverviewCard
        title="Efficiency Rate"
        value="92%"
        icon={TrendingUp}
        trend={{ value: "5%", positive: true }}
      /> */}
    </div>
  );
}
