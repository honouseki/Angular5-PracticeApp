import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  // Let 'messages' be an array of strings
  messages: string[] = [];

  // Pushes a message string item into the messages array
  add(message: string) {
    this.messages.push(message);
  }

  // Clears messages array
  clear() {
    this.messages = [];
  }

  constructor() { }

}
