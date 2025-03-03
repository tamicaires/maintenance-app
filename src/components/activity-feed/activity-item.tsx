import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActivityItemProps } from "@/shared/types/activity";
import { getInitials } from "@/utils/utils";
import {
  eventActionToPortuguese,
  subjectToPortuguese,
} from "@/utils/event-mapper";
import { dateUtil } from "@/utils/date";

interface ActiveItemPropsObject {
  activity: ActivityItemProps;
}
export function ActivityItem({ activity }: ActiveItemPropsObject) {
  return (
    <div className="px-3 py-4 hover:bg-muted/50 transition-colors">
      <div className="flex gap-4 justify-between">
        <div className=" flex gap-2">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src={undefined} />
            <AvatarFallback>
              {getInitials(activity.handledBy.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-start justify-between gap-x-2">
            <div>
              <p className="text-sm">
                <span className="font-semibold">{activity.handledBy.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  {eventActionToPortuguese[activity.event]}{" "}
                </span>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {activity.quantity && `${activity.quantity}x `}
                  {activity.subjectDetails ||
                    subjectToPortuguese[activity.subject]}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">
                  {activity.workOrder &&
                    `OS: ${activity.workOrder.displayId} • `}
                  {dateUtil.timeSince(new Date(activity.handledAt))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>{activity.actionTrigger}</div>
      </div>
    </div>
  );
}
