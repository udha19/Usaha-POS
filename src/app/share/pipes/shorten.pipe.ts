import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const val = value.toString()
    const n = value
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "Rb";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "Jt";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "Mly";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";

    // if (val.length >= 7) {
    //   return val[0]+'Jt'
    // } else if(val.length >= 4) {
    //   return val[0]+'Rb'
    // } else {
    //   return val

    // }
    return null;
  }

}
