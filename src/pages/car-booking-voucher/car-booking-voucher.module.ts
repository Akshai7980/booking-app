import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarBookingVoucherPage } from './car-booking-voucher';

@NgModule({
  declarations: [
    CarBookingVoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(CarBookingVoucherPage),
  ],
})
export class CarBookingVoucherPageModule {}
