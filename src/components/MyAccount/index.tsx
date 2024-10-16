import { Bell, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getInitials } from "@/utils/utils";
import { getUserLocalStorage } from "@/utils/auth";

interface MyAccountAvatarProps {
  isCollapsed?: boolean;
}

export function MyAccountAvatar({ isCollapsed = false }: MyAccountAvatarProps) {
  const user = getUserLocalStorage();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-full justify-start p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name} />
            <AvatarFallback>
              {user?.name ? getInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="ml-2 text-left">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sm">
            <User className="mr-2 h-4 w-4" />
            Ver Perfil
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            <Bell className="mr-2 h-4 w-4" />
            Atualizações
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-red-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
