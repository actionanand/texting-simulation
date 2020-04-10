import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './userDetails/user-list/user-list.component';
import { UserDetailComponent } from './userDetails/user-detail/user-detail.component';
import { HomeComponent } from './home/home.component';
import { UserUiComponent } from './userDetails/user-ui/user-ui.component';
import { Page404Component } from './page404/page404.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    UserListComponent,
    UserDetailComponent,
    HomeComponent,
    UserUiComponent,
    Page404Component,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
