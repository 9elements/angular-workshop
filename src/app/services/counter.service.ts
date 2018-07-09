import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CounterService {

  private count = 0;

  private subject: BehaviorSubject<number>;

  constructor() {
    this.subject = new BehaviorSubject(this.count);
  }

  // Every BehaviorSubject is an Observable and Observer.
  // We do not to expose the Observer trait to the outside,
  // so we downcast the BehaviorSubject to a simple Observable only.
  getCount(): Observable<number> {
    return this.subject.asObservable();
  }

  increase() {
    this.count++;
    this.notify();
  }

  decrease() {
    this.count--;
    this.notify();
  }

  reset(newCount: number) {
    this.count = newCount;
    this.notify();
  }

  private notify() {
    this.subject.next(this.count);
  }

}
