import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileProps {
  companyName: string;
  isCollapsed?: boolean;
  description?: string;
  showAvatar?: boolean;
  size?: "small" | "large";
}

export function Profile({
  companyName,
  description,
  isCollapsed = false,
  showAvatar = false,
  size = "small",
}: ProfileProps) {
  const getInitials = (companyName: string) => {
    return companyName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const textSizeClass = size === "large" ? "text-md" : "text-sm";
  const descriptionSizeClass = size === "large" ? "text-xs" : "text-xs";

  return (
    <div className="flex items-center space-x-2">
      {showAvatar && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>{getInitials(companyName)}</AvatarFallback>
        </Avatar>
      )}
      {!isCollapsed && (
        <div className="flex-1 text-left">
          <p className={`font-medium ${textSizeClass}`}>{companyName}</p>
          <p className={`text-muted-foreground ${descriptionSizeClass}`}>
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
