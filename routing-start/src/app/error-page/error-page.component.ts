import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string; // can differ, since we might reuse this page 
                        // for diff routes and pass something else to 'data' (in the routing module)

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.errorMessage = this.route.snapshot.data['message'];
    // if this ^ could possibly change while you're on this page,
    // remember: you can subscribe to it as well:
    this.route.data.subscribe((routeData: Data) => {
      this.errorMessage = routeData['message'];
    })
  }

}
