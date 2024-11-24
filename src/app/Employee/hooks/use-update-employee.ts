import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { EmployeeService } from "@/services/employee";
import {
  IEmployee,
  IEmployeeCreateAndUpdate,
} from "@/shared/types/employee.interface";
import { IApiResponse } from "@/services/api";
import { queryClient } from "@/services/query-client";

const employeeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  workShift: z.string().min(1, "Turno de trabalho é obrigatório"),
  jobTitleId: z.string().min(1, "ID do cargo é obrigatório"),
  status: z.enum(["ATIVO", "INATIVO"]),
});

export type FormFields = z.infer<typeof employeeSchema>;

export function useUpdateEmployee(onClose: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      workShift: "",
      jobTitleId: "",
      status: "ATIVO",
    },
  });

  const updateMutation = useMutation<
    IApiResponse<IEmployee>,
    Error,
    IEmployeeCreateAndUpdate
  >({
    mutationFn: (data: IEmployeeCreateAndUpdate) => {
      if (!editingEmployee) throw new Error("No employee selected for editing");
      return EmployeeService.update(editingEmployee.id, data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      if (response.success && response.data) {
        console.log("Employee updated:", response.data);
        setIsSuccess(true);
        toast.success("Funcionário atualizado com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
      toast.error(
        error.message ||
          "Ocorreu um erro ao atualizar o funcionário. Tente novamente."
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const deleteMutation = useMutation<IApiResponse<void>, Error, string>({
    mutationFn: EmployeeService.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Funcionário excluído com sucesso!");
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      toast.error(
        error.message ||
          "Ocorreu um erro ao excluir o funcionário. Tente novamente."
      );
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitting form:", data);
    setIsSubmitting(true);
    if (editingEmployee) {
      console.log("editingEmployee:", editingEmployee);
      const updateData: IEmployeeCreateAndUpdate = {
        name: data.name,
        workShift: data.workShift,
        jobTitleId: data.jobTitleId,
        status: data.status,
      };
      updateMutation.mutate(updateData);
    }
  });

  const handleEdit = (employee: IEmployee) => {
    console.log("Editing employee:", employee);
    setEditingEmployee(employee);
    form.reset({
      name: employee.name,
      workShift: employee.workShift,
      jobTitleId: employee.jobTitleId.toString(),
      status: employee.status as "ATIVO" | "INATIVO",
    });
  };

  const handleDelete = (employeeId: string) => {
    deleteMutation.mutate(employeeId);
  };

  useEffect(() => {
    if (editingEmployee) {
      form.reset({
        name: editingEmployee.name,
        workShift: editingEmployee.workShift,
        jobTitleId: editingEmployee.jobTitleId.toString(),
        status: editingEmployee.status as "ATIVO" | "INATIVO",
      });
    }
  }, [editingEmployee, form]);

  return {
    form,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting,
    handleEdit,
    handleDelete,
    onClose,
    editingEmployee,
    setEditingEmployee,
    isSuccess,
    setIsSuccess,
  };
}
