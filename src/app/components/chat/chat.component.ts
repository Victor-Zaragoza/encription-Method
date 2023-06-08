import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';


interface ChatMessage {
  username: string;
  message: string;
  decrypted: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('3s ease-out', style({ opacity: '1' })),
      ]),
    ])
  ]
})
export class ChatComponent implements OnInit {


  @ViewChild('endOfChat')
  endOfChat!: ElementRef;

  private socket!: WebSocket;
  public messages: ChatMessage[] = [];
  public inputMessage: string = '';
  public username: string = '';

  showEncrypted: boolean = true

  vectorMessage: string[] = []
  vectorClave: string[] = []
  vectorEncrypted: string[] = []
  encryptedMessage = "";
  decryptedMessage = ""
  constructor(private service: EncryptDecryptService) {
    this.username = prompt('Ingresa tu nombre de usuario') || '';
    if (this.username) {
      this.socket = new WebSocket('ws://25.12.106.62:3000');
      this.socket.onopen = () => {
        console.log('Conexión establecida con el servidor.');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.encryptedMessage = data.message
        this.decryptedMessage = this.service.decrypt(this.encryptedMessage, this.service.keyForChat)
        const message: ChatMessage = {
          username: data.username,
          decrypted : this.decryptedMessage,
          message: data.message
        }; 
        this.vectorEncrypted = this.service.vectorEncrypted;
        this.vectorClave = this.service.vectorClave;
        this.vectorMessage = this.service.vectorDecrypted;
        this.messages.push(message);
        this.scrollToBottom();

        this.openPopupDecrypt();
      };

      this.socket.onclose = () => {
        console.log('Conexión cerrada con el servidor.');
      };
    }
  }
  ngOnInit(): void {

  }

  sendMessage() {
    if (this.inputMessage == "") return
    this.encryptedMessage = this.service.encrypt(this.inputMessage, this.service.keyForChat)
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message: ChatMessage = {
        username: this.username,
        decrypted: this.inputMessage, 
        message: this.encryptedMessage
      };
      this.messages.push(message); // Agregar el mensaje a la lista de mensajes
      this.socket.send(JSON.stringify({username: message.username, message: message.message}));
      this.inputMessage = '';
    }
    this.vectorMessage = this.service.vectorMessage
    this.vectorEncrypted = this.service.vectorEncrypted
    this.vectorClave = this.service.vectorClave
    this.openPopup();
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  displayStyle = "none";
  displayStyleDecrypt = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  openPopupDecrypt() {
    this.displayStyleDecrypt = "block";
  }
  closePopupDecrypt() {
    this.displayStyleDecrypt = "none";
  }

  changeShowing(){
    this.showEncrypted = !this.showEncrypted
  }
}
