import { Inject, Injectable, OnDestroy } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  mergeMap,
  mergeMapTo,
  of,
  takeUntil,
} from 'rxjs';
import { FirebaseMessaging, MessagePayload } from '@firebase/messaging-types';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService implements OnDestroy {
  private currentMessage = new BehaviorSubject<MessagePayload | null>(null);
  _unsubscribeAll: Subject<any | null> = new Subject();
  fcm_token: string | null = null;

  constructor(
    private angularFireMessaging: AngularFireMessaging
  ) // @Inject('FIREBASE_ADMIN')
  // private readonly firebaseMessaging: FirebaseMessaging
  {
    this.angularFireMessaging.requestPermission
      .pipe(
        takeUntil(this._unsubscribeAll),
        mergeMap((permission) => {
          return this.angularFireMessaging.getToken.pipe(
            takeUntil(this._unsubscribeAll),
            map((token) => {
              return token;
            }),
            catchError((err) => {
              console.error('Error getting token:', err);
              return of(null);
            })
          );
        }),
        catchError((error) => {
          console.error('Unable to get permission to notify.', error);
          return of(null);
        })
      )
      .subscribe((token) => {
        this.fcm_token = token;
        console.log('Token subscription completed. Token:', token);
      });

    this.angularFireMessaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  //   receiveMessage() {
  //     this.angularFireMessaging.onMessage.pipe(mergeMapTo(this.afMessaging.messages)).subscribe(
  //         (message) => {
  //     this.currentMessage.next(message);
  //     console.log('Received message:', message);
  //         },
  //         (error) => {
  //             console.error(error);
  //         }
  //     );

  getCurrentMessage() {
    return this.currentMessage.asObservable();
  }
}
