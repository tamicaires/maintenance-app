import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  X,
  CheckCircle,
  MoreHorizontal,
  ArrowLeftRight,
  ArrowDown01,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ITrailer } from "@/shared/types/trailer.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TrailerWidgetProps {
  trailer: ITrailer;
  trigger?: React.ReactNode;
  onEdit?: (trailer: ITrailer) => void;
}

export function TrailerWidgetDetails({
  trailer: initialTrailer,
  trigger,
  onEdit,
}: TrailerWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [trailer, setTrailer] = useState<ITrailer>(initialTrailer);
  const [isOpen, setIsOpen] = useState(false); 

  const hasTrailerAxles = trailer.axles && trailer.axles.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrailer((prev) => {
      if (name === "fleetNumber" && prev.fleet) {
        return {
          ...prev,
          fleet: { ...prev.fleet, fleetNumber: value },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit?.(trailer);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTrailer(initialTrailer);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] w-full max-w-sm overflow-hidden rounded-3xl bg-white p-6 shadow-lg"
        showCloseButton={false}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* Header with Status */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-primary/10 px-2 rounded-lg">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  trailer.isActive ? "bg-primary" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-primary font-medium">
                {trailer.isActive ? "Ativo" : "Inativo"}
              </span>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <TrailerWidgetDetails
                    trailer={trailer}
                    trigger={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <ArrowLeftRight className="mr-2 h-4 w-4" />
                        Alterar Posição
                      </DropdownMenuItem>
                    }
                  />
                  <DropdownMenuItem onClick={() => {}}>
                    <ArrowDown01 className="mr-2 h-4 w-4" />
                    Alterar Frota
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Trailer Info */}
          <div className="mb-6 space-y-4">
            <div className="flex justify-between">
              <div className="flex-1 mr-4">
                <p className="text-sm text-muted-foreground">Placa</p>
                {isEditing ? (
                  <Input
                    name="plate"
                    value={trailer.plate}
                    onChange={handleChange}
                    className="text-2xl font-bold tracking-wider h-auto py-1"
                  />
                ) : (
                  <p className="text-2xl font-bold tracking-wider">
                    {trailer.plate}
                  </p>
                )}
              </div>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Posição</p>
                <p className="font-semibold">Posição {trailer.position}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Frota</p>
                <p className="font-semibold">
                  {trailer.fleet?.fleetNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Axle Configuration */}
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Eixos Vinculados
            </p>
            <div className="flex items-center justify-center gap-2">
              {trailer.axles && hasTrailerAxles ? (
                trailer.axles.map((axle) => (
                  <motion.div
                    key={axle.id}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-sm font-medium">{axle.position}</span>
                  </motion.div>
                ))
              ) : (
                <div className="text-sm font-semibold">
                  Nenhum eixo vinculado a esse Reboque
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button
                  className=" bg-primary hover:bg-primary/80"
                  onClick={handleSave}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleClose}>
                  Fechar
                </Button>
                <Button
                  className=" bg-primary hover:bg-primary/80"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
