import { Observable } from 'rxjs';

export interface Message {
  message: string;
  timestamp: string;
}

export function createMessageStream(url: string): Observable<Message[]> {
  return new Observable(subscriber => {
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    webSocket.onmessage = event => {
      try {
        const messages = JSON.parse(event.data);
        subscriber.next(messages);
      } catch (error) {
        subscriber.error(error);
      }
    };

    webSocket.onerror = error => {
      subscriber.error(error);
    };

    webSocket.onclose = () => {
      subscriber.complete();
      console.log('WebSocket connection closed');
    };

    // Teardown logic: this function is called when the subscriber unsubscribes.
    return () => {
      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.close();
      }
    };
  });
}
