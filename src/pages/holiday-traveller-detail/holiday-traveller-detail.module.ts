import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayTravellerDetailPage } from './holiday-traveller-detail';

@NgModule({
  declarations: [
    HolidayTravellerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayTravellerDetailPage),
  ],
})
export class HolidayTravellerDetailPageModule {}
