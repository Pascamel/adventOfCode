import { day02sample } from '../data';
import { Day02 } from '../day02';

test('Day 02 sample input', () => {
  const [step1, step2] = new Day02().solve(day02sample);

  expect(step1).toBe(101);
  expect(step2).toBe(48);
});
