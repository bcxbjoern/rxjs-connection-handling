import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationApi {
  constructor() { }
  public getAccessToken(): Observable<number> {
    return of(123)
  }
}
