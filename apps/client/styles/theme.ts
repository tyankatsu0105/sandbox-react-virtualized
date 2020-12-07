import * as colors from '@material-ui/core/colors';

const BASE_SPACE_AMOUNT = 4;

export const theme = {
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
  spacer: (amount: string | number) =>
    `${Number(amount) * BASE_SPACE_AMOUNT}px`,
  colors: {
    ...colors,
  },
  transition: {},
};
