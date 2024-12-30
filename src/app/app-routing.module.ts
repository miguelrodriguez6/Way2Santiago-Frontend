import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from './core/components/welcome-page/welcome-page.component';
import {InformationComponent} from './modules/information/information.component';
import {PlanComponent} from './modules/plan/plan.component';
import {SettingsComponent} from './modules/settings/settings.component';
import {StageComponent} from './modules/stage/stage.component';
import {AccommodationsComponent} from './modules/accommodations/accommodations.component';
import {LoginComponent} from './modules/login/login.component';
import {RegisterComponent} from './modules/register/register.component';
import {AuthGuardService} from './core/services/auth-guard.service';
import {NewStageComponent} from './modules/stage/new-stage/new-stage.component';

const routes: Routes = [
  {
    path: 'home',
    component: WelcomePageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'stages',
    component: StageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-stage',
    component: NewStageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'plan',
    component: PlanComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'info',
    component: InformationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'accommodations',
    component: AccommodationsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
