import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SharedInteceptorsModule} from "shared-interceptors";
import {SharedModelsModule} from "shared-models";
import {SharedServicesModule} from "shared-services";
import {SharedComponentsModule} from "shared-components";
import {TokenInterceptor} from "shared-interceptors";
import {FirstComponentComponent} from './components/first-component/first-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
  ],
  imports: [
    BrowserModule,
    SharedInteceptorsModule,
    SharedModelsModule,
    SharedServicesModule,
    SharedComponentsModule
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
export class AppModule {
}
