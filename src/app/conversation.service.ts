import { Injectable } from '@angular/core';
import { AccessToken, ConversationApi } from './conversation.api';
import {
  BehaviorSubject,
  EMPTY,
  expand,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { Result } from 'neverthrow';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private readonly conversationApi: ConversationApi;

  private readonly isRunning$ = new BehaviorSubject<boolean>(true);
  readonly token$: Observable<any> = this.isRunning$.pipe(
    switchMap((isRunning) => {
      if (!isRunning) {
        console.log('App not running');
        return EMPTY;
      }
      console.log('App running');
      return this.conversationApi.getAccessToken().pipe(
        expand((tokenResult) => {
          console.log('Got first token result: ', tokenResult);
          if (tokenResult.isErr()) {
            return tokenResult;
          }
          const freshToken$ = timer(2000).pipe(
            switchMap(() => {
              return this.conversationApi.refreshAccessToken(tokenResult.value.token);
            }),
          );
          console.log('Got fresh token: ', freshToken$);
          return freshToken$;
        }),
      );
    }),
    //tap((token) => console.log('tap: ', token)),
    shareReplay(1),
  );

  constructor(conversationApi: ConversationApi) {
    this.conversationApi = conversationApi;
  }
}
