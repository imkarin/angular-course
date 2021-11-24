import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {
  @Output() numberUpdated = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  startGame() {
  }

  stopGame() {
  }

  // function to emit numberUpdated (every second: number+=1)

}
