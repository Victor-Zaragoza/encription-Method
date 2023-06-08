import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css']
})
export class DecryptComponent implements OnInit {

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
     alert(decryptedMessage)
   }

}
