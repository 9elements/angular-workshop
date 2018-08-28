import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CounterState } from '../reducers/counter.reducer';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-service-counter',
  templateUrl: './service-counter.component.html',
  styleUrls: ['./service-counter.component.css']
})
export class ServiceCounterComponent {

  count$: Observable<CounterState>;

  constructor(private counterService: CounterService) {
    this.count$ = this.counterService.getCount();
  }

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }

  reset(newCount: string) {
    this.counterService.reset(parseInt(newCount, 10));
  }

}
