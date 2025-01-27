type InfoDisplayProps = {
  label: string;
  value?: string | number;
  render?: React.ReactNode;
};

export const CardInfoDisplay = ({ label, value, render }: InfoDisplayProps) => {
  return (
    <div className="gap-x-12 gap-y-1 text-sm ">
      <div className="text-muted-foreground">{label}</div>
      {value && <div className="text-lg font-semibold">{value}</div>}
      {render && render}
    </div>
  );
};
