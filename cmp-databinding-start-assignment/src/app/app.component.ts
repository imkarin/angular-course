import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  evenNumbers: number[] = [];
  oddNumbers: number[] = [];

  // on event "numberUpdated" from game-control, pass new number to even/odd component
  onNumberUpdated(updatedNumber: number) {
    if (updatedNumber === 0) {
      // end game, delete all odd-even components
      return
    }
    
    // append to even or oddnumbers array
    updatedNumber % 2 === 0 
    ? this.evenNumbers.push(updatedNumber) 
    : this.oddNumbers.push(updatedNumber)
    console.log(this.evenNumbers)
  }
}
