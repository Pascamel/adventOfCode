import { day19input, day19sample } from '../data';
import { Day19 } from '../day19';

test('Day 19 sample input', () => {
  const [step1s, step2s] = new Day19().solve(day19sample);

  expect(step1s).toBe(4);
  expect(step2s).toBe(3);

  const [step1, step2] = new Day19().solve(day19input);

  expect(step1).toBe(518);
  expect(step2).toBe(200);
});
