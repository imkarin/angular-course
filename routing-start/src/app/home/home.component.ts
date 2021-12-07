import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // function that gets called by some button (without a link)
  onLoadServers(id: number) {
    // complex calculation
    // we need to get access to our router and tell it: "go here"
    // we do this by injecting it into the constructor
    this.router.navigate(
      ['/servers', id, 'edit'], 
      {queryParams: {allowEdit: '1'}, fragment: 'loading'} // programmatically passing queryparams/fragments
    )

  }
}
