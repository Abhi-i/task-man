import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ]
};

const BACKEND_URL = 'http://localhost:3000'

export const APIS = {
  register: BACKEND_URL + '/api/auth/register',
  login: BACKEND_URL + '/api/auth/login',
  tasks: BACKEND_URL + '/api/tasks'
}

export const APP_CONSTANTS = {
  
}