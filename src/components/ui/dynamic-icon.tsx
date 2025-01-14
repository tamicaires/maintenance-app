import React from 'react';
import * as Icons from 'lucide-react';
import { ClipboardList } from 'lucide-react';

interface DynamicIconProps {
  iconName?: string;
  className?: string;
  fallbackIcon?: React.ComponentType<any>;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  className = "w-5 h-5 text-primary",
  fallbackIcon: FallbackIcon = ClipboardList
}) => {
  if (!iconName) {
    return <FallbackIcon className={className} />;
  }

  const IconComponent = (Icons as any)[iconName] as React.ComponentType<any>;

  if (!IconComponent) {
    return <FallbackIcon className={className} />;
  }

  return <IconComponent className={className} />;
};

