import { Day09 } from './Day09';

test('Day 9 sample input', () => {
  const [step1, step2] = new Day09().solve('data/Day09.sample');

  expect(step1).toBe(1928);
  expect(step2).toBe(2858);

  const [finale1, finale2] = new Day09().solve('data/Day09.input');

  expect(finale1).toBe(6382875730645);
  expect(finale2).toBe(6420913943576);
});
