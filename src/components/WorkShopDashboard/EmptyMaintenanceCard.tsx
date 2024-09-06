import { PlusIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function EmptyBox(boxNumber: string) {
  return (
    <Card className="relative flex flex-col items-center justify-center h-full min-w-72 min-h-64 w-full">
      <div className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 text-sm font-bold rounded-bl-lg rounded-tr-lg">
        Box {boxNumber}
      </div>
      <CardContent className="flex flex-col items-center justify-center h-full">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
          <PlusIcon className="h-12 w-12 text-secondary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-center">Box Disponível</h3>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Pronto para nova manutenção
        </p>
      </CardContent>
    </Card>
  );
}
