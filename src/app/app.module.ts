import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import{ PasajeroPage } from '../pages/pasajero/pasajero';
import{ SplashPage } from '../pages/splash/splash';
import { RegistratePage } from '../pages/registrate/registrate';

import { SalaMensajesPage } from '../pages/sala-mensajes/sala-mensajes';
import { IngresoPage } from '../pages/ingreso/ingreso';
import { SupervisorPage } from '../pages/supervisor/supervisor';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TiempoDesdeAhoraPipe} from '../pipes/tiempo-desde-ahora/tiempo-desde-ahora';

import {NavegadorUtnComponent} from '../components/navegador-utn/navegador-utn';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';

import { AgmCoreModule } from '@agm/core'; 
import { AgmDirectionModule } from 'agm-direction'; 
import { Push } from '@ionic-native/push';

import {ComponentsClienteComponent} from '../components/components-cliente/components-cliente';

import {ComponentsEncuestaClienteComponent} from '../components/components-encuesta-cliente/components-encuesta-cliente';
import { FormsModule } from '@angular/forms';
import { SuperUsuarioPage } from '../pages/super-usuario/super-usuario';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 

@NgModule({
  declarations: [
  TiempoDesdeAhoraPipe,
    MyApp,
    HomePage,
    ListPage,
    SuperUsuarioPage,
    RegistratePage,
    SalaMensajesPage,
    IngresoPage,
    SupervisorPage,
    PasajeroPage,
    SplashPage,
    NavegadorUtnComponent,
    ComponentsClienteComponent,
    ComponentsEncuestaClienteComponent
  ],
  exports:[
    NavegadorUtnComponent,
    ComponentsClienteComponent,
    ComponentsEncuestaClienteComponent
  ],
  imports: [

    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),// <=
    AngularFirestoreModule, //<=
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClhPseXqVzzacbSEW8M-TS0eOF-_v0uW0',
      libraries: ['places'],
      language: 'es',
    }),
    AgmDirectionModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage ,
    SuperUsuarioPage,
    RegistratePage,
    SalaMensajesPage,
    IngresoPage,
    SupervisorPage,
    PasajeroPage,
    SplashPage,
    NavegadorUtnComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    Camera,    
   // BarcodeScanner,
    Push

  ]
})
export class AppModule {}
