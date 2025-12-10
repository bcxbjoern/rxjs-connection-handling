import { Component, inject, signal } from '@angular/core';
import { ConversationService } from './conversation.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('react-playground');
  conversationService = inject(ConversationService);
  protected token = toSignal(this.conversationService.token$);
  protected messages = toSignal(this.conversationService.conversation$);
}
