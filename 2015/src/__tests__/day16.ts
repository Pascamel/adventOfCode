import { day16input } from '../data';
import { Day16 } from '../day16';

test('Day 16 sample input', () => {
  const [step1, step2] = new Day16().solve(day16input);

  expect(step1).toBe(373);
  expect(step2).toBe(260);
});
