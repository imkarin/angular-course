import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private customObsSubscription: Subscription;
  
  constructor() { }

  ngOnInit() {
  // Building observable manually
    const customIntervalObservable = new Observable(observer => { // observer = the part that is interested in being informed about new data etc.
      let count = 0;
      setInterval(() => { // using the normal js setInterval function
        observer.next(count);  // .next emits a new value
        if ( count == 2 ) {
          observer.complete();
        }
        if (count > 3 ) {
          observer.error(new Error('Count is greater than 3!')) // when an obs throws an error or complete, it 'dies'. you can still unsubscribe from it
        }
        count++;
      }, 1000);
    });



    this.customObsSubscription = customIntervalObservable.pipe(filter((count: number) => {
      // filter returns true or false, true lets the data go onto the next operator
      return count > 0;
    }),
    map((count: number) => { // map is an operator that takes your data and does something with it
      return 'Round: ' + (count + 1);
    }))
    .subscribe( // subscribe to the pipe/operator now
    count => { // first argument of .subscribe() is function that's run on an obs next-event
      console.log(count);
    }, 
    error => { // second argument (optional) is function thats run on an obs error-event
      alert(error.message);
    },
    () => { // third argumnet (optional) is for obs complete-event
      console.log('Complete!')
    })
  }

  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
  }
}
