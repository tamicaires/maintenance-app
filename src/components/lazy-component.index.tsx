import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LazyComponentProps {
  triggerLabel: string;
  children: React.ReactNode;
}

export function LazyComponent({ triggerLabel, children }: LazyComponentProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>{triggerLabel}</Button>
      {show && children}
    </>
  );
}
