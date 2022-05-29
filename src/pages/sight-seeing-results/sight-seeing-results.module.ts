import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightSeeingResultsPage } from './sight-seeing-results';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SightSeeingResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SightSeeingResultsPage),
    ComponentsModule
  ],
})
export class SightSeeingResultsPageModule {}
