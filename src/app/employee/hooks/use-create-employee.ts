import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { queryClient } from "@/shared/services/query-client";
import { EmployeeService } from "@/shared/services/employee";
import { IApiResponse } from "@/shared/services/api";
import {
  IEmployee,
  IEmployeeCreateAndUpdate,
} from "@/shared/types/employee.interface";
import {
  createEmployeeSchema,
  CreateEmployeeData,
} from "@/validations/create-employee";

export function useCreateEmployee() {
  const [isCreateEmployeeOpen, setIsCreateEmployeeOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const defaultValues: CreateEmployeeData = {
    name: "",
    workShift: "",
    jobTitleId: "",
    isActive: true,
  };

  const createEmployeeForm = useForm<CreateEmployeeData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createEmployeeForm;

  const { mutate, isPending } = useMutation<
    IApiResponse<IEmployee>,
    Error,
    IEmployeeCreateAndUpdate
  >({
    mutationFn: EmployeeService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      if (response.success && response.data) {
        toast.success("Funcionário criado com sucesso!");
        setIsSuccess(true);
        setIsCreateEmployeeOpen(false);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar o funcionário.");
      setIsCreateEmployeeOpen(false);
    },
  });

  const submitEmployeeData = (data: CreateEmployeeData) => {
    mutate(data);
  };

  const resetForm = () => {
    reset();
    setIsSuccess(false);
  };

  return {
    createEmployeeForm,
    handleSubmit: handleSubmit(submitEmployeeData),
    isSubmitting,
    isPending,
    isSuccess,
    isCreateEmployeeOpen,
    setIsCreateEmployeeOpen,
    resetForm,
  };
}

export type FormFields = keyof CreateEmployeeData;
