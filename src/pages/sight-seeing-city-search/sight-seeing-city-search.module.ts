import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightSeeingCitySearchPage } from './sight-seeing-city-search';

@NgModule({
  declarations: [
    SightSeeingCitySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SightSeeingCitySearchPage),
  ],
})
export class SightSeeingCitySearchPageModule {}
