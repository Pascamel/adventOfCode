import { Day1 } from './day1';

test('adds 1 + 2 to equal 3', () => {
  const [step1, step2] = new Day1().solve('data/day1.sample');

  expect(step1).toBe(7);
  expect(step2).toBe(5);
});
