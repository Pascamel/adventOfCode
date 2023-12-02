export interface IDay<T> {
  solve(fileName: string): T;
  run(): void;
}
