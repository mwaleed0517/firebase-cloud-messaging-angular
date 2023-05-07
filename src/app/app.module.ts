import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { FirebaseMessagingService } from './fierbase.service';

const firebaseConfig = {
  apiKey: "AIzaSyCdTCQCmGVAkgute62epB1A8qAL5X8DEsU",
  authDomain: "chatapp-c0ee4.firebaseapp.com",
  databaseURL: "https://chatapp-c0ee4-default-rtdb.firebaseio.com",
  projectId: "chatapp-c0ee4",
  storageBucket: "chatapp-c0ee4.appspot.com",
  messagingSenderId: "716512719757",
  appId: "1:716512719757:web:4bfc2c064d0b3354d083c4"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule
  ],
  providers: [FirebaseMessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
