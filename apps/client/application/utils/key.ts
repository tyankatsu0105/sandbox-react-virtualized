/**
 * FIXME: keyかcodeで書き換える
 * keycodeはdeprecatedになっているため
 */
export const key = {
  Enter: 'Enter',
  Space: ' ',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
} as const;

export type Key = typeof key[keyof typeof key];