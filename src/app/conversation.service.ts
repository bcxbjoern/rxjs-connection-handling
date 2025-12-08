import { Injectable } from '@angular/core';
import { AccessToken, ConversationApi } from './conversation.api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private readonly accessToken$: BehaviorSubject<AccessToken | null> =
    new BehaviorSubject<AccessToken | null>(null);

  constructor(conversationApi: ConversationApi) {
    conversationApi.getAccessToken().subscribe((accessToken) => {
      this.accessToken$.next(accessToken);
    });
  }
}
