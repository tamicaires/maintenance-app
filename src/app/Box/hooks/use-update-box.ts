import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { BoxService } from "@/services/box";
import { IApiResponse } from "@/services/api";
import { queryClient } from "@/services/query-client";
import { IBox, IBoxCreateAndUpdate } from "@/interfaces/box";

const boxSchema = z.object({
  name: z.string().min(1, "Identificação do box é obrigatória"),
  description: z.string().nullable(),
  isActive: z.boolean().default(true),
});

export type FormFields = z.infer<typeof boxSchema>;

export function useUpdateBox(onClose: () => void) {
  const [open, setOpen] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBox, setEditingBox] = useState<IBox | null>(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(boxSchema),
    defaultValues: {
      name: "",
      description: null,
      isActive: true,
    },
  });

  const updateMutation = useMutation<IApiResponse<IBox>, Error, IBoxCreateAndUpdate>(
    {
      mutationFn: (data: IBoxCreateAndUpdate) => {
        if (!editingBox) throw new Error("No box selected for editing");
        return BoxService.update(editingBox.id, data);
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["boxes"] });
        if (response.success && response.data) {
          toast.success("Box atualizado com sucesso!");
        }
        onClose();
      },
      onError: (error) => {
        console.error("Error updating box:", error);
        toast.error(
          error.message ||
          "Aconteceu um erro durante a alteração do box. Tente novamente."
        );
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    }
  );

  const deleteMutation = useMutation<IApiResponse<void>, Error, string>({
    mutationFn: BoxService.deleteBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      toast.success("Box deletado com sucesso!");
    },
    onError: (error) => {
      console.error("Error deleting box:", error);
      toast.error(
        error.message || "Aconteceu um erro durante a exclusão do box. Tente novamente."
      );
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Submitting form:", data);
    setIsSubmitting(true);
    if (editingBox) {
      const updateData: IBoxCreateAndUpdate = {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
      };
      updateMutation.mutate(updateData);
    }
  });

  const handleEdit = (box: IBox) => {
    console.log("open ", open);
    setEditingBox(box);
    form.reset({
      name: box.name,
      description: box.description,
      isActive: box.isActive,
    });
  };

  const handleDelete = (boxId: string) => {
    deleteMutation.mutate(boxId);
  };

  useEffect(() => {
    if (editingBox) {
      form.reset({
        name: editingBox.name,
        description: editingBox.description,
        isActive: editingBox.isActive,
      });
    }
  }, [editingBox, form]);

  return {
    form,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting,
    handleEdit,
    handleDelete,
    open,
    setOpen,
    editingBox,
    setEditingBox,
  };
}