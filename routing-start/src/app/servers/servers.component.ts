import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(
    private serversService: ServersService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    this.router.navigate(['/servers'], {relativeTo: this.route})
    // works fine whether you pass the path with or without a slash
    // this is because the .navigate method doesn't know which route you're on
    
    // to tell it where we currently are, we can pass an argument 'extras'
    // an option of 'extras' is relativeTo, where you can pass ActivatedRoute
    // now, you should pass '/servers' with a slash, or else it will get appended to the current route
  }
}
