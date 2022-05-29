import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTransactionsPage } from './my-transactions';

@NgModule({
  declarations: [
    MyTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTransactionsPage),
  ],
})
export class MyTransactionsPageModule {}
