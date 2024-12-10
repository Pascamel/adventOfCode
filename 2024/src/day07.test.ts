import { Day07 } from './day07';

test('Day07 sample input', () => {
  const [step1, step2] = new Day07().solve('data/day07.sample');

  expect(step1).toBe(3749);
  expect(step2).toBe(11387);

  const [finale1, finale2] = new Day07().solve('data/day07.input');

  expect(finale1).toBe(4555081946288);
  expect(finale2).toBe(227921760109726);
});
