import { CheckCircle, ClipboardList, FileEdit } from "lucide-react";
import { EventActionEnum } from "@/shared/enums/event-action";

interface ActivityIconProps {
  action: EventActionEnum;
}

export const ActivityIcon: React.FC<ActivityIconProps> = ({ action }) => {
  switch (action) {
    case EventActionEnum.Completed:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case EventActionEnum.Created:
    case EventActionEnum.Updated:
      return <FileEdit className="h-4 w-4 text-blue-500" />;
    default:
      return <ClipboardList className="h-4 w-4 text-purple-500" />;
  }
};
