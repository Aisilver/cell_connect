import { ApplicationConfig, importProvidersFrom, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appPinger } from './initializers/app-pinger/app-pinger.initialzer';
import { appEncryptionRegistery } from './initializers/encypt-registery/encryption-registery.initializer';
import { responseInterceptor } from './interceptors/response-interceptor';
import { appSettingsInitializer } from './initializers/get-app-settings/app-settings-initializer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([responseInterceptor])),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatNativeDateModule
    ),
    provideAppInitializer(appPinger()),
    provideAppInitializer(appEncryptionRegistery()),
    provideAppInitializer(appSettingsInitializer())
  ]
};
