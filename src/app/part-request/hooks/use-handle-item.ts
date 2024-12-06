import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PartRequestItem, partRequestItemSchema } from "@/validations/create-part-request-batch";

export function usePartRequestItems(initialItems: PartRequestItem[] = []) {
  const [items, setItems] = useState<PartRequestItem[]>(initialItems);
  const [currentItem, setCurrentItem] = useState<PartRequestItem | null>(null);

  const SUCCESS_MESSAGES = {
    addItem: "Item adicionado com sucesso!",
    removeItem: "Item removido com sucesso!",
    updateItem: "Item atualizado com sucesso!",
  };

  const ERROR_MESSAGES = {
    addItem: "Erro ao adicionar item.",
    validationFailed: "Erro de validação.",
  };

  const validateItem = (item: PartRequestItem): true | z.ZodError => {
    try {
      partRequestItemSchema.parse(item);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) return error;
      throw new Error(ERROR_MESSAGES.validationFailed);
    }
  };

  const handleValidationErrors = (error: z.ZodError) => {
    error.errors.forEach((err) => toast.error(err.message));
  };

  const addItem = (newItem: PartRequestItem) => {
    const validationResult = validateItem(newItem);

    if (validationResult === true) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems, newItem];
        toast.success(SUCCESS_MESSAGES.addItem);
        return updatedItems;
      });
    } else {
      handleValidationErrors(validationResult);
    }
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      toast.success(SUCCESS_MESSAGES.removeItem);
      return updatedItems;
    });
  };

  const setCurrentItemByIndex = (index: number) => {
    const selectedItem = items[index] || null;
    setCurrentItem(selectedItem);
  };

  const updateItem = (index: number, updatedData: Partial<PartRequestItem>) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) =>
        i === index ? { ...item, ...updatedData } : item
      );
      toast.success(SUCCESS_MESSAGES.updateItem);
      return updatedItems;
    });
  };

  const clearItems = () => {
    setItems([]);
    setCurrentItem(null);
  };

  const clearCurrentItem = () => {
    setCurrentItem(null);
  };

  const getItems = () => items;

  return {
    items,
    currentItem,
    addItem,
    removeItem,
    setCurrentItemByIndex,
    updateItem,
    clearItems,
    clearCurrentItem,
    getItems,
  };
}
