import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  username = '';

  constructor() { }

  onResetButtonClick(event: Event) {
    if (this.username !== '') {
      this.username = '';
      return
    }
    console.log("Nothing to reset");
    return 
  }

  ngOnInit(): void {
  }

}
