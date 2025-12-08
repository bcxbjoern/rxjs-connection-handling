import { Injectable } from '@angular/core';
import { AccessToken, ConversationApi } from './conversation.api';
import { BehaviorSubject } from 'rxjs';
import { Result } from 'neverthrow';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private readonly accessToken$: BehaviorSubject<Result<AccessToken, string> | null> =
    new BehaviorSubject<Result<AccessToken, string> | null>(null);

  constructor(conversationApi: ConversationApi) {
    conversationApi.getAccessToken().subscribe((accessToken) => {
      this.accessToken$.next(accessToken);
    });
  }
}
