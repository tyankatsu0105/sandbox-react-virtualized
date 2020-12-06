const BASE_SPACE_AMOUNT = 4;
const colors = {
  black: '#333',
  white: '#fff',
} as const;

export const theme = {
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
  spacer: (amount: string | number) =>
    `${Number(amount) * BASE_SPACE_AMOUNT}px`,
  colors: {
    ...colors,
  },
};
