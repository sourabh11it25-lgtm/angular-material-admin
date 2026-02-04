import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core'; // Use stable name
import { appConfig } from './app/app.config';
import { App } from './app/app';

// 1. Explicitly type the config as ApplicationConfig
const zonelessConfig = {
  ...appConfig,
  providers: [
    // 2. Angular 21 uses provideZonelessChangeDetection()
    provideZonelessChangeDetection(), 
    ...(appConfig.providers || [])
  ]
};

bootstrapApplication(App, zonelessConfig)
  .catch((err) => console.error(err));
