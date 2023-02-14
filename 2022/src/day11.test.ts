import { Day11 } from './day11';

test('Day 11 sample input', () => {
  const [step1, step2] = new Day11().solve('data/day11.sample');

  expect(step1).toBe(10605);
  expect(step2).toBe(2713310158);

  const [finale1, finale2] = new Day11().solve('data/day11.input');

  expect(finale1).toBe(50616);
  expect(finale2).toBe(11309046332);
});
