import { EventActionEnum } from "../enums/event-action";
import { SubjectEnum } from "../enums/subject";
import { IWorkOrder } from "./work-order.interface";

interface HandledByProps {
  id: string;
  name: string;
}
export interface ActivityItemProps {
  id: string
  icon?: string;
  handledAt: string
  handledBy: HandledByProps;
  event: EventActionEnum;
  subject: SubjectEnum;
  subjectDetails?: string;
  quantity?: number;
  workOrder: Pick<IWorkOrder, 'id' | 'displayId'>;
  actionTrigger?: React.ReactNode;
}

export interface Tab {
  value: string
  label: string
  count: number
}

export interface ActivityFeedProps {
  title: string
  activities: ActivityItemProps[]
  isLoading: boolean
  error: Error | null
  tabs?: Tab[]
  selectedTab?: string
  onTabChange?: (value: string) => void
  onViewAll?: () => void
  emptyStateMessage: string
}

