import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';

// remember: don't do providedIn:'root' here, because we have to provide interceptors differently in app.module.js
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth')
        .pipe(
            take(1),
            // we only want the user, not the whole authState object:
            map(authState => authState.user),
            exhaustMap(currentUser => {
                console.log(currentUser)
                if (!currentUser) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({params: new HttpParams().set('auth', currentUser.token)});
                return next.handle(modifiedRequest);
            })
        );      
    }
}
