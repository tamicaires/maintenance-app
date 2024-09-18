import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TruckIcon, PlusCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyCardProps {
  boxNumber: string;
}

export const EmptyCard: React.FC<EmptyCardProps> = ({ boxNumber }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="relative h-full flex flex-col overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300" />
        <CardContent className="flex flex-col h-full pt-4 px-4">
          <div className="flex items-center justify-between mb-2 pt-5">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-200 text-gray-500 rounded-full">
                <TruckIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Box Vazio</h3>
                <p className="text-xs text-muted-foreground">Livre</p>
              </div>
            </div>
          </div>

          <div className="relative mb-4">
            <div className="absolute -top-12 -right-4 text-8xl font-bold text-gray-200 opacity-40 select-none">
              {boxNumber}
            </div>
            <div className="text-2xl font-bold text-gray-500">
              Box {boxNumber}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 flex-grow">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="relative"
            >
              <TruckIcon className="w-16 h-16 text-gray-400" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-1"
              >
                <PlusCircleIcon className="w-6 h-6" />
              </motion.div>
            </motion.div>
            <p className="text-sm text-muted-foreground text-center">
              Aguardando veículo
            </p>
          </div>

          <div className="mt-auto pt-4">
            <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium">
                0%
              </div>
            </div>
          </div>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </motion.div>
  );
};
