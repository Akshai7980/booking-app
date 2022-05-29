import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CruiseDetailsPage } from './cruise-details';

@NgModule({
  declarations: [
    CruiseDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CruiseDetailsPage),
  ],
})
export class CruiseDetailsPageModule {}
