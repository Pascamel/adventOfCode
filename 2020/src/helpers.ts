export interface IDay {
  solve(fileName: string): number[];
  run(): void;
}

export const Sum = (values: number[]) => values.reduce((acc, v) => acc + v, 0);
