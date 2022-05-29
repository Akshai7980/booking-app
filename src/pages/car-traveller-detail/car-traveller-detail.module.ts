import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarTravellerDetailPage } from './car-traveller-detail';

@NgModule({
  declarations: [
    CarTravellerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CarTravellerDetailPage),
  ],
})
export class CarTravellerDetailPageModule {}
