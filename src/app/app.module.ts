import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersonsAdministrationModule} from "./persons-administration/persons-administration.module";
import {PersonModule} from "./person/person.module";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material/material.module";
import {AuthenticationService} from "./security/service/authentication.service";
import {LoginFormComponent} from './login/login-form/login-form.component';
import {TokenInterceptor} from "./security/interceptor/token-interceptor";
import {LayoutComponent} from "./layout/layout.component";
import {SidenavComponent} from "./sidenav/sidenav.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PersonsAdministrationModule,
    PersonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
