import React from "react";

type ReportHeaderProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function ReportHeader({
  title,
  description,
  children,
}: ReportHeaderProps) {
  return (
    <div className="px-3 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-col leading-none">
        <span className="text-3xl font-semibold">{title}</span>
        <span className="text-[1.05rem] text-muted-foreground max-w-lg text-balance leading-relaxed">
          {description}
        </span>
      </div>
      {children && (
        <div className="flex gap-3 mt-2 sm:mt-0">{children}</div>
      )}
    </div>
  );
}
