import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Home, DollarSign, Clock } from "lucide-react";

export function Notification() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Abrir notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Notificações</CardTitle>
            <Button
              variant="link"
              className="text-primary hover:text-primary/80"
            >
              Marcar todas como lidas
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="bg-background/30 px-6 py-2 text-sm font-medium text-gray-500">
              Hoje
            </div>
            <div className="space-y-4 px-6 py-3">
              <div className="flex items-start space-x-4">
                <div className="mt-1 rounded-full bg-gray-500/20 p-2">
                  <Home className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Ordem de serviço finalizada
                  </p>
                  <p className="text-sm text-gray-500">
                    A manutenção da carreta **TRK-8902** foi{" "}
                    <span className="font-medium text-primary">
                      concluída com sucesso
                    </span>
                    . Serviço: troca de pastilhas de freio.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">há 5h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rounded-lg bg-primary/5 p-3">
                <div className="mt-1 rounded-full bg-primary/25 p-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Novo lançamento de custo registrado
                  </p>
                  <p className="text-sm text-gray-600">
                    Despesa no valor de{" "}
                    <span className="font-medium">R$ 2.350,00</span> registrada
                    para a frota **FL-301** — compra de pneus.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">há 7h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 rounded-full bg-gray-500/20 p-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Manutenção preventiva próxima
                  </p>
                  <p className="text-sm text-gray-500">
                    A carreta **TRK-2201** está com manutenção preventiva
                    agendada para{" "}
                    <span className="font-medium text-red-600">
                      25 de abril
                    </span>
                    . Verifique os itens do checklist e providencie agendamento.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">há 7h</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button
              variant="link"
              className="text-primary hover:text-primary/80"
            >
              Ver todas notificações
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
