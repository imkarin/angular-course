import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

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
    private authService: AuthService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(map(authState => authState.user)) // ^ this returns the whole authState, we only want authState.user   
    .subscribe(currentUser => {
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
