import { Component } from '@angular/core';
import { LogoComponent } from 'src/app/main-features/shared/components/logo/logo.component';

@Component({
  selector: 'app-auth-shared-header',
  imports: [
    LogoComponent
  ],
  template: `
    <app-logo></app-logo>
  `,
  styles: `
    @import "partial-styles/mixings";
    
    :host {
      display: none;
      padding: $medium_number;

      @media (max-width: 900px) {
        display: flex;

        app-logo {
          flex: 1;
        }
      }
    }
  `
})
export class AuthSharedHeaderComponent {
}