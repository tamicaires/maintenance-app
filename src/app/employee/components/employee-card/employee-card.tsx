import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Eye,
  Star,
  Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IEmployee } from "@/shared/types/employee.interface";

export interface IEmployeeWithMetrics {
  id: string;
  name: string;
  workShift: string;
  jobTitleId: string;
  jobTitle: string;
  isActive: boolean;
  createdAt?: string;
  servicesCount?: number;
  productivity?: number;
}

interface EmployeeCardProps {
  employee: IEmployee;
  onHire?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function EmployeeCard({
  employee,
  onHire,
  onViewDetails,
}: EmployeeCardProps) {
  const [isEmployeeCardOpen, setIsEmployeeCardOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  isHovered
  const getExperience = () => {
    if (!employee.createdAt) return "Novo";
    const startDate = new Date(employee.createdAt);
    const today = new Date();
    const years = today.getFullYear() - startDate.getFullYear();
    return years <= 0 ? "< 1 ano" : `${years} ${years === 1 ? "ano" : "anos"}`;
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleClose = () => {
    setIsEmployeeCardOpen(false);
  };

  return (
    <Dialog open={isEmployeeCardOpen} onOpenChange={setIsEmployeeCardOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Eye className="text-muted-foreground h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-md overflow-hidden transition-all duration-300 bg-white rounded-2xl shadow-sm hover:shadow-md"
        onInteractOutside={handleClose}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardHeader className="flex flex-row items-center justify-between p-1 pb-0">
            <div className="flex items-start gap-3">
              <Avatar className="w-16 h-16 border-2 border-blue-100">
                <AvatarImage
                  src={`/placeholder.svg?text=${getInitials(employee.name)}`}
                  alt={employee.name}
                />
                <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {employee.jobTitle}
                </p>

                <div>
                  {employee.isActive ? (
                    <Badge
                      variant="outline"
                      className="mt-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 rounded-lg"
                    >
                      Ativo
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="mt-1 bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 rounded-lg"
                    >
                      Inativo
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Button
              className="bg-primary hover:primary/80 text-white rounded-full"
              onClick={() => onHire && onHire(employee.id)}
            >
              Mecânico
            </Button>
          </CardHeader>

          <CardContent className="p-2">
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 mb-1 text-primary">
                  <Star className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-500">Experiência</span>
                <span className="text-sm font-medium">{getExperience()}</span>
              </div>

              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 mb-1 text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-500">Serviços</span>
                <span className="text-sm font-medium">{7}</span>
              </div>

              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 mb-1 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-500">Produtividade</span>
                <span className="text-sm font-medium">{12}%</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-2 pt-0">
            <div className="w-full p-4 mt-2 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="text-sm font-semibold">Turno de Trabalho</h4>
                    <p className="text-xs text-gray-500">
                      {employee.workShift}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                  onClick={() => onViewDetails && onViewDetails(employee.id)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
