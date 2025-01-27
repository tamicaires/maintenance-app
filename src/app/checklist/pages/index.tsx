import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChecklistTemplateList from "../components/checklist-template-list";
import ActiveChecklistList from "../components/active-checklist-list";
import RecentActivityFeed from "../components/recent-activity-feed";
import DashboardOverview from "../components/checklist-overview";

export function Checklist() {
  // const [selectedTab, setSelectedTab] = useState<WorkOrderStatus | "all">(
  //   "all"
  // );
  // const { activities, isLoading, error, setFilter } = useWorkOrderActivities({
  //   page: 1,
  //   perPage: 10,
  // });

  // const handleTabChange = (value: string) => {
  //   setSelectedTab(value as <WorkOrderStatus></WorkOrderStatus> | "all");
  //   setFilter((prev) => ({
  //     ...prev,
  //     status: value === "all" ? undefined : (value as WorkOrderStatus),
  //     page: 1,
  //   }));
  // };

  // const renderActivityItem = (activity: WorkOrderActivity) => (
  //   <p className="text-sm">
  //     <span className="font-semibold">
  //       Ordem de Serviço #{activity.orderNumber}
  //     </span>
  //     <span className="text-muted-foreground">
  //       {" "}
  //       alterada para {statusToPortuguese[activity.status]}
  //     </span>
  //     <span className="text-muted-foreground"> por {activity.technician}</span>
  //   </p>
  // );

  // const renderIcon = (activity: WorkOrderActivity) => {
  //   switch (activity.status) {
  //     case "completed":
  //       return <CheckCircle className="h-4 w-4 text-green-500" />;
  //     case "cancelled":
  //       return <AlertCircle className="h-4 w-4 text-red-500" />;
  //     default:
  //       return <ClipboardList className="h-4 w-4 text-blue-500" />;
  //   }
  // };

  // const tabs = [
  //   { value: "all", label: "Todas", count: activities.length },
  //   {
  //     value: "pending",
  //     label: "Pendentes",
  //     count: activities.filter((a) => a.status === "pending").length,
  //   },
  //   {
  //     value: "in_progress",
  //     label: "Em Progresso",
  //     count: activities.filter((a) => a.status === "in_progress").length,
  //   },
  //   {
  //     value: "completed",
  //     label: "Concluídas",
  //     count: activities.filter((a) => a.status === "completed").length,
  //   },
  // ];
  return (
    <div className="min-h-screen bg-background">
      <main className="sm:px-10 mx-auto py-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-10">
          <div className="space-y-6">
            <DashboardOverview />
            <RecentActivityFeed />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active">Checklist em Andamento</TabsTrigger>
                <TabsTrigger value="templates">
                  Templates de Checklist
                </TabsTrigger>
              </TabsList>
              <TabsContent value="templates">
                <ChecklistTemplateList />
              </TabsContent>
              <TabsContent value="active">
                <ActiveChecklistList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
