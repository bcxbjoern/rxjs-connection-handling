import { Component, inject, signal } from '@angular/core';
import { ConversationService } from './conversation.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('react-playground');
  conversationService = inject(ConversationService);
  protected token$ = this.conversationService.token$;
  protected messages$ = this.conversationService.conversation$;
}
