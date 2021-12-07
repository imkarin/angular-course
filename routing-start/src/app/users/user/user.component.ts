import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.user = {
    //   id: this.route.snapshot.params['id'], // get the route param 'id'
    //   name: this.route.snapshot.params['name'], // get the route param 'name'
    // }

    // ^ Above code won't change this.user if the component is loaded again
    // with different params: it will just show the old user id/name
    // Therefore we subscribe to the params observable instead:
    this.paramsSubscription = this.route.params.subscribe(
      (updatedParams) => {
        this.user = {
          id: updatedParams['id'],
          name: updatedParams['name']
        }
      }
    )
  }
  	
	ngOnDestroy() {
		this.paramsSubscription.unsubscribe();
	  // in this case, you don't have to do this: Angular does this for you
		// regarding route subscriptions
		// you DO have to do this when you make other subscriptions
	}
}
