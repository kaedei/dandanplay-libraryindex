import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/helpers/AuthGuard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) ,canActivate:[AuthGuard]},
  { path: 'library', loadChildren: () => import('./pages/library/library.module').then(m => m.LibraryModule) ,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top", useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
