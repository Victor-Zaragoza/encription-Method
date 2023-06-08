import { Component } from '@angular/core';

interface ChatMessage {
  username: string;
  message: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Chat Cliente</h2>
      <div *ngFor="let message of messages">
        {{ message.username }}: {{ message.message }}
      </div>
      <input [(ngModel)]="inputMessage" placeholder="Escribe tu mensaje" />
      <button (click)="sendMessage()">Enviar</button>
    </div>
  `
})
export class AppComponent {
  private socket!: WebSocket;
  public messages: ChatMessage[] = [];
  public inputMessage: string = '';
  public username: string = '';

  constructor() {
    this.username = prompt('Ingresa tu nombre de usuario') || '';
    if (this.username) {
      this.socket = new WebSocket('ws://25.12.106.62:3000');
      this.socket.onopen = () => {
        console.log('Conexión establecida con el servidor.');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const message: ChatMessage = {
          username: data.username,
          message: data.message
        };
        this.messages.push(message);
      };

      this.socket.onclose = () => {
        console.log('Conexión cerrada con el servidor.');
      };
    }
  }

  sendMessage() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message: ChatMessage = {
        username: this.username,
        message: this.inputMessage
      };
      this.messages.push(message); // Agregar el mensaje a la lista de mensajes
      this.socket.send(JSON.stringify(message));
      this.inputMessage = '';
    }
  }
}