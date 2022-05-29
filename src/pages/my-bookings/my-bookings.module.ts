import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingsPage } from './my-bookings';

@NgModule({
  declarations: [
    MyBookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBookingsPage),
  ],
  exports:[MyBookingsPage],
  entryComponents:[MyBookingsPage]
})
export class MyBookingsPageModule {}
