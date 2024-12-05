import { IServiceAssignment } from "@/shared/types/service-assigment";
import ServiceAssigmentItem from "../../app/service-assigment/components/service-assigment-item/service-assigment-item";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import EmptyState from "../EmptyState";

interface IServiceAssigmentListProps {
  serviceAssigments: IServiceAssignment[];
}

export default function ServiceAssigmentList({
  serviceAssigments,
}: IServiceAssigmentListProps) {
  return (
    <div className="space-y-1">
      <ScrollArea>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead className="w-[100px]">Reboque</TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Responsáveis
                </TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Status
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceAssigments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground h-[200px]"
                  >
                    <EmptyState message="Nenhum item adicionado" />
                  </TableCell>
                </TableRow>
              ) : (
                serviceAssigments.map((serviceAssigment) => (
                  <ServiceAssigmentItem serviceAssigment={serviceAssigment} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
}
