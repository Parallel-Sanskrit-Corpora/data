import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  static flatten([x, ...xs]) {
    return this.def(x) ? this.isArray(x) ? [...this.flatten(x), ...this.flatten(xs)] : [x, ...this.flatten(xs)] : [];
  }

  static def(x) {
    return typeof x !== 'undefined';
  }

  static undef(x) {
    return !this.def(x);
  }

  static isArray(x) {
    return Array.isArray(x);
  }
}
