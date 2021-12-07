import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.user = {
    //   id: this.route.snapshot.params['id'], // get the route param 'id'
    //   name: this.route.snapshot.params['name'], // get the route param 'name'
    // }

    // ^ Above code won't change this.user if the component is loaded again
    // with different params: it will just show the old user id/name
    // Therefore we subscribe to the params observable instead:
    this.route.params.subscribe(
      (updatedParams) => {
        this.user = {
          id: updatedParams['id'],
          name: updatedParams['name']
        }
      }
    )
  }
}
