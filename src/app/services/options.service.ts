import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  options = [
    1,
    2,
    3,
    4,
    5,
    6,
  ]

  constructor() { }

  getOptions() {
    return this.options;
  }
}
