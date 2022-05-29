import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayDetailsPage } from './holiday-details';

@NgModule({
  declarations: [
    HolidayDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayDetailsPage),
  ],
})
export class HolidayDetailsPageModule {}
