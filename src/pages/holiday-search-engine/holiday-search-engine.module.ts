import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidaySearchEnginePage } from './holiday-search-engine';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    HolidaySearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(HolidaySearchEnginePage),
    DirectivesModule
  ],
})
export class HolidaySearchEnginePageModule {}
