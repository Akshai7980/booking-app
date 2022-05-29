import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SomethingWentWrongPage } from './something-went-wrong';

@NgModule({
  declarations: [
    SomethingWentWrongPage,
  ],
  imports: [
    IonicPageModule.forChild(SomethingWentWrongPage),
  ],
})
export class SomethingWentWrongPageModule {}
