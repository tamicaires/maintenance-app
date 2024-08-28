import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileProps {
  name: string;
  showAvatar?: boolean;
  description?: string;
  showHello?: boolean;
}

export function Profile({
  name,
  description,
  showAvatar,
  showHello = false,
}: ProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div className="flex items-center space-x-4">
      {showAvatar && (
        <Avatar>
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      )}
      <div className="hidden md:flex flex-col">
        <span className="text-sm font-medium leading-3">
          {showHello && "Olá,"} {name}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  );
}
