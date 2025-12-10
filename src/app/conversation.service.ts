import { Injectable } from '@angular/core';
import { ConversationApi } from './conversation.api';
import { BehaviorSubject, EMPTY, expand, Observable, shareReplay, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private readonly conversationApi: ConversationApi;

  private readonly isRunning$ = new BehaviorSubject<boolean>(true);
  readonly token$: Observable<string> = this.isRunning$.pipe(
    switchMap((isRunning) => {
      if (!isRunning) {
        return EMPTY;
      }
      return this.conversationApi
        .getAccessToken()
        .pipe(
          expand((previousToken) => this.conversationApi.refreshAccessToken(previousToken, 1000)),
        );
    }),
    shareReplay(1),
  );

  /*readonly conversation$ = this.token$.pipe(
    switchMap(token => {
        return this.conversationApi.getConversation(token);
      }
    )
  )*/

  constructor(conversationApi: ConversationApi) {
    this.conversationApi = conversationApi;
  }
}
