import { day11input } from './data';
import { IDay } from './helpers';

export class Day11 implements IDay {
  increment(s: string): string {
    const chars = s.split('');

    for (let i = chars.length - 1; i >= 0; i--) {
      if (chars[i] === 'z') {
        chars[i] = 'a';
      } else {
        chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
        return chars.join(''); // Join back to a string and return
      }
    }

    return 'a' + chars.join('');
  }

  solve(input: string) {
    const sequence =
      /(?=abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/;
    const banned = /^[^iol]*$/;
    const pairs = /([a-z])\1.*([a-z])\2/;

    let result1 = input;

    while (
      !sequence.test(result1) ||
      !banned.test(result1) ||
      !pairs.test(result1)
    ) {
      result1 = this.increment(result1);
    }

    let result2 = this.increment(result1);

    while (
      !sequence.test(result2) ||
      !banned.test(result2) ||
      !pairs.test(result2)
    ) {
      result2 = this.increment(result2);
    }

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day11input);

    console.log(`day 11 step 1: ${step1}`);
    console.log(`day 11 step 2: ${step2}`);
  }
}
