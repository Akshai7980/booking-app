import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferSearchPage } from './transfer-search';

@NgModule({
  declarations: [
    TransferSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferSearchPage),
  ],
})
export class TransferSearchPageModule {}
