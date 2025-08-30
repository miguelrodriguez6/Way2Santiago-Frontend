import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './core/components/welcome-page/welcome-page.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {NewStageComponent} from './modules/stage/new-stage/new-stage.component';
import { MapComponent } from './modules/map/map.component';
import {AuthInterceptorService} from './core/services/auth-interceptor.service';

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
    NewStageComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIcon,
    MatMenu,
    MatButton,
    MatMenuItem,
    MatMenuTrigger,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
