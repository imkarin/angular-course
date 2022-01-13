import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  private customObsSubscription: Subscription;
  
  constructor() { }

  ngOnInit() {
  // // you can prevent new observables being started every time, by storing it in a variable:
  // // and later unsubscribing from this variable/subscription in ngOnDestroy()
  //   this.firstObsSubscription = interval(1000).subscribe(count => {
  //     console.log(count);
  //   })

  // ^ Building this observable manually
    const customIntervalObservable = new Observable(observer => { // observer = the part that is interested in being informed about new data etc.
      let count = 0;
      setInterval(() => { // using the normal js setInterval function
        observer.next(count);  // .next emits a new value
        count++;
      }, 1000);
    })

    this.customObsSubscription = customIntervalObservable.subscribe(count => {
      console.log(count);
    })
  }

  ngOnDestroy() {
    // this.firstObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }
}
