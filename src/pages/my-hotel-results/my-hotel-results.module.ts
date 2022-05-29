import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyHotelResultsPage } from './my-hotel-results';
import { PipesModule } from '../../pipes/pipes.module';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyHotelResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyHotelResultsPage),
    PipesModule,
    Ionic2RatingModule
  ],
})
export class MyHotelResultsPageModule {}
