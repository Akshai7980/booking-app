import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DomesticFlightRulesPage } from './domestic-flight-rules';

@NgModule({
  declarations: [
    DomesticFlightRulesPage,
  ],
  imports: [
    IonicPageModule.forChild(DomesticFlightRulesPage),
  ],
})
export class DomesticFlightRulesPageModule {}
