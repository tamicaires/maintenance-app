import React, { useState, useRef, ReactNode } from "react";

type TriggerEvent = "click" | "hover" | "focus";

interface TriggerProps {
  onTrigger: () => void;
  children?: ReactNode;
  triggerEvent?: TriggerEvent;
  className?: string;
  style?: React.CSSProperties;
}

const Trigger: React.FC<TriggerProps> = ({
  onTrigger,
  children,
  triggerEvent = "click",
  className,
  style,
}) => {
  const [isActive, setIsActive] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleEvent = () => {
    onTrigger();
    setIsActive(!isActive);
  };

  const handleMouseEnter = () => {
    if (triggerEvent === "hover") {
      setIsActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerEvent === "hover") {
      setIsActive(false);
    }
  };

  const handleFocus = () => {
    if (triggerEvent === "focus") {
      setIsActive(true);
    }
  };

  const handleBlur = () => {
    if (triggerEvent === "focus") {
      setIsActive(false);
    }
  };

  return (
    <div
      ref={triggerRef}
      className={`${className} ${isActive ? "active" : ""}`}
      style={style}
      onClick={triggerEvent === "click" ? handleEvent : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {children || <button aria-describedby="default-trigger">Trigger</button>}
    </div>
  );
};

export default Trigger;
