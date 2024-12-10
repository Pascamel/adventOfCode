import { Day06 } from './day06';

test('Day 6 sample input', () => {
  const [step1, step2] = new Day06().solve('data/day06.sample');

  expect(step1).toBe(41);
  expect(step2).toBe(6);

  const [finale1, finale2] = new Day06().solve('data/day06.input');

  expect(finale1).toBe(4580);
  expect(finale2).toBe(1480);
});
