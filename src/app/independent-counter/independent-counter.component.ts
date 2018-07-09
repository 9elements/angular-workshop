import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-independent-counter',
  templateUrl: './independent-counter.component.html',
  styleUrls: ['./independent-counter.component.css']
})
export class IndependentCounterComponent implements OnInit {

  @Input()
  startCount = 0;

  @Output()
  change = new EventEmitter<number>();

  count = 0;

  constructor() { }

  ngOnInit() {
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
    this.change.emit(this.count);
  }

}
