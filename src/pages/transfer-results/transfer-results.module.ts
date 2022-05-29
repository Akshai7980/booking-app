import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferResultsPage } from './transfer-results';

@NgModule({
  declarations: [
    TransferResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferResultsPage),
  ],
})
export class TransferResultsPageModule {}
