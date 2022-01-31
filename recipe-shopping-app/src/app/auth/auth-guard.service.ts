import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor (private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.currentUser.pipe(
            take(1), // only listen for currentUser once, if the guard kept listening, strange behaviour might occur
            map(currentUser => { // remember our user is an observable
                const isAuth = !!currentUser; // converts a true-ish value (anything thats not null or undefined) to true, and false-ish to false
                if (isAuth) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        );
    }
}
