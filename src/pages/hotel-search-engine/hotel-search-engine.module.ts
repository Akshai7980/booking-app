import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelSearchEnginePage } from './hotel-search-engine';
import { DirectivesModule } from '../../directives/directives.module';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [
    HotelSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(HotelSearchEnginePage),
    DirectivesModule,
    CalendarModule
  ],
})
export class HotelSearchEnginePageModule {}
