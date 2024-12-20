import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import { InformationComponent } from './modules/information/information.component';
import { PlanComponent } from './modules/plan/plan.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { AccommodationsComponent } from './modules/accommodations/accommodations.component';
import { StageComponent } from './modules/stage/stage.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIcon} from '@angular/material/icon';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    FooterComponent,
    InformationComponent,
    PlanComponent,
    SettingsComponent,
    AccommodationsComponent,
    StageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIcon,
    MatMenu,
    MatButton,
    MatMenuItem,
    MatMenuTrigger
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
