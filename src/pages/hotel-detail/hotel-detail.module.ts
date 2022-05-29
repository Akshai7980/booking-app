import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelDetailPage } from './hotel-detail';
import { Ionic2RatingModule } from "ionic2-rating";

import { ComponentsModule } from "../../components/components.module";
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    HotelDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelDetailPage),
    Ionic2RatingModule,
    ComponentsModule,
    DirectivesModule
  ],
})
export class HotelDetailPageModule {}
