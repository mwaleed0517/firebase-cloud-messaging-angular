import { Component, OnDestroy } from '@angular/core';
import { FirebaseMessagingService } from './fierbase.service';
import { MessagePayload } from '@firebase/messaging-types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'fire-cloud-messaging';
  message: MessagePayload | null = null;
  _unsubscribeAll: Subject<any | null> = new Subject();

  constructor(private firebaseMessagingService: FirebaseMessagingService) {
    this.firebaseMessagingService.getCurrentMessage().pipe(takeUntil(this._unsubscribeAll)).subscribe(payload => {
      this.message = payload;
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
