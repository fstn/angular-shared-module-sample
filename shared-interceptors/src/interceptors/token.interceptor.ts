import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/observable/throw';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private _router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        /*
         * Add the token to the request here
         */
        return next
            .handle(req)
            .pipe(catchError((error) => {
                    console.error('An error occurred', error);
                    return this._router.navigate(['/error'])
                })
            );
    }

}

