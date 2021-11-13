import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
/* Componentes */
import { AppComponent } from './app.component';
/* Iniciar sesion */
import { LoginComponent } from './login/login.component';
/* Registros */
import { RegisterComponent } from './login/register.component';
/* Pagina de registros */
/* Rutas */
import { AppRoutes } from './app.routes';
import { PagesModule } from './components/pages/pages.module';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { ChartsModule } from 'ng2-charts';
import { ServicesModule } from './services/services.module';
import { AbonosPipe } from './components/pipe/abonos.pipe';
import { FirestoreDatePipe } from './components/pipe/firestore-date.pipe';
import { ChartsModule } from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';

// import * as Charts from 'ng2-charts';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AbonosPipe,
    FirestoreDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ServicesModule,
    ReactiveFormsModule,
    ChartsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
    // BrowserAnimationsModule,
    // TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
