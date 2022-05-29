import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CruiseReviewPage } from './cruise-review';

@NgModule({
  declarations: [
    CruiseReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CruiseReviewPage),
  ],
})
export class CruiseReviewPageModule {}
