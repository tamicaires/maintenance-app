import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleFadingPlus, Plus, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmployeeBasicInfo } from "@/shared/types/employee.interface";
import { useToast } from "../Toast/toast";
import { useAddEmployeeToServiceAssignment } from "@/app/EmployeeServiceAssigment/hooks/use-add-service-employee";
import { useEmployee } from "@/app/Employee/hooks/use-employee";
import { Select as CustomSelect } from "../CustomCombobox";
import { CustomDialogHeader } from "../CustomDialogHeader";

type EmployeeAvatarGroupSize = "sm" | "md" | "lg";

interface EmployeeAvatarGroupProps {
  employees: EmployeeBasicInfo[];
  onAddEmployee: (employee: EmployeeBasicInfo) => void;
  size?: EmployeeAvatarGroupSize;
  serviceAssignmentId: string;
}

const sizeConfig: Record<
  EmployeeAvatarGroupSize,
  { avatar: string; spacing: string; font: string }
> = {
  sm: { avatar: "h-8 w-8", spacing: "-space-x-1", font: "text-xs" },
  md: { avatar: "h-10 w-10", spacing: "-space-x-2", font: "text-sm" },
  lg: { avatar: "h-12 w-12", spacing: "-space-x-3", font: "text-base" },
};

export default function EmployeeAvatarGroup({
  employees,
  onAddEmployee,
  size = "md",
  serviceAssignmentId,
}: EmployeeAvatarGroupProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addToast, ToastComponent } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const { data, isLoading: isEmployeeLoading } = useEmployee();

  const employeesData = data?.data || [];

  const unassignedEmployeesOptions = employeesData
    .filter((person) => !employees.some((emp) => emp.id === person.id))
    .map((person) => ({
      value: person.id,
      label: person.name,
      description: person.jobTitle,
    }));

  const { isSubmitting, submitAddEmployeeData } =
    useAddEmployeeToServiceAssignment(setIsDialogOpen, addToast);

  const { avatar: avatarSize, spacing, font } = sizeConfig[size];

  const displayedAvatars = employees.slice(0, 3);
  const remainingCount = Math.max(0, employees.length - 3);

  const filteredPeople = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (selectedEmployee) {
      submitAddEmployeeData({
        serviceAssigmentId: serviceAssignmentId,
        employeeId: selectedEmployee,
      });
      const employeeToAdd = employees.find((p) => p.id === selectedEmployee);
      if (employeeToAdd) {
        onAddEmployee(employeeToAdd);
      }
      setSelectedEmployee(null);
    }
  };

  return (
    <>
      <div className={cn("flex items-center", spacing)}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {employees.length > 0 ? (
              <div className="flex items-center justify-center -space-x-2 overflow-hidden w-full">
                {displayedAvatars.map((employee) => (
                  <TooltipProvider key={employee.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar
                          className={cn(
                            "cursor-pointer inline-block ring-2 ring-muted",
                            avatarSize
                          )}
                          onClick={() => setIsDialogOpen(true)}
                        >
                          <AvatarFallback className={font}>
                            {employee.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{employee.name}</p>
                        <p className={cn("text-muted-foreground", font)}>
                          {employee.jobTitle}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                <Avatar
                  className={cn(
                    "flex justify-center items-center cursor-pointer ring-2 ring-muted w-full",
                    avatarSize
                  )}
                  onClick={() => setIsDialogOpen(true)}
                >
                  <AvatarFallback className={font}>
                    {remainingCount > 0 ? (
                      `+${remainingCount}`
                    ) : (
                      <div className="text-xl">+</div>
                    )}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <CircleFadingPlus className="cursor-pointer text-zinc-600" />
              </div>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="sr-only">
                Adicionar Responsável Técnico
              </DialogTitle>
              <CustomDialogHeader
                title="Responsáveis Técnico"
                subtitle="Colaboradores vinculados ao serviço "
              />
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <div className="col-span-3 relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Buscar por nome ..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-0.5"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <ScrollArea className="h-[200px]">
                {filteredPeople.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center space-x-4 p-2"
                  >
                    <Avatar className={avatarSize}>
                      <AvatarFallback>
                        {employee.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium leading-none">
                        {employee.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {employee.jobTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex flex-col items-center gap-4 border-t border-muted">
                <div className="flex ">
                  <Label htmlFor="add-person" className="pt-4">
                    Adicionar Colaborador ao Serviço
                  </Label>
                </div>
                <div className="flex gap-3 w-full">
                  <div className="w-full">
                    <CustomSelect
                      emptyText=""
                      placeholder="Selecionar Profissional Técnico"
                      options={unassignedEmployeesOptions}
                      value={selectedEmployee || ""}
                      onChange={setSelectedEmployee}
                      isLoading={isEmployeeLoading}
                      isFiltered
                    />
                  </div>
                  <Button
                    onClick={handleAddEmployee}
                    disabled={!selectedEmployee || isSubmitting}
                  >
                    {isSubmitting ? (
                      "Adicionando..."
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" /> Add
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
          <ToastComponent />
        </Dialog>
      </div>
    </>
  );
}
