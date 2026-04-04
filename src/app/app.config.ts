import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptorInterceptor } from './core/interceptor-interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { subsubjectReducer } from './core/reducer/subsubject.reducer';
import { SubSubjectEffects } from './core/effect/subsubject.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideToastr({
        timeOut: 2000,
        //  positionClass: 'toast-bottom-right',
        preventDuplicates: true,
    }), // Toastr providers
    provideHttpClient(withInterceptors([interceptorInterceptor])),
    provideStore(),
     provideState('subsubjects', subsubjectReducer),
    provideEffects([SubSubjectEffects]),
   
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
