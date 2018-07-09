import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-service-counter',
  templateUrl: './service-counter.component.html',
  styleUrls: ['./service-counter.component.css']
})
export class ServiceCounterComponent {

  count$: Observable<number>;

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
