import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CruiseItineraryPage } from './cruise-itinerary';

@NgModule({
  declarations: [
    CruiseItineraryPage,
  ],
  imports: [
    IonicPageModule.forChild(CruiseItineraryPage),
  ],
})
export class CruiseItineraryPageModule {}
