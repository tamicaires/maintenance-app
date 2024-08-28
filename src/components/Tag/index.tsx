import React from "react";

interface TagProps {
  color: "pink" | "purple" | "blue" | "green" | "yellow" | "orange";
  children: React.ReactNode;
}

export const Tag = ({ color, children }: TagProps) => {
  const colorClasses = {
    pink: "bg-pink-600  bg-opacity-30",
    purple: "bg-pastel-purple text-purple-800 bg-opacity-30",
    blue: "bg-blue-500 text-blue-500 bg-opacity-10 border border-blue-400",
    green: "bg-pastel-green text-green-800 bg-opacity-30 ",
    yellow: "bg-pastel-yellow text-yellow-800 bg-opacity-30 ",
    orange: "bg-pastel-orange text-orange-800 bg-opacity-30 ",
  };

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
};
