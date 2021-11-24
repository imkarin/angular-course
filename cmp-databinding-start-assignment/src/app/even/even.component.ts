import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.scss']
})
export class EvenComponent implements OnInit {
  // input: receives the updated array of even numbers
  // create a new Even-component for every number in the array

  @Input() numbers: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
