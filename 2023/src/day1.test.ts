import { Day1 } from './day1';

test('Day 1 sample input', () => {
  const [step1, _step2] = new Day1().solve('data/day1.sample1');

  expect(step1).toBe(142);

  const [_step1, step2] = new Day1().solve('data/day1.sample2');

  expect(step2).toBe(281);

  const [finale1, finale2] = new Day1().solve('data/day1.input');

  expect(finale1).toBe(53651);
  expect(finale2).toBe(53894);
});
