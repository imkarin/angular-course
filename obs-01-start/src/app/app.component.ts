import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}
  
  private buttonActivatedSubscription: Subscription;

  activated = false;

  ngOnInit() {
    this.buttonActivatedSubscription = this.userService.buttonActivateSubject.subscribe((buttonActive => {
      this.activated = buttonActive;
    }))
  }

  ngOnDestroy() {
    this.buttonActivatedSubscription.unsubscribe();
  }
}
