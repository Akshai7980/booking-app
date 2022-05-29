import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelAddGuestPage } from './hotel-add-guest';

@NgModule({
  declarations: [
    HotelAddGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelAddGuestPage),
  ],
})
export class HotelAddGuestPageModule {}
