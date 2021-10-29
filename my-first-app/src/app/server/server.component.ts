import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  serverName = 'Server001';

  constructor() { }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event?.target).value;
  }

  ngOnInit(): void {
  }

}
