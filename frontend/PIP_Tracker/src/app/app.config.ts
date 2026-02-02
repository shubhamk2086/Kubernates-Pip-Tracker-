import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req, next) => {
          if (req.url.includes('/employees/login')) {

          // if (req.url.includes('/auth/login')) {
            return next(req);
          }

          // const token = localStorage.getItem('authToken');
          const token = localStorage.getItem('token'); // ✔️ Matches login.component.ts

          if (token) {
            req = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
          }

          return next(req);
        }
      ])
    ),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};
