const colors = [
  "#E69F00",
  "#56B4E9",
  "#009E73",
  "#F0E442",
  "#0072B2",
  "#D55E00",
  "#CC79A7",
  "#999999"
];
export const colorFor = (index: number) => colors[index % colors.length];
