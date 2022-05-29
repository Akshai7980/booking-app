import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelBookingVoucherPage } from './hotel-booking-voucher';

@NgModule({
  declarations: [
    HotelBookingVoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelBookingVoucherPage),
  ],
})
export class HotelBookingVoucherPageModule {}
