import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightSeeingDetailPage } from './sight-seeing-detail';
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [
    SightSeeingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SightSeeingDetailPage),
    Ionic2RatingModule
  ],
})
export class SightSeeingDetailPageModule {}
