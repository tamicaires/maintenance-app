interface AvatarGroupProps {
  children: React.ReactNode;
}

export function AvatarGroup({ children }: AvatarGroupProps) {
  return <div className="flex -space-x-2">{children}</div>;
}
