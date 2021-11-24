import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.scss']
})
export class EvenComponent implements OnInit {
  // input: receives the latest even number, stores in array
  // create a new Even-component for every number in the array

  constructor() { }

  ngOnInit(): void {
  }

}
