import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecevoirPage } from './recevoir';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    RecevoirPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(RecevoirPage),
  ],
})
export class RecevoirPageModule {}
