import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarRentalDetailPage } from './car-rental-detail';

@NgModule({
  declarations: [
    CarRentalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CarRentalDetailPage),
  ],
})
export class CarRentalDetailPageModule {}
