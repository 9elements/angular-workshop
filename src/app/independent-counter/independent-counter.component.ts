import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-independent-counter',
  templateUrl: './independent-counter.component.html',
  styleUrls: ['./independent-counter.component.css']
})
export class IndependentCounterComponent implements OnChanges {

  @Input()
  public startCount = 0;

  @Output()
  public countChange = new EventEmitter<number>();

  public count = 0;

  public ngOnChanges(): void {
    this.count = this.startCount;
  }

  public increment(): void {
    this.count++;
    this.notify();
  }

  public decrement(): void {
    this.count--;
    this.notify();
  }

  public reset(newCount: string): void {
    this.count = parseInt(newCount, 10);
    this.notify();
  }

  private notify(): void {
    this.countChange.emit(this.count);
  }

}
