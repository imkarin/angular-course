import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  userSub: Subscription;
  isAuthenticated: boolean;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.currentUser.subscribe(currentUser => {
      this.isAuthenticated = !!currentUser? true : false;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onClickSave() {
    this.dataStorageService.storeRecipes();
  }

  onClickFetch() {
    this.dataStorageService.fetchRecipes();
  }

  onClickLogout() {
    this.authService.logOut();
  }
}
