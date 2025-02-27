import React from "react";
import * as Icons from "lucide-react";
import { ClipboardList } from "lucide-react";

interface DynamicIconProps {
  iconName?: string;
  className?: string;
  fallbackIcon?: React.ReactNode; 
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  className = "w-5 h-5 text-primary",
  fallbackIcon = <ClipboardList className={className} />, 
}) => {
  const IconComponent = iconName ? (Icons as any)[iconName] as React.ComponentType<any> : null;

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  return fallbackIcon;
};
