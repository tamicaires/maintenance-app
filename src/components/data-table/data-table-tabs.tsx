import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataTableTabsProps {
  tabs: {
    value: string;
    label: string;
    count: number;
  }[];
}

export function DataTableTabs({ tabs }: DataTableTabsProps) {
  return (
    <Tabs defaultValue={tabs[0].value}>
      <TabsList className="w-full justify-start h-auto pb-0 mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative h-9"
          >
            {tab.label}
            <Badge
              className={`ml-2 ${
                tab.value === tabs[0].value
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
              variant="secondary"
            >
              {tab.count}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
