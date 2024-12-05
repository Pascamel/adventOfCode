export interface IDay<T> {
  solve(fileName: string): T;
  run(): void;
}

export const MathMax = (acc: number, v: number) => Math.max(acc, v);

export const Sum = (values: number[]) => values.reduce((acc, v) => acc + v, 0);

export const Middle = <T>(arr: T[]) => arr[Math.floor(arr.length / 2)];
