import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-independent-counter',
  templateUrl: './independent-counter.component.html',
  styleUrls: ['./independent-counter.component.css']
})
export class IndependentCounterComponent implements OnChanges {

  @Input()
  startCount = 0;

  @Output()
  countChange = new EventEmitter<number>();

  count = 0;

  ngOnChanges() {
    this.count = this.startCount;
  }

  increment() {
    this.count++;
    this.notify();
  }

  decrement() {
    this.count--;
    this.notify();
  }

  reset(newCount: string) {
    this.count = parseInt(newCount, 10);
    this.notify();
  }

  private notify() {
    this.countChange.emit(this.count);
  }

}
