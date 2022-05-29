import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelPreviewPage } from './hotel-preview';

@NgModule({
  declarations: [
    HotelPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelPreviewPage),
  ],
})
export class HotelPreviewPageModule {}
