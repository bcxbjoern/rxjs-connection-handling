import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AccessToken {
  token: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConversationApi {
  constructor() {}

  public getAccessToken(): Observable<AccessToken> {
    const token: AccessToken = {
      token: '123',
      expires_in: 60,
    };
    return of(token);
  }
}
