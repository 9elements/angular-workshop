import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  handleCountChange(count: number) {
    console.log('countChange event from IndependentCounter', count);
  }

}
