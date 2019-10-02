import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public handleCountChange(count: number): void {
    console.log('countChange event from IndependentCounter', count);
  }

}
