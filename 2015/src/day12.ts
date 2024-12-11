import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day12 implements IDay { 
  containsRed(object: any) {    
    return Object.keys(object).reduce((acc, key) => acc || (isNaN(parseInt(key)) && object[key] === 'red'), false)
  }

  cleanRedValues(s: string) {
    const worker = (object:any) => {
      Object.keys(object).forEach(key => {  
        if (this.containsRed(object[key])) {
          delete object[key];
        }
        if (typeof object[key] === 'object') {
          worker(object[key]);
        }        
      });
    }    
    
    const object = {root: JSON.parse(s)};    
    worker(object);    

    return JSON.stringify(object);
  }

  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').toString(); 

    const matches = file.match(/-?\d+/g);
    const digits = matches ? matches.map(Number) : [];
    
    let result1 = digits.reduce((acc, v)=>acc+v, 0);    

    const clean = this.cleanRedValues(file);
    const matches2 = clean.match(/-?\d+/g);
    const digits2 = matches2 ? matches2.map(Number) : [];

    let result2 = digits2.reduce((acc, v)=>acc+v, 0);    

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day12.input');

    console.log('day 12 step 1: ' + step1.toString());
    console.log('day 12 step 2: ' + step2.toString());
  }
}
