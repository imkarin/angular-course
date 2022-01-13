import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
  //   interval(1000).subscribe(count => { // every 1 second, a value gets emitted which we subscribe to
  //     console.log(count) // 'count' is the value that came from interval() function
  //   }) // this observable will keep running even when you go to a different page/component, so you should unsubscribe from them
  // to prevent memory leaks (btw: every time you click this component, a new observable will start)
  
  // you can prevent new observables being started every time, by storing it in a variable:
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })

  // and later unsubscribing from this variable/subscription in ngOnDestroy()
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
