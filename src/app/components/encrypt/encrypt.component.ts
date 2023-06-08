import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent implements OnInit {

  encryptedMessage = ""

  encryptForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
    key: new FormControl('', [Validators.required])
  })

  constructor(private service: EncryptDecryptService) { }


  ngOnInit(): void {
  }

  encrypt() {
    let { message, key } = this.encryptForm.value
    this.encryptedMessage = this.service.encrypt(message, key)
    alert(this.encryptedMessage)
   // this.generateInterface()
  }

 
}
