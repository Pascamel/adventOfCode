import { day08input } from './data';
import { IDay } from './helpers';

export class Day08 implements IDay {
  characters(s: string) {
    const trimmed = s
      .replace(/\\\\/g, '_')
      .replace(/\\\"/g, '_')
      .replace(/\\x[0-9a-fA-F]{2}/g, '_');

    return trimmed.substring(1, trimmed.length - 1);
  }

  encode(s: string) {
    const encoded = s.replace(/\\/g, '\\\\').replace(/\"/g, '\\"');

    return `"${encoded}"`;
  }

  solve(data: string) {
    const input = data.split('\n');

    const result1 = input.reduce(
      (acc, v) => acc + v.length - this.characters(v).length,
      0
    );

    const result2 = input.reduce(
      (acc, v) => acc + this.encode(v).length - v.length,
      0
    );

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day08input);

    console.log(`day 08 step 1: ${step1}`);
    console.log(`day 08 step 2: ${step2}`);
  }
}
