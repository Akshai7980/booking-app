import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarSearchEnginePage } from './car-search-engine';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CarSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(CarSearchEnginePage),
    DirectivesModule
  ],
})
export class CarSearchEnginePageModule {}
