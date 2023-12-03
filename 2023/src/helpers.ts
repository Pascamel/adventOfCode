export interface IDay<T> {
  solve(fileName: string): T;
  run(): void;
}

export const MathMax = (acc: number, v: number) => Math.max(acc, v);
export const Sum = (acc: number, v: number) => acc + v;
