import { Day10 } from './day10';

test('Day 10 sample input', () => {
  const [step1, step2] = new Day10().solve('data/day10.sample');

  expect(step1).toBe(26397);
  expect(step2).toBe(288957);
});
