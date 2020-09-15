import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bdm'
})
export class RaiPipe implements PipeTransform {
  precision = 6;

  mbdm = 100;
  kbdm = 100;
  bdm  = 1;

  transform(value: any, args?: any): any {
    const opts = args.split(',');
    const denomination = opts[0] || 'mbdm';
    const hideText = opts[1] || false;

    switch (denomination.toLowerCase()) {
      default:
      case 'bdm': return `${(value / this.mbdm).toFixed(6)}${!hideText ? ' BADEM' : ''}`;
      case 'mbadem':
        const hasRawValue = (value / this.bdm) % 1;
        if (hasRawValue) {
          // New more precise toFixed function, but bugs on huge raw numbers
          const newVal = value / this.mbdm < 0.000001 ? 0 : value / this.mbdm;
          return `${this.toFixed(newVal, this.precision)}${!hideText ? ' BADEM' : ''}`;
        } else {
          return `${(value / this.mbdm).toFixed(6)}${!hideText ? ' BADEM' : ''}`;
        }
      case 'kbadem': return `${(value / this.kbdm).toFixed(3)}${!hideText ? ' kbadem' : ''}`;
      case 'bdm': return `${(value / this.bdm).toFixed(0)}${!hideText ? ' badem' : ''}`;
      case 'raw': return `${value}${!hideText ? ' raw' : ''}`;
      case 'dynamic':
        const bdm = (value / this.bdm);
        if (bdm >= 1000000) {
          return `${(value / this.mbdm).toFixed(this.precision)}${!hideText ? ' mBdm' : ''}`;
        } else if (bdm >= 1000) {
          return `${(value / this.kbdm).toFixed(this.precision)}${!hideText ? ' kBdm' : ''}`;
        } else if (bdm >= 0.00001) {
          return `${(value / this.bdm).toFixed(this.precision)}${!hideText ? ' Bdm' : ''}`;
        } else if (bdm === 0) {
          return `${value}${!hideText ? ' mBdm' : ''}`;
        } else {
          return `${value}${!hideText ? ' bdm' : ''}`;
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
