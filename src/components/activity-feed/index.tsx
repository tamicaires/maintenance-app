import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaHistory } from "react-icons/fa";
import { Spinner } from "@/components/Spinner";
import EmptyState from "@/components/states/empty-state";
import { ActivityFeedProps } from "@/shared/types/activity";
import { ActivityTabs } from "./activity-tabs";
import { ActivityItem } from "./activity-item";
import { Suspense } from "react";

export function ActivityFeed({
  title,
  activities,
  isLoading,
  error,
  tabs,
  selectedTab,
  onTabChange,
  onViewAll,
  emptyStateMessage,
}: ActivityFeedProps) {
  const isTabActive = tabs && onTabChange && selectedTab;
  return (
    <Card className="shadow-lg">
      <CardHeader className="px-3 pb-1">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex gap-3 items-center">
            <div className="bg-primary p-2 rounded-md">
              <FaHistory className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
          {onViewAll && (
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80 hover:bg-primary/10 font-medium"
              onClick={onViewAll}
            >
              Ver todas
            </Button>
          )}
        </div>
        {isTabActive && (
          <ActivityTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={onTabChange}
          />
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(68vh-200px)]">
          <div className="divide-y divide-border">
            {isLoading ? (
              <Spinner />
            ) : (
              <Suspense fallback={<Spinner />}>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))
                ) : (
                  <EmptyState message={emptyStateMessage} />
                )}
              </Suspense>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
