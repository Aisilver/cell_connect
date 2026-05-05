import { Component, inject } from '@angular/core';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';
import { LogoComponent } from "src/app/main-features/shared/components/logo/logo.component";

@Component({
  selector: 'app-navbar',
  imports: [
    LogoComponent
],
  template: `
    <app-logo></app-logo>
    
    <div>
        <button (click)="toLogin()">LOGIN</button>
    </div>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private features_route_service = inject(MainFeaturesRouteService)

  toLogin() {
    this.features_route_service.toAuth('login')
  }
}
