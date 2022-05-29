import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayResultsPage } from './holiday-results';
import { Ionic2RatingModule } from 'ionic2-rating';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    HolidayResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayResultsPage),
    Ionic2RatingModule,
    PipesModule
  ],
})
export class HolidayResultsPageModule {}
