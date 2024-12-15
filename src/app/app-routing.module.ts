import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from './core/components/welcome-page/welcome-page.component';
import {InformationComponent} from './modules/information/information.component';
import {PlanComponent} from './modules/plan/plan.component';
import {SettingsComponent} from './modules/settings/settings.component';
import {StageComponent} from './modules/stage/stage.component';
import {AccommodationsComponent} from './modules/accommodations/accommodations.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'stages',
    component: StageComponent
  },
  {
    path: 'plan',
    component: PlanComponent
  },
  {
    path: 'info',
    component: InformationComponent
  },
  {
    path: 'accommodations',
    component: AccommodationsComponent
  },
  {
    path: 'account',
    component: SettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
