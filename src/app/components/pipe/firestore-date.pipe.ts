import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import  { Timestamp } from '@firebase/firestore-types';
// import Timestamp = firestore.Timestamp;
// import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(timestamp: Timestamp, format?: string): string {
    return formatDate(timestamp.toDate(), format || 'medium', this.locale);
  }
}
