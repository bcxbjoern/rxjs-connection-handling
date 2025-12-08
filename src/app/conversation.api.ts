import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  public getAccessToken(): Observable<Result<AccessToken, string>> {
    if (Math.random() < 0.2) {
      return of(err('Failed to get access token'));
    }

    const token: AccessToken = {
      token: '123',
      expires_in: 60,
    };

    return of(ok(token));
  }
}
