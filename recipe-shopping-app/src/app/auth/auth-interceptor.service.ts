import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

// remember: don't do providedIn:'root' here, because we have to provide interceptors differently in app.module.js
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.currentUser.pipe(
            take(1),
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
