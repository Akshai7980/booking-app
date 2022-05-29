import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirportSearchPage } from './airport-search';

@NgModule({
  declarations: [
    AirportSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AirportSearchPage),
  ],
})

export class AirportSearchPageModule {}
