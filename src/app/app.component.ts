import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  handleChange(count: number) {
    console.log('change event from IndependentCounter', count);
  }

}
