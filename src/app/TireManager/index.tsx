// import React, { useState, useEffect, useRef } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Truck, Disc, Info } from "lucide-react";
// import Tire from "@/components/IconsComponents/tire";

// // Tipos de pneus
// const tiposPneus = [
//   { id: 1, nome: "Pneu Dianteiro", sulco: 8, pressao: 100, km: 50000 },
//   { id: 2, nome: "Pneu Traseiro", sulco: 10, pressao: 110, km: 40000 },
//   { id: 3, nome: "Pneu de Carga", sulco: 12, pressao: 120, km: 30000 },
//   { id: 4, nome: "Pneu Dianteiro", sulco: 8, pressao: 100, km: 50000 },
//   { id: 5, nome: "Pneu Traseiro", sulco: 10, pressao: 110, km: 40000 },
//   { id: 6, nome: "Pneu de Carga", sulco: 12, pressao: 120, km: 30000 },
//   { id: 7, nome: "Pneu Dianteiro", sulco: 8, pressao: 100, km: 50000 },
//   { id: 8, nome: "Pneu Traseiro", sulco: 10, pressao: 110, km: 40000 },
//   { id: 9, nome: "Pneu de Carga", sulco: 12, pressao: 120, km: 30000 },
// ];

// // Componente de Pneu
// const Pneu = ({
//   id,
//   tipo,
//   index,
//   moverPneu,
//   selecionarPneu,
//   isSelected,
//   localizacao,
// }) => {
//   const ref = useRef(null);
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "pneu",
//     item: { id, tipo, index, localizacao },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   drag(ref);

//   const handleClick = (e) => {
//     e.stopPropagation();
//     selecionarPneu({ id, tipo, localizacao });
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
//       onClick={handleClick}
//     >
//       <div
//         className={`w-40 h-40 flex flex-col items-center justify-center py-10 ${
//           isSelected ? "" : "border-gray-300"
//         } `}
        
//       >
//         <Tire size={isSelected ? 78 : 60} />
//         <p className={`mt-2 text-sm font-semibold ${isSelected ? "text-primary": ""}`}>{tipo.nome}</p>
//       </div>
//     </motion.div>
//   );
// };

// // Componente de Posição no Chassi
// const PosicaoChassi = ({
//   index,
//   pneu,
//   moverPneu,
//   selecionarPneu,
//   pneuSelecionado,
// }) => {
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "pneu",
//     drop: (item) => moverPneu(item.index, index, item.localizacao),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className={`w-32 h-32 border-2 border-dashed ${
//         isOver ? "border-primary" : "border-gray-400"
//       } rounded-full flex items-center justify-center`}
//     >
//       {pneu && (
//         <Pneu
//           id={pneu.id}
//           tipo={pneu.tipo}
//           index={index}
//           moverPneu={moverPneu}
//           selecionarPneu={selecionarPneu}
//           isSelected={pneuSelecionado && pneuSelecionado.id === pneu.id}
//           localizacao="chassi"
//         />
//       )}
//     </div>
//   );
// };

// // Componente principal
// const GestaoReboque = () => {
//   const [pneusEstoque, setPneusEstoque] = useState(
//     tiposPneus.map((tipo) => ({
//       id: Math.random(),
//       tipo,
//       localizacao: "estoque",
//     }))
//   );
//   const [pneusChassi, setPneusChassi] = useState(Array(6).fill(null));
//   const [pneuSelecionado, setPneuSelecionado] = useState(null);

//   const moverPneu = (de, para, localizacaoOrigem) => {
//     if (de === para) return;

//     const novoPneusEstoque = [...pneusEstoque];
//     const novoPneusChassi = [...pneusChassi];

//     let pneuMovido;

//     if (localizacaoOrigem === "estoque") {
//       // Movendo do estoque para o chassi
//       const estoqueIndex = novoPneusEstoque.findIndex((p) => p.id === de);
//       if (estoqueIndex !== -1) {
//         [pneuMovido] = novoPneusEstoque.splice(estoqueIndex, 1);
//         pneuMovido.localizacao = "chassi";
//         novoPneusChassi[para] = pneuMovido;
//       }
//     } else if (localizacaoOrigem === "chassi") {
//       // Movendo do chassi para outro lugar no chassi
//       [pneuMovido] = novoPneusChassi.splice(de, 1, null);
//       novoPneusChassi[para] = pneuMovido;
//     }

//     setPneusEstoque(novoPneusEstoque);
//     setPneusChassi(novoPneusChassi);

//     // Aqui você chamaria a API para atualizar a localização do pneu
//     // atualizarLocalizacaoPneu(pneuMovido.id, 'chassi', para)
//   };

