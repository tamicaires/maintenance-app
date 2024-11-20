// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Truck,
//   Calendar,
//   Clock,
//   PenTool,
//   AlertTriangle,
//   CheckCircle,
//   MoreVertical,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Textarea } from "@/components/ui/textarea";

// export default function AdvancedServiceOrderForm() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const progress = useState(65)[0];

//   const serviceStatus = {
//     completed: 12,
//     inProgress: 3,
//     pending: 5,
//   };

//   return (
//     <Card className="w-full max-w-6xl mx-auto shadow-lg pt-16">
//       <CardHeader className="bg-primary text-primary-foreground">
//         <div className="flex justify-between items-center">
//           <div>
//             <CardTitle className="text-3xl font-bold">
//               Ordem de Serviço #24979
//             </CardTitle>
//             <p className="text-sm opacity-90">Manutenção Preventiva 10K</p>
//           </div>
//           <Badge variant="secondary" className="text-lg">
//             Em Progresso
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="p-6">
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-4 mb-6">
//             <TabsTrigger value="overview">Visão Geral</TabsTrigger>
//             <TabsTrigger value="details">Detalhes</TabsTrigger>
//             <TabsTrigger value="services">Serviços</TabsTrigger>
//             <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-xl">Progresso Geral</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <Progress value={progress} className="w-full h-4 mb-2" />
//                   <p className="text-sm text-muted-foreground text-center">
//                     {progress}% Completo
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-xl">Status dos Serviços</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex justify-between items-center">
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-green-500">
//                         {serviceStatus.completed}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         Concluídos
//                       </p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-yellow-500">
//                         {serviceStatus.inProgress}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         Em Andamento
//                       </p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-red-500">
//                         {serviceStatus.pending}
//                       </p>
//                       <p className="text-sm text-muted-foreground">Pendentes</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="md:col-span-2">
//                 <CardHeader>
//                   <CardTitle className="text-xl">
//                     Informações do Veículo
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div>
//                       <Label className="text-sm text-muted-foreground">
//                         Frota
//                       </Label>
//                       <p className="font-medium">22292</p>
//                     </div>
//                     <div>
//                       <Label className="text-sm text-muted-foreground">
//                         Placa
//                       </Label>
//                       <p className="font-medium">FJQ8C27</p>
//                     </div>
//                     <div>
//                       <Label className="text-sm text-muted-foreground">
//                         Empresa
//                       </Label>
//                       <p className="font-medium">VIA NOVE</p>
//                     </div>
//                     <div>
//                       <Label className="text-sm text-muted-foreground">
//                         Box
//                       </Label>
//                       <p className="font-medium">6</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="details">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-xl">Cronograma Detalhado</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <Calendar className="h-5 w-5 text-muted-foreground" />
//                       <span>Fila de Espera</span>
//                     </div>
//                     <span className="font-medium">23/08/2024 14:47</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <Clock className="h-5 w-5 text-muted-foreground" />
//                       <span>Entrada BOX</span>
//                     </div>
//                     <span className="font-medium">24/08/2024 13:25</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertTriangle className="h-5 w-5 text-yellow-500" />
//                       <span>Início Aguard. Peça</span>
//                     </div>
//                     <span className="font-medium">24/08/2024 22:20</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="h-5 w-5 text-green-500" />
//                       <span>Fim Aguard. Peça</span>
//                     </div>
//                     <span className="font-medium">26/08 15:43</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <Truck className="h-5 w-5 text-muted-foreground" />
//                       <span>Saída BOX</span>
//                     </div>
//                     <span className="font-medium">26/08/2024 20:25</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="services">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-xl flex items-center">
//                   <PenTool className="h-5 w-5 mr-2" />
//                   Serviços Executados
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ScrollArea className="h-[400px] w-full">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Serviço</TableHead>
//                         <TableHead>Mecânico</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead>Ações</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {[
//                         {
//                           service: "Revisão no Sistema de Ar",
//                           mechanic: "P. HERIQUE/FERNANDO",
//                           status: "Concluído",
//                         },
//                         {
//                           service: "Revisão no Sistema Elétrico",
//                           mechanic: "IVAN",
//                           status: "Em Andamento",
//                         },
//                         {
//                           service: "Regulagem de Freios",
//                           mechanic: "PEDRO",
//                           status: "Pendente",
//                         },
//                         // Add more services as needed
//                       ].map((item, index) => (
//                         <TableRow key={index}>
//                           <TableCell>{item.service}</TableCell>
//                           <TableCell>
//                             <div className="flex items-center space-x-2">
//                               <Avatar className="h-6 w-6">
//                                 <AvatarImage
//                                   src={`/placeholder.svg?height=24&width=24`}
//                                   alt={item.mechanic}
//                                 />
//                                 <AvatarFallback>
//                                   {item.mechanic[0]}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <span>{item.mechanic}</span>
//                             </div>
//                           </TableCell>
//                           <TableCell>
//                             <Badge
//                               variant={
//                                 item.status === "Concluído"
//                                   ? "default"
//                                   : item.status === "Em Andamento"
//                                   ? "secondary"
//                                   : item.status === "Pendente"
//                                   ? "destructive"
//                                   : null
//                               }
//                             >
//                               {item.status}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>
//                             <DropdownMenu>
//                               <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" className="h-8 w-8 p-0">
//                                   <MoreVertical className="h-4 w-4" />
//                                 </Button>
//                               </DropdownMenuTrigger>
//                               <DropdownMenuContent align="end">
//                                 <DropdownMenuLabel>Ações</DropdownMenuLabel>
//                                 <DropdownMenuItem>
//                                   Ver Detalhes
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem>
//                                   Atualizar Status
//                                 </DropdownMenuItem>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem>
//                                   Remover Serviço
//                                 </DropdownMenuItem>
//                               </DropdownMenuContent>
//                             </DropdownMenu>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </ScrollArea>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="timeline">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-xl">Linha do Tempo</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
//                   {[
//                     {
//                       date: "26/08/2024 20:25",
//                       event: "Veículo liberado do BOX",
//                       icon: <Truck className="h-4 w-4" />,
//                     },
//                     {
//                       date: "26/08/2024 15:43",
//                       event: "Todas as peças disponíveis",
//                       icon: <CheckCircle className="h-4 w-4" />,
//                     },
//                     {
//                       date: "24/08/2024 22:20",
//                       event: "Aguardando peças",
//                       icon: <AlertTriangle className="h-4 w-4" />,
//                     },
//                     {
//                       date: "24/08/2024 13:25",
//                       event: "Início dos serviços",
//                       icon: <PenTool className="h-4 w-4" />,
//                     },
//                     {
//                       date: "23/08/2024 14:47",
//                       event: "Veículo na fila de espera",
//                       icon: <Clock className="h-4 w-4" />,
//                     },
//                   ].map((item, index) => (
//                     <div key={index} className="mb-10 ml-6">
//                       <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
//                         {item.icon}
//                       </span>
//                       <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
//                         {item.date}
//                       </time>
//                       <p className="text-base font-normal text-gray-500 dark:text-gray-400">
//                         {item.event}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         <Separator className="my-6" />

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
//           <div className="w-full md:w-2/3">
//             <Label
//               htmlFor="observations"
//               className="text-sm font-medium mb-2 block"
//             >
//               Observações
//             </Label>
//             <Textarea
//               id="observations"
//               placeholder="Adicione observações importantes aqui..."
//               className="min-h-[100px]"
//             />
//           </div>
//           <Button size="lg" className="w-full md:w-auto">
//             Finalizar Ordem de Serviço
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import {
//   ClipboardList,
//   Wrench,
//   Package,
//   Clock,
//   ChevronRight,
//   Search,
//   Filter,
//   Star,
//   FileDown,
// } from "lucide-react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { usePDF } from "react-to-pdf";

// const statusColors = {
//   "Em Progresso": "bg-yellow-500",
//   Concluído: "bg-green-500",
//   Pendente: "bg-red-500",
// };

// const AnimatedNumber = ({ value }) => {
//   const [displayValue, setDisplayValue] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayValue((prev) => {
//         const diff = value - prev;
//         const step = Math.ceil(diff / 10);
//         return prev + (diff > 0 ? Math.min(step, diff) : Math.max(step, diff));
//       });
//     }, 50);

//     return () => clearInterval(interval);
//   }, [value]);

//   return <span>{displayValue}</span>;
// };

// export default function TesteOrder() {
//   const [activeTab, setActiveTab] = useState("details");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const { toPDF, targetRef } = usePDF({
//     filename: "ordem-servico-manutencao.pdf",
//   });

//   const maintenanceData = {
//     id: "MNT-2023-001",
//     status: "Em Progresso",
//     type: "Manutenção Preventiva",
//     progress: 65,
//     trailer: {
//       id: "TRL-001",
//       model: "Carreta Graneleira",
//       plate: "ABC-1234",
//       year: 2020,
//     },
//     services: [
//       {
//         id: "SRV-001",
//         description: "Troca de óleo",
//         status: "Concluído",
//         duration: 2,
//       },
//       {
//         id: "SRV-002",
//         description: "Verificação de freios",
//         status: "Em Progresso",
//         duration: 3,
//       },
//       {
//         id: "SRV-003",
//         description: "Alinhamento",
//         status: "Pendente",
//         duration: 1.5,
//       },
//       {
//         id: "SRV-004",
//         description: "Calibragem de pneus",
//         status: "Concluído",
//         duration: 0.5,
//       },
//       {
//         id: "SRV-005",
//         description: "Inspeção de suspensão",
//         status: "Pendente",
//         duration: 2,
//       },
//     ],
//     parts: [
//       {
//         id: "PRT-001",
//         name: "Óleo de motor",
//         quantity: 20,
//         unit: "L",
//         cost: 500,
//       },
//       {
//         id: "PRT-002",
//         name: "Pastilha de freio",
//         quantity: 8,
//         unit: "pç",
//         cost: 320,
//       },
//       {
//         id: "PRT-003",
//         name: "Filtro de ar",
//         quantity: 1,
//         unit: "pç",
//         cost: 80,
//       },
//       {
//         id: "PRT-004",
//         name: "Fluido de freio",
//         quantity: 2,
//         unit: "L",
//         cost: 60,
//       },
//     ],
//     history: [
//       { date: "2023-05-15", description: "Início da manutenção", icon: "🚀" },
//       {
//         date: "2023-05-16",
//         description: "Troca de óleo concluída",
//         icon: "🛢️",
//       },
//       {
//         date: "2023-05-17",
//         description: "Inspeção de freios iniciada",
//         icon: "🔍",
//       },
//       { date: "2023-05-18", description: "Alinhamento agendado", icon: "📅" },
//     ],
//   };

//   const filteredServices = maintenanceData.services.filter(
//     (service) =>
//       service.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filterStatus === "all" || service.status === filterStatus)
//   );

//   const serviceStatusData = maintenanceData.services.reduce((acc, service) => {
//     acc[service.status] = (acc[service.status] || 0) + 1;
//     return acc;
//   }, {});

//   const pieChartData = Object.entries(serviceStatusData).map(
//     ([status, value]) => ({ name: status, value })
//   );

//   return (
//     <div
//       className="container mx-auto max-w-6xl bg-background min-h-screen p-16"
//       ref={targetRef}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="mb-6 overflow-hidden border-2 border-primary/20 shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground">
//             <div>
//               <CardTitle className="text-3xl font-bold">
//                 Ordem de Serviço de Manutenção
//               </CardTitle>
//               <CardDescription className="text-primary-foreground/70">
//                 ID: {maintenanceData.id}
//               </CardDescription>
//             </div>
//             <Badge
//               variant="secondary"
//               className={`text-lg py-1 px-3 ${
//                 statusColors[maintenanceData.status]
//               }`}
//             >
//               {maintenanceData.status}
//             </Badge>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Tipo de Manutenção
//                 </p>
//                 <p className="font-medium text-lg">{maintenanceData.type}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-muted-foreground">Progresso</p>
//                 <div className="flex items-center">
//                   <Progress
//                     value={maintenanceData.progress}
//                     className="w-[200px] mr-2"
//                   />
//                   <span className="font-bold text-lg">
//                     <AnimatedNumber value={maintenanceData.progress} />%
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <Separator className="my-4" />
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div>
//                 <p className="text-sm text-muted-foreground">ID da Carreta</p>
//                 <p className="font-medium text-lg">
//                   {maintenanceData.trailer.id}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Modelo</p>
//                 <p className="font-medium text-lg">
//                   {maintenanceData.trailer.model}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Placa</p>
//                 <p className="font-medium text-lg">
//                   {maintenanceData.trailer.plate}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Ano</p>
//                 <p className="font-medium text-lg">
//                   {maintenanceData.trailer.year}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <Tabs
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className="space-y-4"
//       >
//         <TabsList className="grid w-full grid-cols-4 bg-muted rounded-lg p-1">
//           {["details", "services", "parts", "history"].map((tab) => (
//             <TabsTrigger
//               key={tab}
//               value={tab}
//               className={`flex items-center justify-center py-2 ${
//                 activeTab === tab
//                   ? "bg-background shadow-sm"
//                   : "hover:bg-muted-foreground/10"
//               } rounded transition-all duration-200`}
//             >
//               {tab === "details" && <ClipboardList className="w-4 h-4 mr-2" />}
//               {tab === "services" && <Wrench className="w-4 h-4 mr-2" />}
//               {tab === "parts" && <Package className="w-4 h-4 mr-2" />}
//               {tab === "history" && <Clock className="w-4 h-4 mr-2" />}
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <TabsContent value="details">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Detalhes da Manutenção</CardTitle>
//                   <CardDescription>
//                     Informações detalhadas sobre a ordem de serviço
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center bg-muted p-3 rounded-lg">
//                         <span className="font-medium">Data de Início:</span>
//                         <span>15/05/2023</span>
//                       </div>
//                       <div className="flex justify-between items-center bg-muted p-3 rounded-lg">
//                         <span className="font-medium">
//                           Previsão de Término:
//                         </span>
//                         <span>20/05/2023</span>
//                       </div>
//                       <div className="flex justify-between items-center bg-muted p-3 rounded-lg">
//                         <span className="font-medium">Responsável:</span>
//                         <span>João Silva</span>
//                       </div>
//                       <div className="flex justify-between items-center bg-muted p-3 rounded-lg">
//                         <span className="font-medium">Prioridade:</span>
//                         <Badge variant="destructive">Alta</Badge>
//                       </div>
//                     </div>
//                     <div className="flex flex-col justify-center items-center bg-muted p-4 rounded-lg">
//                       <h3 className="text-lg font-semibold mb-2">
//                         Status dos Serviços
//                       </h3>
//                       <ResponsiveContainer width="100%" height={200}>
//                         <PieChart>
//                           <Pie
//                             data={pieChartData}
//                             dataKey="value"
//                             nameKey="name"
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={80}
//                             fill="hsl(var(--primary))"
//                             label
//                           >
//                             {pieChartData.map((entry, index) => (
//                               <Cell
//                                 key={`cell-${index}`}
//                                 fill={`hsl(var(--${
//                                   Object.keys(statusColors)[index]
//                                 }))`}
//                               />
//                             ))}
//                           </Pie>
//                           <Tooltip />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="services">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Serviços</CardTitle>
//                   <CardDescription>
//                     Lista de serviços a serem realizados
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex justify-between items-center mb-4">
//                     <div className="relative">
//                       <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         placeholder="Pesquisar serviços"
//                         className="pl-8"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Filter className="h-4 w-4 text-muted-foreground" />
//                       <select
//                         className="border rounded p-1"
//                         value={filterStatus}
//                         onChange={(e) => setFilterStatus(e.target.value)}
//                       >
//                         <option value="all">Todos</option>
//                         <option value="Concluído">Concluído</option>
//                         <option value="Em Progresso">Em Progresso</option>
//                         <option value="Pendente">Pendente</option>
//                       </select>
//                     </div>
//                   </div>
//                   <ScrollArea className="h-[300px] w-full rounded-md border p-4">
//                     {filteredServices.map((service) => (
//                       <motion.div
//                         key={service.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="flex justify-between items-center mb-4 last:mb-0 bg-card p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div>
//                           <p className="font-medium">{service.description}</p>
//                           <p className="text-sm text-muted-foreground">
//                             ID: {service.id}
//                           </p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Badge variant="outline">{service.duration}h</Badge>
//                           <Badge
//                             variant="secondary"
//                             className={statusColors[service.status]}
//                           >
//                             {service.status}
//                           </Badge>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </ScrollArea>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="parts">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Peças</CardTitle>
//                   <CardDescription>
//                     Peças utilizadas na manutenção
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ScrollArea className="h-[300px] w-full rounded-md border p-4">
//                     {maintenanceData.parts.map((part) => (
//                       <motion.div
//                         key={part.id}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="flex justify-between items-center mb-4 last:mb-0 bg-card p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div>
//                           <p className="font-medium">{part.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             ID: {part.id}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-medium">
//                             {part.quantity} {part.unit}
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             Custo: R$ {part.cost.toFixed(2)}
//                           </p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </ScrollArea>
//                   <div className="mt-4">
//                     <h3 className="text-lg font-semibold mb-2">
//                       Custo Total de Peças
//                     </h3>
//                     <ResponsiveContainer width="100%" height={200}>
//                       <BarChart data={maintenanceData.parts}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="cost" fill="hsl(var(--primary))" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="history">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Histórico</CardTitle>
//                   <CardDescription>
//                     Registro de atividades da manutenção
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ScrollArea className="h-[300px] w-full rounded-md border p-4">
//                     {maintenanceData.history.map((item, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.1 }}
//                         className="flex items-center mb-4 last:mb-0 bg-card p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl">
//                           {item.icon}
//                         </div>
//                         <div className="ml-4 flex-grow">
//                           <p className="font-medium">{item.description}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {item.date}
//                           </p>
//                         </div>
//                         <ChevronRight className="w-5 h-5 text-muted-foreground" />
//                       </motion.div>
//                     ))}
//                   </ScrollArea>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </motion.div>
//         </AnimatePresence>
//       </Tabs>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="mt-6 flex justify-between items-center"
//       >
//         <div className="flex items-center space-x-2">
//           <Star className="text-primary" />
//           <span className="font-medium">Avalie esta manutenção</span>
//         </div>
//         <div className="space-x-4">
//           <Button variant="outline">Cancelar</Button>
//           <Button>Salvar Alterações</Button>
//           <Button onClick={() => toPDF()} variant="secondary">
//             <FileDown className="w-4 h-4 mr-2" />
//             Exportar PDF
//           </Button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
