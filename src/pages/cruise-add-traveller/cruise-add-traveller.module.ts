import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CruiseAddTravellerPage } from './cruise-add-traveller';

@NgModule({
  declarations: [
    CruiseAddTravellerPage,
  ],
  imports: [
    IonicPageModule.forChild(CruiseAddTravellerPage),
  ],
})
export class CruiseAddTravellerPageModule {}
