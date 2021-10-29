import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  username = '';

  constructor() { }
  
  onResetButtonClick() {
    if (this.username !== '') {
      this.username = '';
      return
    }
    console.log('true');
    return
  }

  ngOnInit(): void {
  }

}
