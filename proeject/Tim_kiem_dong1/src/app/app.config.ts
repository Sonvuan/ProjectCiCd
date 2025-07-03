import { ApplicationConfig, importProvidersFrom, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';   // <- Import thêm
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';


import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([
      httpErrorInterceptor
    ])
    ),
    provideAnimations(),
    importProvidersFrom(NgxPermissionsModule.forRoot()),

  ],


};
