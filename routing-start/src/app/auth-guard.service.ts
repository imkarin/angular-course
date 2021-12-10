import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
            .then((authenticated: boolean) => { // after promise is fulfilled, execute this code:
                if (authenticated) {
                    return true;                // authenticated = true, so canActivate returns true
                } else {
                    this.router.navigate(['/']); // navigate away if user isn't authenticated
                    console.log('no access')
                }
            })
    }
}
