import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('3s ease-out', style({ opacity: '1' })),
      ]),
    ])
  ]
})
export class DecryptComponent implements OnInit {

  encryptedMessage = ""
  message = ""
  key = ""
  vectorMessage:string[] = []
  vectorClave :string[] = []
  vectorEncrypted :string[] = []


  decryptForm = new FormGroup({
    encryptedMessage: new FormControl('', [Validators.required]),
    key: new FormControl('', [Validators.required])
  })

  constructor(private service: EncryptDecryptService) { }
  

  ngOnInit(): void {
  }

  decrypt(){
    let {encryptedMessage, key} = this.decryptForm.value
     let decryptedMessage = this.service.decrypt(encryptedMessage, key);
     this.message = decryptedMessage;
     this.key = key;
     this.encryptedMessage = encryptedMessage
     this.vectorEncrypted = this.service.vectorEncrypted;
     this.vectorClave = this.service.vectorClave;
     this.vectorMessage = this.service.vectorDecrypted;
     alert(decryptedMessage)
   }

}
