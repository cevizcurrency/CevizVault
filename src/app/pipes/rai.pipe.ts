import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ceviz'
})
export class RaiPipe implements PipeTransform {
  precision = 6;

  mceviz = 100;
  kceviz = 100;
  ceviz  = 1;

  transform(value: any, args?: any): any {
    const opts = args.split(',');
    const denomination = opts[0] || 'mceviz';
    const hideText = opts[1] || false;

    switch (denomination.toLowerCase()) {
      default:
      case 'ceviz': return `${(value / this.mceviz).toFixed(6)}${!hideText ? ' CEVİZ' : ''}`;
      case 'mceviz':
        const hasRawValue = (value / this.ceviz) % 1;
        if (hasRawValue) {
          // New more precise toFixed function, but bugs on huge raw numbers
          const newVal = value / this.mceviz < 0.000001 ? 0 : value / this.mceviz;
          return `${this.toFixed(newVal, this.precision)}${!hideText ? ' CEVİZ' : ''}`;
        } else {
          return `${(value / this.mceviz).toFixed(6)}${!hideText ? ' CEVİZ' : ''}`;
        }
      case 'kceviz': return `${(value / this.kceviz).toFixed(3)}${!hideText ? ' kceviz' : ''}`;
      case 'ceviz': return `${(value / this.ceviz).toFixed(0)}${!hideText ? ' ceviz' : ''}`;
      case 'raw': return `${value}${!hideText ? ' raw' : ''}`;
      case 'dynamic':
        const ceviz = (value / this.ceviz);
        if (ceviz >= 1000000) {
          return `${(value / this.mceviz).toFixed(this.precision)}${!hideText ? ' mCeviz' : ''}`;
        } else if (ceviz >= 1000) {
          return `${(value / this.kceviz).toFixed(this.precision)}${!hideText ? ' kCeviz' : ''}`;
        } else if (ceviz >= 0.00001) {
          return `${(value / this.ceviz).toFixed(this.precision)}${!hideText ? ' Ceviz' : ''}`;
        } else if (ceviz === 0) {
          return `${value}${!hideText ? ' mCeviz' : ''}`;
        } else {
          return `${value}${!hideText ? ' ceviz' : ''}`;
        }
    }
  }

  toFixed(num, fixed) {
    if (isNaN(num)) {
      return 0;
    }
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  }

}
