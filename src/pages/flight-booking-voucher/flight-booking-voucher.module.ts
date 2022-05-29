import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightBookingVoucherPage } from './flight-booking-voucher';

@NgModule({
  declarations: [
    FlightBookingVoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightBookingVoucherPage),
  ],
})
export class FlightBookingVoucherPageModule {}
