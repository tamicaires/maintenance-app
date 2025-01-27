import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tab } from "@/shared/types/activity";

interface ActivityTabsProps {
  tabs: Tab[];
  selectedTab: string;
  onTabChange: (value: string) => void;
}

export const ActivityTabs: React.FC<ActivityTabsProps> = ({
  tabs,
  selectedTab,
  onTabChange,
}) => {
  return (
    <Tabs value={selectedTab} className="w-full" onValueChange={onTabChange}>
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
            <span className="ml-1.5 bg-muted px-2 py-0.5 text-xs rounded-full">
              {tab.count}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
