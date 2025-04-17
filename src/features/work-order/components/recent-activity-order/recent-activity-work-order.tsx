import { useEvent } from "@/features/event/hooks/use-event";
import { SubjectEnum } from "@/shared/enums/subject";
import { ActivityFeed } from "@/components/activity-feed";
import { ActivityItemProps } from "@/shared/types/activity";
import { getDataOrDefault } from "@/utils/data";
import { IEventRelationalData } from "@/shared/types/event";

export default function WorkOrderRecentActivityFeed() {
  const { data, isLoading, error } = useEvent({
    page: "1",
    perPage: "10",
    subject: SubjectEnum.Work_Order,
  });

  const activities = getDataOrDefault<IEventRelationalData[]>(data, [], "data");
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

  return (
    <ActivityFeed
      title="Atividades Recentes"
      activities={checklistActivities}
      isLoading={isLoading}
      error={error}
      emptyStateMessage="Atividades está vazio"
    />
  );
}
