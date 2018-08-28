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
  // We do not want to expose the Observer trait to the outside,
  // so we downcast the BehaviorSubject to a simple Observable only.
  getCount(): Observable<number> {
    return this.subject.asObservable();
  }

  increment() {
    this.count++;
    this.notify();
  }

  decrement() {
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
