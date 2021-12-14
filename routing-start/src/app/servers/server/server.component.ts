import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    // before, we used to get the server id from the route params:
    // this.route.params.subscribe(
    //   (routeParams) => {
    //     const serverId = +routeParams['id']; // add the + to make this a number (not a string)
    //     this.server = this.serversService.getServer(serverId);
    //   }
    // )

    // now, our ServerResolver has gotten this data for us beforehand:
    this.route.data.subscribe((routeData: Data) => {
      this.server = routeData['server']; // this 'server' has to match the name in the routing-module path's 'resolve' object
    })
  }

  onEdit() {
    // add /edit to the route we are currently on and navigate to it
    this.router.navigate(
      ['edit'], 
      { relativeTo: this.route, queryParamsHandling: 'preserve'}) // keep the current queryParams
  }

}
function Data(routeData: any, Data: any) {
  throw new Error('Function not implemented.');
}
