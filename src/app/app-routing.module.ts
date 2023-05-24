import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './userDetails/user-detail/user-detail.component';
import { HelpComponent } from './help/help.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    component: HomeComponent,
    children: [
      { path: '', component: HelpComponent, data: {page: 'userPage'} },
      { path: ':id', component: UserDetailComponent },
    ],
  },
  { path: 'help', component: HelpComponent, data: { page: 'help' } },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
