import { Day12 } from './day12';

test('Day 12 sample input', () => {
  const [step1, step2] = new Day12().solve('data/day12.sample');

  expect(step1).toBe(31);
  expect(step2).toBe(29);

  const [finale1, finale2] = new Day12().solve('data/day12.input');

  expect(finale1).toBe(534);
  expect(finale2).toBe(525);
});
