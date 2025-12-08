import { Injectable } from '@angular/core';
import { ConversationApi } from './conversation.api';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private readonly conversationApi: ConversationApi) { }
}
