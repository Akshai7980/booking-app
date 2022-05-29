import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarResultsPage } from './car-results';

@NgModule({
  declarations: [
    CarResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(CarResultsPage),
  ],
})
export class CarResultsPageModule {}
