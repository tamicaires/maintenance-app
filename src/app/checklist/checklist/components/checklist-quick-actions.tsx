import { format } from "date-fns";
import { Button } from "@/components/ui/button";

type QuickActionsProps = {
  lastUpdate?: string;
};

export function ChecklistQuickActions({ lastUpdate }: QuickActionsProps) {
  return (
    <div className="fixed bottom-0 right-[0.115rem] w-full border-t bg-background/80 backdrop-blur-sm p-4 rounded-b-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${1245}`}
              />
              <AvatarFallback>LU</AvatarFallback>
            </Avatar> */}
            <div className="text-sm">
              <p className="font-medium">Última atualização</p>
              <p className="text-muted-foreground">
                {lastUpdate && format(new Date(lastUpdate), "dd/MM/yyyy HH:mm")}
                {/* {format(new Date(), "dd/MM/yyyy HH:mm")} */}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => {}}>
            Fechar
          </Button>

          <Button>Finalizar Checklist</Button>
        </div>
      </div>
    </div>
  );
}
