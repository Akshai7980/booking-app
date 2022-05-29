import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayAddTravellerPage } from './holiday-add-traveller';

@NgModule({
  declarations: [
    HolidayAddTravellerPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayAddTravellerPage),
  ],
})
export class HolidayAddTravellerPageModule {}
