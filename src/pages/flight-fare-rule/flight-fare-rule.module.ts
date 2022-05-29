import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightFareRulePage } from './flight-fare-rule';

@NgModule({
  declarations: [
    FlightFareRulePage,
  ],
  imports: [
    IonicPageModule.forChild(FlightFareRulePage),
  ],
})
export class FlightFareRulePageModule {}
