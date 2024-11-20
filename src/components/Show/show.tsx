import React from "react";

type ShowProps = {
  condition: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function Show({ condition, fallback = null, children }: ShowProps) {
  return <>{condition ? children : fallback}</>;
}