//   const selecionarPneu = (pneu) => {
//     setPneuSelecionado(pneu);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPneusEstoque((pneus) =>
//         pneus.map((pneu) => ({
//           ...pneu,
//           tipo: {
//             ...pneu.tipo,
//             sulco: Math.max(0, pneu.tipo.sulco - 0.1),
//             km: pneu.tipo.km + 100,
//           },
//         }))
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-8 text-center">
//           Gestão de Pneus de Reboque
//         </h1>
//         <div className="flex flex-col lg:flex-row gap-8 pr-20 max-h-full">
//           <Card className="">
//             <CardHeader>
//               <CardTitle className="flex items-center pb-6">
//                 Estoque de Pneus
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-y-10">
//                 {pneusEstoque.map((pneu, index) => (
//                   <Pneu
//                     key={pneu.id}
//                     id={pneu.id}
//                     tipo={pneu.tipo}
//                     index={pneu.id}
//                     moverPneu={moverPneu}
//                     selecionarPneu={selecionarPneu}
//                     isSelected={
//                       pneuSelecionado && pneuSelecionado.id === pneu.id
//                     }
//                     localizacao="estoque"
//                   />
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//           <div className="w-8/12">
//             <Card >
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   Simulador de Chassi
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <svg width="300" height="100" viewBox="0 0 300 100">
//                       <rect x="10" y="40" width="280" height="20" fill="#666" />
//                       {[0, 1, 2, 3, 4, 5].map((_, i) => (
//                         <g
//                           key={i}
//                           transform={`translate(${50 * i + 25}, ${
//                             i % 2 ? 20 : 80
//                           })`}
//                         >
//                           <PosicaoChassi
//                             index={i}
//                             pneu={pneusChassi[i]}
//                             moverPneu={moverPneu}
//                             selecionarPneu={selecionarPneu}
//                             pneuSelecionado={pneuSelecionado}
//                           />
//                         </g>
//                       ))}
//                     </svg>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="mt-8">
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Info className="mr-2" />
//                   Detalhes do Pneu
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Tabs defaultValue="geral">
//                   <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
//                     <TabsTrigger value="detalhado">
//                       Informações Detalhadas
//                     </TabsTrigger>
//                   </TabsList>
//                   <TabsContent value="geral">
//                     {pneuSelecionado ? (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h3 className="font-semibold">Tipo</h3>
//                           <p>{pneuSelecionado.tipo.nome}</p>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold">Sulco</h3>
//                           <p>{pneuSelecionado.tipo.sulco.toFixed(1)} mm</p>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold">Pressão</h3>
//                           <p>{pneuSelecionado.tipo.pressao} psi</p>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold">Quilometragem</h3>
//                           <p>{pneuSelecionado.tipo.km.toLocaleString()} km</p>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold">Localização</h3>
//                           <p>
//                             {pneuSelecionado.localizacao === "estoque"
//                               ? "Estoque"
//                               : `Chassi (Posição ${pneuSelecionado.index + 1})`}
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <p>Selecione um pneu para ver os detalhes.</p>
//                     )}
//                   </TabsContent>
//                   <TabsContent value="detalhado">
//                     {pneuSelecionado ? (
//                       <div className="space-y-4">
//                         <div>
//                           <h3 className="font-semibold mb-2">
//                             Desgaste do Sulco
//                           </h3>
//                           <Slider
//                             defaultValue={[pneuSelecionado.tipo.sulco]}
//                             max={20}
//                             step={0.1}
//                             className="w-full"
//                           />
//                           <p className="text-sm text-gray-500 mt-1">
//                             {pneuSelecionado.tipo.sulco.toFixed(1)} mm / 20 mm
//                           </p>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold mb-2">Pressão</h3>
//                           <Slider
//                             defaultValue={[pneuSelecionado.tipo.pressao]}
//                             max={150}
//                             step={1}
//                             className="w-full"
//                           />
//                           <p className="text-sm text-gray-500 mt-1">
//                             {pneuSelecionado.tipo.pressao} psi / 150 psi
//                           </p>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold mb-2">
//                             Histórico de Manutenção
//                           </h3>
//                           <ul className="list-disc list-inside text-sm">
//                             <li>Última calibragem: 3 dias atrás</li>
//                             <li>Última rotação: 15.000 km atrás</li>
//                             <li>Próxima inspeção recomendada: em 5.000 km</li>
//                           </ul>
//                         </div>
//                       </div>
//                     ) : (
//                       <p>Selecione um pneu para ver os detalhes.</p>
//                     )}
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default GestaoReboque;
