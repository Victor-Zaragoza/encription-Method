import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';

const routes: Routes = [
  { path: 'encrypt', component: EncryptComponent },
  { path: 'decrypt', component: DecryptComponent },
  { path: '', redirectTo: '/encrypt', pathMatch: 'full' },
  { path: '**', redirectTo: '/encrypt', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
