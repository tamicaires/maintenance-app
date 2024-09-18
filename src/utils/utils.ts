import { Box } from "@/shared/enums/work-order";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const boxToNumber = (box: Box): number => {
  const boxMap: Record<Box, number> = {
    [Box.UM]: 1,
    [Box.DOIS]: 2,
    [Box.TRES]: 3,
    [Box.QUATRO]: 4,
    [Box.CINCO]: 5,
    [Box.SEIS]: 6,
    [Box.SETE]: 7,
    [Box.OITO]: 8,
    [Box.NOVE]: 9,
    [Box.DEZ]: 10,
  };

  return boxMap[box];
};
