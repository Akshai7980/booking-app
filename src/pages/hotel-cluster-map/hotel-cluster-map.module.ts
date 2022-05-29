import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelClusterMapPage } from './hotel-cluster-map';

@NgModule({
  declarations: [
    HotelClusterMapPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelClusterMapPage),
  ],
})
export class HotelClusterMapPageModule {}
