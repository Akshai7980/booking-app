import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightSeeingSearchEnginePage } from './sight-seeing-search-engine';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    SightSeeingSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(SightSeeingSearchEnginePage),
    DirectivesModule
  ],
})
export class SightSeeingSearchEnginePageModule {}
