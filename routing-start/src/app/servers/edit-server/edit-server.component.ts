import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    // old, static server:
    // this.server = this.serversService.getServer(1);
    // this.serverName = this.server.name;
    // this.serverStatus = this.server.status;

    // set the component's server based on the route we're on (route contains server id)
    this.route.params.subscribe(
      (params) => {
        this.server = this.serversService.getServer(+params.id);
      }
    )

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams.allowEdit === '1' ? true : false;
        console.log(this.allowEdit)
      }
    )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
