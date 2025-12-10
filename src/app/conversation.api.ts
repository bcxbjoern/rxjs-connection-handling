import { Injectable } from '@angular/core';
import { expand, interval, map, Observable, of, shareReplay, switchMap, timer } from 'rxjs';
import { err, ok, Result } from 'neverthrow';

export interface AccessToken {
  token: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConversationApi {
  private msgs: Observable<string[]> = of<string[]>(['hello :)']).pipe(
    expand((msgs) =>
      timer(1000).pipe(switchMap(() => of(msgs.concat([Math.random().toPrecision(5)])))),
    ),
    shareReplay(1),
  );

  constructor() {}

  public getAccessToken(): Observable<string> {
    const token = Math.random().toPrecision(2);
    return of(token);
  }

  public refreshAccessToken(token: string, delay: number = 0): Observable<string> {
    return timer(delay).pipe(map(() => Math.random().toPrecision(2)));
  }

  getConversation(token: string): Observable<string[]> {
    return this.msgs;
  }
}
