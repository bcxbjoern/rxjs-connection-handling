import { Injectable } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';
import { err, ok, Result } from 'neverthrow';

export interface AccessToken {
  token: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConversationApi {
  constructor() {}

  public getAccessToken(): Observable<string> {
    const token = Math.random().toPrecision(2);
    return of(token);
  }

  public refreshAccessToken(token: string, delay: number = 0): Observable<string> {
    return timer(delay).pipe(map(() => Math.random().toPrecision(2)));
  }

  getConversation(token: string): Observable<Array<string>> {
    return of([]);
  }
}
