import {
  ChevronDown,
  HelpCircle,
  MoreVertical,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "../Profile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CardInfoDisplay } from "./card-info-display";
import { Badge } from "../ui/badge";
import { TypeOfMaintenance } from "@/shared/enums/work-order";
import { IActiveTrailer } from "@/shared/types/trailer.interface";

type WorkOrderType = {
  id: string;
  displayId: string;
  typeOfMaintenance: TypeOfMaintenance;
  fleet: {
    id: string;
    fleetNumber: string;
    trailers: IActiveTrailer[];
  };
};
interface CardHeaderProps {
  title: string;
  description: string;
  lastUpdate: string;
  workOrder: WorkOrderType;
  variant?: "expanded" | "compact";
}

export function CardHeader({
  title,
  description,
  lastUpdate,
  workOrder,
  variant = "expanded",
}: CardHeaderProps) {
  const [isExpandedInformation, setIsExpandedInformation] =
    useState<boolean>(true);

  return variant === "expanded" ? (
    <div className="w-full rounded-2xl bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17 10L10 17L3 10M10 16V3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{lastUpdate}</span>
            <h3 className="text-xl font-medium leading-none">
              Onboarding plan for SnapNote
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Nov 14</span>
              <span>•</span>
              <span>Nov 16</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[25%] rounded-full bg-green-500" />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Last Updated: Nov 14, 7:20 AM
          </span>
          <span>4/17</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full rounded-2xl bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold leading-none">{title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="text-base text-muted-foreground">
                {description}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            {/* {true && ( */}
            <div className="flex items-center text-md text-primary bg-primary/5 rounded-full px-4 py-2">
              {/* <Clock className="mr-2 h-4 w-4" />
                {new Date(120000 * 1000).toISOString().substr(11, 8)} */}
              {workOrder.displayId}
            </div>
            {/* )} */}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col px-6 py-6 bg-accent/50 mt-4 rounded-md">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              Informações complementares
            </span>
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform text-gray-500 cursor-pointer",
              {
                "transform rotate-180": isExpandedInformation,
              }
            )}
            onClick={() => setIsExpandedInformation(!isExpandedInformation)}
          />
        </div>
        {isExpandedInformation && (
          <div className="mt-4 grid grid-cols-4 gap-x-12 gap-y-1 text-sm">
            {/* <div className="text-muted-foreground">Frota</div>
            <div>22542</div> */}
            <CardInfoDisplay
              label="Frota"
              value={workOrder.fleet.fleetNumber}
            />
            <CardInfoDisplay
              label="Tipo Manutenção"
              value={workOrder.typeOfMaintenance}
            />
            <CardInfoDisplay
              label="Responsável Técnico"
              render={<Profile name="Thamires Carvalho" size="large" />}
            />
            <CardInfoDisplay
              label="Ordem de Serviço"
              render={
                <Badge variant="secondary" className="text-base">
                  {workOrder.displayId}
                </Badge>
              }
            />
            {/* <div className="text-muted-foreground">Tipo Manutenção</div>
            <div>Preventiva</div> */}
            {/* <div className="text-muted-foreground">Inicio</div>
          <div>10 • 2025</div> */}
            {/* <div className="text-muted-foreground">Responsável Checklist</div>
            <div className="flex items-center gap-1">
              
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
