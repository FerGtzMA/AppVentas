import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/* bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimationsAsync()]
}).catch((err) => console.error(err));
 */
if (environment.endpoint) {
  enableProdMode();
}
  
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
