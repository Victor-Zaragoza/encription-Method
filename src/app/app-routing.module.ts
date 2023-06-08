import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: 'encrypt', component: EncryptComponent },
  { path: 'decrypt', component: DecryptComponent },
  { path: '', redirectTo: '/encrypt', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: '**', redirectTo: '/encrypt', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
