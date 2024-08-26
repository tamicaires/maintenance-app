import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserLocalStorage } from "@/utils/auth";

interface ProfileProps {
  showEmail?: boolean;
}

export function Profile({ showEmail }: ProfileProps) {
  const user = getUserLocalStorage();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="hidden md:flex flex-col">
        <span className="text-sm font-medium">Olá, {user.name}</span>
        {showEmail && (
          <span className="text-xs text-muted-foreground">{user.email}</span>
        )}
      </div>
    </div>
  );
}
