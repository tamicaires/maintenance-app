import { useState } from "react";
import { useEvent } from "@/features/event/hooks/use-event";
import { SubjectEnum } from "@/shared/enums/subject";
import { ActivityFeed } from "@/components/activity-feed";
import { TabValue } from "@/shared/types/event";
import { ActivityItemProps } from "@/shared/types/activity";

export default function RecentActivityFeed() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState<TabValue>("all");

  const { data, isLoading, error } = useEvent({
    page: currentPage.toString(),
    perPage: "10",
    subject:
      selectedTab === "all"
        ? undefined
        : selectedTab === "checklists"
        ? SubjectEnum.Checklist
        : selectedTab === "templates"
        ? SubjectEnum.Service
        : undefined,
  });
  const activities = data || [];
  const checklistActivities: ActivityItemProps[] = activities.map(
    (activity) => {
      return {
        id: activity.id,
        event: activity.event,
        subject: activity.subject as SubjectEnum,
        subjectDetails: activity.description,
        handledBy: activity.handledBy,
        handledAt: activity.handledAt,
        workOrder: activity.workOrder,
      };
    }
  );
  const handleTabChange = (value: string) => {
    setSelectedTab(value as TabValue);
    setCurrentPage(1);
  };

  const tabs = [
    { value: "all" as TabValue, label: "Todas", count: activities.length },
  ];

  return (
    <ActivityFeed
      title="Atividades Recentes"
      activities={checklistActivities}
      isLoading={isLoading}
      error={error}
      tabs={tabs}
      selectedTab={selectedTab}
      onTabChange={handleTabChange}
      onViewAll={() => console.log("Ver todas as atividades")}
      emptyStateMessage="Atividades está vazio"
    />
  );
}
