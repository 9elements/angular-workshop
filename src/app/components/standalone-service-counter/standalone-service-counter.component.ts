import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { CounterState } from '../../reducers/counter.reducer';
import { CounterService } from '../../services/counter.service';

@Component({
  standalone: true,
  selector: 'app-standalone-service-counter',
  imports: [CommonModule],
  templateUrl: './standalone-service-counter.component.html',
  styleUrls: ['./standalone-service-counter.component.css'],
})
export class StandaloneServiceCounterComponent {
  public count$: Observable<CounterState>;

  constructor(private counterService: CounterService) {
    this.count$ = this.counterService.getCount();
  }

  public increment(): void {
    this.counterService.increment();
  }

  public decrement(): void {
    this.counterService.decrement();
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.counterService.reset(count);
    }
  }
}
