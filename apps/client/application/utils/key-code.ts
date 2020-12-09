export const keyCode = {
  Enter: 13,
  Space: 32,
  ArrowUp: 38,
  ArrowDown: 40,
} as const;

export type KeyCode = typeof keyCode[keyof typeof keyCode];
