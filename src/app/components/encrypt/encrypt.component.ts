import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('3s ease-out', style({ opacity: '1' })),
      ]),
    ])
  ]
})
export class EncryptComponent implements OnInit {

  encryptedMessage = ""
  message = ""
  key = ""
  vectorMessage:string[] = []
  vectorClave :string[] = []
  vectorEncrypted :string[] = []
  
  encryptForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
    key: new FormControl('', [Validators.required])
  })

  constructor(private service: EncryptDecryptService) { }


  ngOnInit(): void {
  }

  encrypt() {

    let { message, key } = this.encryptForm.value
    this.message = message
    this.key = key
    this.encryptedMessage = this.service.encrypt(message, key)
    this.vectorMessage = this.service.vectorMessage
    this.vectorEncrypted = this.service.vectorEncrypted
    this.vectorClave = this.service.vectorClave

  }


}
