import readline = require('readline');
import fs = require('fs');

export class Day1 {
  rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: fs.createReadStream('data/day1.input'),
    });
  }

  run() {
    let last: Number | null = null;
    let lasts: Number[] = [];
    let result1 = 0;
    let result2 = 0;

    this.rl
      .on('line', (line: string) => {
        const parsed = parseInt(line);

        if (last !== null && parsed > last) {
          result1++;
        }

        lasts = [...lasts, parsed];
        if (lasts.length > 3) {
          if (lasts[lasts.length - 4] < lasts[lasts.length - 1]) {
            result2++;
          }
        }

        last = parsed;
      })
      .on('close', (_: string) => {
        console.log('day 1 step 1: ' + result1.toString());
        console.log('day 1 step 2: ' + result2.toString());
      });
  }
}
