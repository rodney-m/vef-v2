import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContainerComponent } from './components/container/container.component';
import { OtpComponent } from './components/otp/otp.component';

const routes: Route[] = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'otp', component: OtpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiAuthenticationRoutingModule {}
