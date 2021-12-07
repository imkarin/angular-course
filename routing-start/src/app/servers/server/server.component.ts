import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    // old, static server
    // this.server = this.serversService.getServer(1);

    this.route.params.subscribe(
      (routeParams) => {
        const serverId = +routeParams['id']; // add the + to make this a number (not a string)
        this.server = this.serversService.getServer(serverId);
      }
    )
  }

}
