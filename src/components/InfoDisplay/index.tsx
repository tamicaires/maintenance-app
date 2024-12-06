type InfoDisplayProps = {
  label: string;
  value: string | number;
};

export function InfoDisplay({ label, value }: InfoDisplayProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
