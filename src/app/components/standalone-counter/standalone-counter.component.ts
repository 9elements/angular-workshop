import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-standalone-counter',
  templateUrl: './standalone-counter.component.html',
  styleUrls: ['./standalone-counter.component.css'],
})
export class StandaloneCounterComponent implements OnChanges {
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
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.count = count;
      this.notify();
    }
  }

  private notify(): void {
    this.countChange.emit(this.count);
  }
}
