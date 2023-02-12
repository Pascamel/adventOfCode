import { Day3 } from './day3';

test('Day 3 sample input', () => {
  const [step1, step2] = new Day3().solve('data/day3.sample');

  expect(step1).toBe(157);
  expect(step2).toBe(70);

  const [finale1, finale2] = new Day3().solve('data/day3.input');

  expect(finale1).toBe(8105);
  expect(finale2).toBe(2363);
});
