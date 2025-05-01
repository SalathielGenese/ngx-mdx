import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MdxService {
  sayItWorks(name: string) {
    return `${name} works!`;
  }
}
