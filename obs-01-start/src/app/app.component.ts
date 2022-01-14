import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}
  
  buttonActivatedSubscription

  activated = false;

  ngOnInit() {
    this.buttonActivatedSubscription = this.userService.buttonActivateSubject.subscribe((buttonActive => {
      this.activated = buttonActive;
    }))
  }

  ngOnDestroy() {
    this.buttonActivatedSubscription.unsubcribe();
  }
}
