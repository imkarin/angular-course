import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {
  @Output() numberUpdated = new EventEmitter<number>();
  currentNumber: number = 0;
  interval: ReturnType<typeof setInterval> = setInterval(() => {}, 1000); // random default value so ts doesn't complain
  gameRunning: boolean = false; // disables Start/Stop button

  constructor() { }

  ngOnInit(): void { }

  startGame() {
    this.gameRunning = true;
    this.interval = setInterval(() => {
      this.currentNumber += 1;
      this.numberUpdated.emit(this.currentNumber);
    }, 1000)
  }
  
  stopGame() {
    this.gameRunning = false;
    this.currentNumber = 0;
    clearInterval(this.interval); // stop the interval
    // outputs 0, will be trigger for deleting all current numbers from the page:
    this.numberUpdated.emit(this.currentNumber); 
  }
}
