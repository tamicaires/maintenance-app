interface CustomDialogHeaderProps {
  title: string;
  subtitle?: string;
}

export function CustomDialogHeader({title, subtitle}: CustomDialogHeaderProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <div className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </div>
      <div className="text-[0.920rem] text-muted-foreground">
        {subtitle}
      </div>
    </div>
  );
}
