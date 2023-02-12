import { Day1 } from './day1';

test('Day 1 sample input', () => {
  const [step1, step2] = new Day1().solve('data/day1.sample');

  expect(step1).toBe(24000);
  expect(step2).toBe(45000);

  const [finale1, finale2] = new Day1().solve('data/day1.input');

  expect(finale1).toBe(68292);
  expect(finale2).toBe(203203);
});
