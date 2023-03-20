import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {Routes, RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import {NotFoundComponent} from "./not-found.component";
import {LoggedInGuard} from "./_services/logged-in-guard.service";

import {httpInterceptorProviders} from "./_helpers/http.interceptor";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {NumberValidatorDirective} from "./_helpers/number.directive";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NumberValidatorDirective
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        SelectButtonModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        ToastModule,
        BrowserAnimationsModule
    ],
  providers: [LoggedInGuard, httpInterceptorProviders, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
