export interface IDay<T> {
  solve(fileName: string): T;
  run(): void;
}

export const Sum = (values: number[]) => values.reduce((acc, v) => acc + v, 0);