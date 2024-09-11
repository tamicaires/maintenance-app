import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { queryClient } from "@/services/query-client";
import { FleetService } from "@/services/fleet";
import { toast } from "sonner";
import { IApiResponse } from "@/services/api";
import { IFleet, IFleetCreate } from "@/interfaces/fleet.interface";
import { createFleetSchema } from "@/validations/create-fleet";

export type CreateFleetData = z.infer<typeof createFleetSchema>;

const adaptCreateFleetDataToIFleetCreate = (
  data: CreateFleetData
): IFleetCreate => ({
  fleetNumber: data.fleetNumber,
  plate: data.plate,
  firstTrailerPlate: data.firstTrailerPlate || "",
  secondTrailerPlate: data.secondTrailerPlate || "",
  thirdTrailerPlate: data.thirdTrailerPlate || "",
  km: data.km,
  status: data.status,
  carrierId: data.carrierId,
});

export function useCreateFleet(setShowModal: (show: boolean) => void) {
  const defaultValues: CreateFleetData = {
    fleetNumber: "",
    plate: "",
    firstTrailerPlate: "",
    secondTrailerPlate: "",
    thirdTrailerPlate: "",
    km: "",
    carrierId: "",
    status: "ATIVO",
  };

  const createFleetForm = useForm<CreateFleetData>({
    resolver: zodResolver(createFleetSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = createFleetForm;

  const {
    mutate: mutateCreate,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation<IApiResponse<IFleet>, Error, IFleetCreate>({
    mutationFn: FleetService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["fleets"] });
      if (response.success && response.data) {
        console.log("Fleet created:", response.data);
        toast.success("Frota criada com sucesso!");
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message || "Ocorreu um erro ao criar a frota.");
    },
  });

  const submitFleetData = (data: CreateFleetData) => {
    const adaptedData = adaptCreateFleetDataToIFleetCreate(data);
    mutateCreate(adaptedData);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
    }
  }, [isSuccess, setShowModal]);

  const formatPlate = (value: string) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (cleaned.length <= 3) return cleaned;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}`;
  };

  return {
    createFleetForm,
    handleSubmit: handleSubmit(submitFleetData),
    isSubmitting,
    isError,
    error,
    data,
    formatPlate,
  };
}

export const carriers = [
  { value: "carrier1", label: "Carrier 1" },
  { value: "carrier2", label: "Carrier 2" },
  { value: "carrier3", label: "Carrier 3" },
];

export type FormFields = keyof CreateFleetData;
