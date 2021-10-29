import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  secretVisible = false;
  items = new Array();

  constructor() { }
  
  onButtonClick() {
    this.secretVisible = !this.secretVisible;
    this.items = this.items.concat("Button pressed");
    return
  }

  ngOnInit(): void {
  }

}
