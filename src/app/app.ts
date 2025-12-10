import {
  AfterViewInit,
  Component,
  ElementRef,
  effect,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ConversationService } from './conversation.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  protected readonly title = signal('react-playground');
  conversationService = inject(ConversationService);
  protected token = toSignal(this.conversationService.token$);
  protected messages = toSignal(this.conversationService.conversation$);

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor() {
    effect(() => {
      if (this.messages() && this.messageContainer) {
        this.scrollToBottom();
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
