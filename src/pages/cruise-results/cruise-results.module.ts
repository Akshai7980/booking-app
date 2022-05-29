import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CruiseResultsPage } from './cruise-results';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CruiseResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(CruiseResultsPage),
    ComponentsModule
  ],
})
export class CruiseResultsPageModule {}
