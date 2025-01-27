import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/utils";

interface ProfileProps {
  name: string;
  isCollapsed?: boolean;
  description?: string;
  descriptionPosition?: "top" | "bottom";
  showAvatar?: boolean;
  size?: "small" | "large";
}

export function Profile({
  name,
  description,
  isCollapsed = false,
  showAvatar = false,
  size = "large",
  descriptionPosition = "bottom",
}: ProfileProps) {
  const textSizeClass = size === "large" ? "text-sm" : "text-xs";
  const descriptionSizeClass = size === "large" ? "text-xs" : "text-[0.70rem]";
  const avatarSize = size === "large" ? "h-8 w-8" : "h-4 w-4";
  const avatarFallbackSize = size === "large" ? "text-xs" : "text-[9px]";

  return (
    <div className="flex items-center space-x-2 text-xs">
      {showAvatar && (
        <Avatar className={avatarSize}>
          <AvatarFallback className={avatarFallbackSize}>
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      )}
      {!isCollapsed && (
        <div className="flex-1 text-left">
          {descriptionPosition === "top" && description && (
            <p className={`text-muted-foreground ${descriptionSizeClass}`}>
              {description}
            </p>
          )}
          <p className={`font-medium leading-none ${textSizeClass}`}>{name}</p>
          {descriptionPosition === "bottom" && description && (
            <p className={`text-muted-foreground ${descriptionSizeClass}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
