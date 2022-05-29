import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelResultsPage } from './hotel-results';
import { Ionic2RatingModule } from 'ionic2-rating';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    HotelResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelResultsPage),
    Ionic2RatingModule,
    DirectivesModule,
    PipesModule
  ],
})
export class HotelResultsPageModule {}
