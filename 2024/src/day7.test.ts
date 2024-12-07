import { Day7 } from './day7';

test('Day7 sample input', () => {
  const [step1, step2] = new Day7().solve('data/day7.sample');

  expect(step1).toBe(3749);
  expect(step2).toBe(11387);

  const [finale1, finale2] = new Day7().solve('data/day7.input');

  expect(finale1).toBe(4555081946288);
  expect(finale2).toBe(227921760109726);
});
