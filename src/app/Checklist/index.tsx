import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BarChart3,
  Calendar,
  Clock,
  User,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  isConforming: boolean | null;
  needsPart: boolean;
  priority: "low" | "medium" | "high";
}

interface Part {
  id: string;
  name: string;
  category: string;
}

const mockParts: Part[] = [
  { id: "1", name: "Parafuso M10", category: "Fixadores" },
  { id: "2", name: "Rolamento 6205", category: "Rolamentos" },
  {
    id: "3",
    name: 'Mangueira Hidráulica 1/2"',
    category: "Sistema Hidráulico",
  },
  { id: "4", name: "Filtro de Óleo", category: "Motor" },
  { id: "5", name: "Lâmpada 24V", category: "Elétrica" },
];

const generateMockData = (count: number): ChecklistItem[] => {
  const categories = [
    "Chassis",
    "Pneus",
    "Sistema Hidráulico",
    "Elétrica",
    "Suspensão",
    "Freios",
  ];
  const priorities = ["low", "medium", "high"] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    item: `Item de checklist ${i + 1}`,
    isConforming: null,
    needsPart: Math.random() < 0.3,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  }));
};

const checklistData: ChecklistItem[] = generateMockData(30);

export default function MaintenanceChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(checklistData);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [isPartDialogOpen, setIsPartDialogOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredChecklist = checklist.filter(
    (item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "all" ||
        (activeTab === "conforming" && item.isConforming === true) ||
        (activeTab === "non-conforming" && item.isConforming === false) ||
        (activeTab === "pending" && item.isConforming === null))
  );

  const groupedChecklist = filteredChecklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const updateItemStatus = (id: string, isConforming: boolean) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isConforming } : item))
    );
  };

  const openPartDialog = (item: ChecklistItem) => {
    setSelectedItem(item);
    setIsPartDialogOpen(true);
  };

  const progress =
    (checklist.filter((item) => item.isConforming === true).length /
      checklist.length) *
    100;

  const getPriorityColor = (priority: ChecklistItem["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const conformingCount = checklist.filter(
    (item) => item.isConforming === true
  ).length;
  const nonConformingCount = checklist.filter(
    (item) => item.isConforming === false
  ).length;
  const pendingCount = checklist.filter(
    (item) => item.isConforming === null
  ).length;

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8 mt-16">
      <div className="flex-grow">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Checklist de Manutenção
                </h1>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Badge variant="outline" className="text-base py-1 px-2">
                    OS-001
                  </Badge>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="flex items-center">
                    <Truck className="mr-1 h-4 w-4" />
                    Caminhão XYZ-1234
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    22/10/2023
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" /> Ver Ordem de Serviço
                </Button>
                <Button variant="default" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" /> Gerar Relatório
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground mb-1">
                  Técnico Responsável
                </span>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">João da Silva</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground mb-1">
                  Tempo Estimado
                </span>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>3 horas</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground mb-1">
                  Progresso
                </span>
                <div className="flex items-center space-x-2">
                  <Progress value={progress} className="h-2 flex-grow" />
                  <span className="text-sm font-medium">
                    {progress.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-3 justify-between">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="conforming">Conformes</TabsTrigger>
                <TabsTrigger value="non-conforming">Não Conformes</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar itens..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <ScrollArea className="h-[600px] rounded-md border p-4">
            <AnimatePresence>
              {Object.entries(groupedChecklist).map(([category, items]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 bg-card rounded-lg shadow-sm overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between px-4 py-2 cursor-pointer bg-muted"
                    onClick={() => toggleCategory(category)}
                  >
                    <h2 className="text-xl font-semibold">{category}</h2>
                    {expandedCategories.includes(category) ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>
                  <AnimatePresence>
                    {expandedCategories.includes(category) && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="divide-y divide-border"
                      >
                        {items.map((item) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 py-2 flex items-center justify-between "
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-3 h-3 rounded-full ${getPriorityColor(
                                  item.priority
                                )}`}
                              />
                              <span>{item.item}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={
                                  item.isConforming === true
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => updateItemStatus(item.id, true)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant={
                                  item.isConforming === false
                                    ? "destructive"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => updateItemStatus(item.id, false)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              {item.isConforming === false &&
                                item.needsPart && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openPartDialog(item)}
                                  >
                                    <Wrench className="mr-2 h-4 w-4" />
                                    Solicitar Peça
                                  </Button>
                                )}
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </div>

        <Dialog open={isPartDialogOpen} onOpenChange={setIsPartDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Solicitar Peça para {selectedItem?.item}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="part-select" className="text-right">
                  Peça:
                </Label>
                <Select value={selectedPart} onValueChange={setSelectedPart}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma peça" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockParts.map((part) => (
                      <SelectItem key={part.id} value={part.id}>
                        {part.name} - {part.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantidade:
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Solicitar Peça</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button className="fixed bottom-6 right-6 rounded-full shadow-lg">
          Finalizar Checklist
        </Button>
      </div>

      <div className="w-80 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Conformes
                </span>
                <Badge variant="secondary">{conformingCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                  Não Conformes
                </span>
                <Badge variant="secondary">{nonConformingCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                  Pendentes
                </span>
                <Badge variant="secondary">{pendingCount}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peças Solicitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockParts.slice(0, 3).map((part) => (
                <li key={part.id} className="flex justify-between items-center">
                  <span>{part.name}</span>
                  <Badge>1</Badge>
                </li>
              ))}
            </ul>
            <Button variant="link" className="mt-2 w-full">
              Ver todas as peças
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Tempo Total</span>
                <span className="font-semibold">2h 30min</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Itens por Hora</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Eficiência</span>
                <span className="font-semibold text-green-500">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
