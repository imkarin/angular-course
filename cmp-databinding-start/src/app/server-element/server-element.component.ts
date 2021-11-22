import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  // add the @Input decorator, so this component can receive 'elements' from the parent component
  @Input() element: {    
    type: string, 
    name: string, 
    content: string };  // typescript: defining what the element type looks like

  constructor() { }

  ngOnInit(): void {
  }

}
