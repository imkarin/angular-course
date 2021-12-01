import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  greeting: string = 'Hello';

  toggleGreeting() {
    this.greeting = this.greeting === 'Hello' ? 'Bye' : 'Hello';
  }
}
