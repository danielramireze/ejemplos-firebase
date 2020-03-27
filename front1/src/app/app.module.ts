import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyCrzqsRW4KW7j4kMljpBwj-CYLFL9wY3gI",
  authDomain: "curso-82ee6.firebaseapp.com",
  databaseURL: "https://curso-82ee6.firebaseio.com",
  projectId: "curso-82ee6",
  storageBucket: "curso-82ee6.appspot.com",
  messagingSenderId: "342709788902",
  appId: "1:342709788902:web:7dfa7af8bc7c38fe139b27",
  measurementId: "G-NBVPGH8HVK"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,// Database
    AngularFireAuthModule, // Auth
    AngularFireStorageModule, // Storage
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
