import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day7 implements IDay {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('\n');
    const folders = new Map<string, number[]>();
    let dirs: string[] = [];

    // hard drive structure
    while (file.length > 0) {
      const line = file.shift() ?? '';

      if (line.startsWith('$ cd ')) {
        const dir = line.substring(5);
        if (dir === '..') {
          dirs.pop();
        } else if (dir !== '/') {
          dirs.push(dir);
        }
      } else if (line !== '$ ls') {
        const [head, tail] = line.split(' ');

        if (head === 'dir') {
          const newKey = [...dirs, tail].join('/');
          if (!folders.has(newKey)) {
            folders.set(newKey, []);
          }
        } else {
          // push the file to current folder and all parents
          for (let i = 1; i <= dirs.length; i++) {
            const key = dirs.slice(0, i).join('/');
            folders.get(key)?.push(parseInt(head));
          }
        }
      }
    }

    const step1 = [...folders.values()]
      .map((v) => v.reduce((a, b) => a + b, 0))
      .filter((v) => v <= 100000)
      .reduce((a, b) => a + b, 0);

    const totalFiles = [...folders.keys()]
      .filter((v) => v.indexOf('/') === -1)
      .map((v) => folders.get(v)?.reduce((a, b) => a + b, 0) ?? 0)
      .reduce((a, b) => a + b, 0);
    const folderSizes = [...folders.values()]
      .map((v) => v.reduce((a, b) => a + b, 0))
      .filter((v) => totalFiles - v < 40000000);
    const step2 = Math.min(...folderSizes);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day7.input');

    console.log('day 7 step 1: ' + step1.toString());
    console.log('day 7 step 2: ' + step2.toString());
  }
}
