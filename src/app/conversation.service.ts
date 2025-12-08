import { Injectable } from '@angular/core';
import { ConversationApi } from './conversation.api';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private readonly accessToken$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null)
  constructor(private readonly conversationApi: ConversationApi) {
    conversationApi.getAccessToken().subscribe(accessToken => {
      this.accessToken$.next(accessToken)
    })
  }
}
