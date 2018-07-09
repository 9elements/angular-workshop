import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CounterService } from './../services/counter.service';

@Component({
  selector: 'app-service-counter',
  templateUrl: './service-counter.component.html',
  styleUrls: ['./service-counter.component.css']
})
export class ServiceCounterComponent implements OnInit {

  count$: Observable<number> | null = null;

  constructor(private counterService: CounterService) {
  }

  ngOnInit() {
    this.count$ = this.counterService.getCount();
  }

  increase() {
    this.counterService.increase();
  }

  decrease() {
    this.counterService.decrease();
  }

  reset(newCount: string) {
    this.counterService.reset(
      parseInt(newCount, 10)
    );
  }

}
