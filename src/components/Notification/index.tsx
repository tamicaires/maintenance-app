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
          <Bell className="h-5 w-5" />
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
              className="text-green-600 hover:text-green-700"
            >
              Marcar todas como lidas
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="bg-gray-100 px-6 py-2 text-sm font-medium text-gray-500">
              Today
            </div>
            <div className="space-y-4 px-6 py-3">
              <div className="flex items-start space-x-4">
                <div className="mt-1 rounded-full bg-gray-200 p-2">
                  <Home className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Maintenance request update
                  </p>
                  <p className="text-sm text-gray-500">
                    The maintenance request for John Doe in Apartment 301 has
                    been{" "}
                    <span className="font-medium text-green-600">
                      Completed
                    </span>
                    . The issue was a leaking faucet in the kitchen.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">5h ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rounded-lg bg-green-50 p-3">
                <div className="mt-1 rounded-full bg-green-200 p-2">
                  <DollarSign className="h-4 w-4 text-green-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Rent Payment Confirmation
                  </p>
                  <p className="text-sm text-gray-600">
                    We have received the rent payment of{" "}
                    <span className="font-medium">$1,200</span> for Jane Smith
                    in Apartment 102. The payment was processed{" "}
                    <span className="font-medium text-green-600">
                      successfully
                    </span>
                    .
                  </p>
                  <p className="mt-1 text-xs text-gray-400">7h ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 rounded-full bg-gray-200 p-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Lease Renewal Reminder</p>
                  <p className="text-sm text-gray-500">
                    The lease for Esther Howard in Apartment 308 is set to{" "}
                    <span className="font-medium text-red-600">
                      expire on October 15, 2023
                    </span>
                    . Please take appropriate action to initiate lease renewal
                    discussions.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">7h ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700"
            >
              View all notifications
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
