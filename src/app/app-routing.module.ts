import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { HistoryComponent } from './history/history.component';


const appRoutes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'register',      component: RegisterComponent },
  { path: 'history',      component: HistoryComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
