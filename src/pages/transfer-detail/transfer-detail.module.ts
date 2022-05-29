import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferDetailPage } from './transfer-detail';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TransferDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferDetailPage),
    DirectivesModule
  ],
})
export class TransferDetailPageModule {}
