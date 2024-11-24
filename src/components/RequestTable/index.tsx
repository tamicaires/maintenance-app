import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPartRequest } from "@/shared/types/part-request";
import { RequestStatus } from "@/shared/enums/part-request";
import { MoreVertical } from "lucide-react";

interface IRequestTableProps {
  partRequests: IPartRequest[];
}

export function RequestTable({ partRequests }: IRequestTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuário</TableHead>
          <TableHead>Peça</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partRequests.map((partRequest) => (
          <TableRow key={partRequest.id}>
            <TableCell>{partRequest.requestedBy?.name}</TableCell>
            <TableCell>{partRequest.part?.name}</TableCell>
            <TableCell>{partRequest.quantity}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  partRequest.status === RequestStatus.APPROVED
                    ? "bg-primary/20 text-primary"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {partRequest.status}
              </span>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
