import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {


  constructor() { }

  vectorMessage:string[] = []
  vectorClave :string[] = []
  vectorEncrypted :string[] = []
  encrypt(message: string, clave: string): string {
    const mensajeNormalizado = message.toUpperCase();
    const claveNormalizada = clave.toUpperCase().replace(/[^A-Z]/g, '');
    const claveRepetida = claveNormalizada.repeat(Math.ceil(mensajeNormalizado.length / claveNormalizada.length)).slice(0, mensajeNormalizado.length);

    let mensajeCifrado = '';

    for (let i = 0; i < mensajeNormalizado.length; i++) {
      const letraMensaje = mensajeNormalizado[i];
      const letraClave = claveRepetida[i];
      this.vectorMessage.push(letraMensaje)
      this.vectorClave.push(letraClave)
      console.log(this.vectorMessage)
      console.log(this.vectorClave)
      if (letraMensaje.match(/[A-Z]/)) {
        const valorMensaje = letraMensaje.charCodeAt(0) - 65;
        const valorClave = letraClave.charCodeAt(0) - 65;

        const valorCifrado = (valorMensaje + valorClave) % 26;

        const letraCifrada = String.fromCharCode(valorCifrado + 65);
        mensajeCifrado += letraCifrada;
        this.vectorEncrypted.push(letraCifrada)
      } else {
        mensajeCifrado += letraMensaje;
        this.vectorEncrypted.push(letraMensaje)
      }
      console.log(this.vectorEncrypted)
    }

    return mensajeCifrado;
  }

  decrypt(encryptedMessage: string, clave: string): string {
    const mensajeCifradoNormalizado = encryptedMessage.toUpperCase();
    const claveNormalizada = clave.toUpperCase().replace(/[^A-Z]/g, '');
    const claveRepetida = claveNormalizada.repeat(Math.ceil(mensajeCifradoNormalizado.length / claveNormalizada.length)).slice(0, mensajeCifradoNormalizado.length);

    let mensajeDescifrado = '';

    for (let i = 0; i < mensajeCifradoNormalizado.length; i++) {
      const letraCifrada = mensajeCifradoNormalizado[i];
      const letraClave = claveRepetida[i];

      if (letraCifrada.match(/[A-Z]/)) {
        const valorCifrada = letraCifrada.charCodeAt(0) - 65;
        const valorClave = letraClave.charCodeAt(0) - 65;

        const valorDescifrado = (valorCifrada - valorClave + 26) % 26;

        const letraDescifrada = String.fromCharCode(valorDescifrado + 65);
        mensajeDescifrado += letraDescifrada;
      } else {
        mensajeDescifrado += letraCifrada;
      }
    }

    return mensajeDescifrado;
  }

  generarClaveCompleta(clave: string, longitud: number): string {
    let clave_completa = '';
    let palabrasClave = clave.split(' ');
    let contador = 0;

    while (clave_completa.length < longitud) {
      let palabra = palabrasClave[contador % palabrasClave.length];
      clave_completa += palabra;
      contador++;
    }

    return clave_completa;
  }

  obtenerIndice(letra: string) {
    let alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    letra = letra.toLowerCase();
    return alfabeto.indexOf(letra);
  }
}
