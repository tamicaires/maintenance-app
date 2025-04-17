import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Car,
  Eye,
  FileText,
  MoreHorizontal,
  Route,
  Share2,
  Tag,
  Truck,
  Wrench,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface IFleet {
  id: string;
  fleetNumber: string;
  name?: string;
}

export interface IVehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: string;
  color: string | null;
  km: number;
  power: number;
  isActive: boolean;
  fleetId: string | null;
  fleet: Pick<IFleet, "id" | "fleetNumber"> | null;
  fleets?: Array<Pick<IFleet, "id" | "fleetNumber">>; // Suporte para múltiplas frotas
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVehicleWithMetrics extends IVehicle {
  // Campos opcionais que podem ou não estar disponíveis
  maintenanceHistory?: Array<{
    id: string;
    date: Date;
    type: string;
    description: string;
    cost: number;
  }>;
}

interface VehicleCardProps {
  vehicle: IVehicleWithMetrics;
  onViewDetails?: (id: string) => void;
  onScheduleMaintenance?: (id: string) => void;
  onRegisterTrip?: (id: string) => void;
  onReportIssue?: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  onViewDetails,
  onScheduleMaintenance,
  onRegisterTrip,
  onReportIssue,
}: VehicleCardProps) {
  const [isVehicleCardOpen, setIsVehicleCardOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("overview");

  const getVehicleAge = () => {
    const currentYear = new Date().getFullYear();
    const vehicleYear = Number.parseInt(vehicle.year);
    return currentYear - vehicleYear;
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatNumber = (value?: number, suffix = "") => {
    if (value === undefined) return "N/A";
    return `${value.toLocaleString("pt-BR")}${suffix}`;
  };

  const handleClose = () => {
    setIsVehicleCardOpen(false);
  };

  return (
    <Dialog open={isVehicleCardOpen} onOpenChange={setIsVehicleCardOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-1 h-auto">
          <Eye className="text-muted-foreground h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogTitle hidden>Detalhes do Veículo</DialogTitle>
        <AnimatePresence>
          {isVehicleCardOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-white rounded-xl shadow-lg"
            >
              <div className="relative">
                {/* Header with gradient background */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary to-primary/90 rounded-t-xl" />

                <div className="relative pt-6 px-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow-md border-4 border-white">
                        {vehicle.brand.toLowerCase().includes("volvo") ||
                        vehicle.model.toLowerCase().includes("fh") ? (
                          <Truck className="w-12 h-12 text-primary" />
                        ) : (
                          <Car className="w-12 h-12 text-primary" />
                        )}
                      </div>

                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-white">
                            {vehicle.plate}
                          </h2>
                          {vehicle.isActive ? (
                            <Badge className="bg-green-500/20 text-white border-none">
                              Ativo
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-white/80 backdrop-blur-sm"
                            >
                              Inativo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-white/90">
                          {vehicle.brand} {vehicle.model} ({vehicle.year})
                        </p>

                        {vehicle.fleet && (
                          <p className="text-xs text-white/80 mt-1">
                            Frota: {vehicle.fleet.fleetNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                              onClick={() =>
                                onViewDetails && onViewDetails(vehicle.id)
                              }
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Compartilhar</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              onViewDetails && onViewDetails(vehicle.id)
                            }
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Ver detalhes completos
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onScheduleMaintenance &&
                              onScheduleMaintenance(vehicle.id)
                            }
                          >
                            <Wrench className="h-4 w-4 mr-2" />
                            Agendar manutenção
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onRegisterTrip && onRegisterTrip(vehicle.id)
                            }
                          >
                            <Route className="h-4 w-4 mr-2" />
                            Registrar viagem
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-500 focus:text-red-500"
                            onClick={() => {
                              onReportIssue && onReportIssue(vehicle.id);
                              handleClose();
                            }}
                          >
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Reportar problema
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Tabs navigation */}
                  <Tabs
                    defaultValue="overview"
                    className="mt-8"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="backdrop-blur-sm">
                      <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                      <TabsTrigger value="details">Detalhes</TabsTrigger>
                      {vehicle.maintenanceHistory &&
                        vehicle.maintenanceHistory.length > 0 && (
                          <TabsTrigger value="history">Histórico</TabsTrigger>
                        )}
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="pt-4 pb-2">
                      <div className="grid grid-cols-3 gap-3">
                        <motion.div
                          className="flex flex-col items-center p-4 bg-gray-50 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-blue-100 text-primary">
                            <Route className="w-5 h-5" />
                          </div>
                          <span className="text-xs text-gray-500">
                            Quilometragem
                          </span>
                          <span className="text-sm font-medium">
                            {formatNumber(vehicle.km, " km")}
                          </span>
                        </motion.div>

                        <motion.div
                          className="flex flex-col items-center p-4 bg-gray-50 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-blue-100 text-primary">
                            <Tag className="w-5 h-5" />
                          </div>
                          <span className="text-xs text-gray-500">
                            Potência
                          </span>
                          <span className="text-sm font-medium">
                            {formatNumber(vehicle.power, " cv")}
                          </span>
                        </motion.div>

                        <motion.div
                          className="flex flex-col items-center p-4 bg-gray-50 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-blue-100 text-primary">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <span className="text-xs text-gray-500">Idade</span>
                          <span className="text-sm font-medium">
                            {getVehicleAge()} anos
                          </span>
                        </motion.div>
                      </div>

                      <div className="mt-4 space-y-4">
                        <motion.div
                          className="p-4 bg-gray-50 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Truck className="w-5 h-5 text-primary" />
                            <h4 className="text-sm font-semibold">
                              Informações do Veículo
                            </h4>
                          </div>
                          <div className="ml-8 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Marca:
                              </span>
                              <span className="text-sm font-medium">
                                {vehicle.brand}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Modelo:
                              </span>
                              <span className="text-sm font-medium">
                                {vehicle.model}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Ano:
                              </span>
                              <span className="text-sm font-medium">
                                {vehicle.year}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Placa:
                              </span>
                              <span className="text-sm font-medium">
                                {vehicle.plate}
                              </span>
                            </div>
                            {vehicle.color && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  Cor:
                                </span>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: vehicle.color }}
                                  />
                                  <span className="text-sm font-medium">
                                    {vehicle.color}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>

                        {/* Frotas vinculadas */}
                        {(vehicle.fleets && vehicle.fleets.length > 0) ||
                        vehicle.fleet ? (
                          <motion.div
                            className="p-4 bg-gray-50 rounded-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Tag className="w-5 h-5 text-primary" />
                              <h4 className="text-sm font-semibold">
                                Frotas Vinculadas
                              </h4>
                            </div>
                            <div className="ml-8">
                              {vehicle.fleet && (
                                <Badge variant="secondary" className="mr-2 mb-2 ">
                                  {vehicle.fleet.fleetNumber}
                                </Badge>
                              )}
                              {vehicle.fleets &&
                                vehicle.fleets.map((fleet) => (
                                  <Badge
                                    key={fleet.id}
                                    variant="outline"
                                    className="mr-2 mb-2"
                                  >
                                    {fleet.fleetNumber}
                                  </Badge>
                                ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </div>
                    </TabsContent>

                    {/* Details Tab */}
                    <TabsContent
                      value="details"
                      className="pt-4 pb-2 space-y-4"
                    >
                      <motion.div
                        className="p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-sm font-semibold mb-3">
                          Informações Técnicas
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Quilometragem:
                            </span>
                            <span className="text-sm font-medium">
                              {formatNumber(vehicle.km, " km")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Potência:
                            </span>
                            <span className="text-sm font-medium">
                              {formatNumber(vehicle.power, " cv")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Status:
                            </span>
                            <span className="text-sm font-medium">
                              {vehicle.isActive ? "Ativo" : "Inativo"}
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <h4 className="text-sm font-semibold mb-3">Datas</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Cadastrado em:
                            </span>
                            <span className="text-sm font-medium">
                              {formatDate(vehicle.createdAt)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Última atualização:
                            </span>
                            <span className="text-sm font-medium">
                              {formatDate(vehicle.updatedAt)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Idade do veículo:
                            </span>
                            <span className="text-sm font-medium">
                              {getVehicleAge()} anos
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>

                    {/* History Tab - Só aparece se houver histórico de manutenção */}
                    {vehicle.maintenanceHistory &&
                      vehicle.maintenanceHistory.length > 0 && (
                        <TabsContent value="history" className="pt-4 pb-2">
                          <motion.div
                            className="p-4 bg-gray-50 rounded-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <Wrench className="w-5 h-5 text-primary" />
                              <h4 className="text-sm font-semibold">
                                Histórico de Manutenção
                              </h4>
                            </div>
                            <div className="space-y-4">
                              {vehicle.maintenanceHistory.map((maintenance) => (
                                <div
                                  key={maintenance.id}
                                  className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="text-sm font-medium">
                                        {maintenance.type}
                                      </span>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {maintenance.description}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xs text-gray-500">
                                        {formatDate(maintenance.date)}
                                      </span>
                                      <p className="text-xs font-medium">
                                        {formatCurrency(maintenance.cost)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </TabsContent>
                      )}
                  </Tabs>
                </div>

                <div className="p-4 flex justify-end border-t mt-2">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="rounded-lg mr-2"
                  >
                    Fechar
                  </Button>

                  <Button
                    onClick={() => {
                      onScheduleMaintenance &&
                        onScheduleMaintenance(vehicle.id);
                      handleClose();
                    }}
                  >
                    Agendar Manutenção
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
