import { readFileSync } from 'fs';
import { IDay } from './helpers';
import { start } from 'repl';

export class Day9 implements IDay<number[]> {
  checksum(file: number[]) {
    return file.reduce((acc, v, index) => index * (v<0?0:v) + acc, 0);
  }

  step1(file: number[]) {
    const files: number[] = file.reduce((acc, n, index) => 
      [...acc, ...(new Array(n).fill(index%2===0 ? index/2 : -1))]
    , [] as number[])

    let head = 0;
    while (head<files.length) {
      if (files[head] < 0) {        
        const tail = files.pop();
        files[head] = tail!;
        while(files[files.length-1] < 0) {
          files.pop();
        }
      }
      head++;
    }    

    return this.checksum(files);
  }

  step2(file: number[]) {
    const spaces: {start:number, length:number}[] = [];
    const files: number[] = file.reduce((acc, n, index) => {
      if (index%2 === 1 && n>0) {
        spaces.push({start: acc.length, length: n});
      }
      return [...acc, ...(new Array(n).fill(index%2===0 ? index/2 : -1))]
    }, [] as number[]);

    const getLastFile = (endIndex: number) => {
      let head = endIndex;
      while (files[head-1] === files[endIndex]) {
        head--;
      }
      return [head, endIndex, endIndex-head+1];  
    }

    let tail = files.length-1;
    while (tail > 0) {
      const [start, _end, length] = getLastFile(tail);

      const firstSpaceStart = spaces.filter(s => s.length >= length).map(({start}) => start).reduce((acc, v) => Math.min(acc, v), Number.MAX_VALUE);
      const firstSpaceIndex = spaces.findIndex(({start}) => start===firstSpaceStart);

      if (firstSpaceIndex>-1 && firstSpaceStart < start) {
        const space = spaces[firstSpaceIndex];
        for (let i=0; i<length; i++) {          
          files[space.start+i] = files[start+i];
          files[start+i] = -1;
        }
        
        space.length -= length;
        space.start += length;
      }     

      // jump to the next file and move until we find a new file to move
      tail = start-1;
      while(files[tail] < 0) {
        tail--;
      }      
    }

    return this.checksum(files);
  }  

  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').toString().split('').map(n=>parseInt(n));    

    const step1 = this.step1(file);
    const step2 = this.step2(file);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day9.input');

    console.log(`day 9 step 1: ${step1}`);
    console.log(`day 9 step 2: ${step2}`);
  }
}
