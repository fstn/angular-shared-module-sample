# angular-shared-module-sample
Shared module sample for angular 5

### Create the both apps
```
ng new app1
ng new app2
```

### Create the shared module
```
mkdir shared-models; 
cd shared-models;
npm init;
```

Create the index.ts file.
This file must export the content of the .module file 
```
export * from './src/shared-interceptors.module';
```

Copy files from app1 to the module folder:
```
    copy ../app1/.gitignore .
    copy ../app1/tsconfig.json .
    copy ../app1/tslint.json .
```

To allow your editor to resolve npm dependencies inside your share module, you add this inside your module tsconfig file:
```json
 "baseUrl": ".",
    "paths": {
      "*":[
        "*",
        "../app1/node_modules/*"
      ]
    }
``` 

In that way, you will use the app1 npm dependencies.

### Link our shared module with the first app

NPM link allow you to use symlink to easily develop your module

https://docs.npmjs.com/cli/link

```
cd shared-interceptors/ ;
npm link ;
cd ../app1;
npm link shared-interceptors 

```

### Use the app router inside the module

Ok lets start by writing our first interceptor inside the shared-interceptors module

```javascript 1.8
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private _router: Router) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /*
         * Add the token to the request here
         */
        return next
            .handle(req).pipe(
                catchError(error => {
                    console.error('An error occurred', error);
                    this._router.navigate(['/error']);
                    return Observable.throw(error)
                }));
    }

}
```

To be able to use our interceptor from outside the module, we need to export it inside our module index file:
```javascript1.8
import {TokenInterceptor} from "./interceptors/token.interceptor";
...
export {
      TokenInterceptor
};
```

We can now, register our interceptor inside the app1:
```javascript 1.8
import {TokenInterceptor} from "shared-interceptors";
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
 ```
The multi flag indicate that we can have multiple interceptor on our app1.

update app1 .angular-cli.json

```json
...
"defaults": {
    "styleExt": "css",
    "component": {},
    "build": {
      "preserveSymlinks": true
    }
```

As you can see our fake TokenInterceptor need to have the application router. 
If we try to run the app, we will get a No provider for Router exception. 

To resolve this issue, we ca import the RouterModule inside our shared-interceptors module.

