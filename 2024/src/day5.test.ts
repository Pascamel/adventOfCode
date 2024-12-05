import { Day5 } from './day5';

test('Day 5 sample input', () => {
  const [step1, step2] = new Day5().solve('data/day5.sample');

  expect(step1).toBe(143);
  expect(step2).toBe(123);

  const [finale1, finale2] = new Day5().solve('data/day5.input');

  expect(finale1).toBe(4185);
  expect(finale2).toBe(4480);
});
