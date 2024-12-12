import { day11input, day11sample1, day11sample2 } from '../data';
import { Day11 } from '../day11';

test('Day 11 sample input', () => {
  const [test1a, test2a] = new Day11().solve(day11sample1);
  expect(test1a).toBe('abcdffaa');
  expect(test2a).toBe('abcdffbb');

  const [test1b, test2b] = new Day11().solve(day11sample2);
  expect(test1b).toBe('ghjaabcc');
  expect(test2b).toBe('ghjbbcdd');

  const [finale1, finale2] = new Day11().solve(day11input);
  expect(finale1).toBe('vzbxxyzz');
  expect(finale2).toBe('vzcaabcc');
});
