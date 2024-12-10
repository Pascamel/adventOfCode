import { Day03 } from './day03';

test('Day 3 sample input', () => {
  const [step1, step2] = new Day03().solve('data/day03.sample');

  expect(step1).toBe(161);
  expect(step2).toBe(48);

  const [finale1, finale2] = new Day03().solve('data/day03.input');

  expect(finale1).toBe(188116424);
  expect(finale2).toBe(104245808);
});
