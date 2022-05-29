import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CruiseSearchEnginePage } from './cruise-search-engine';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CruiseSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(CruiseSearchEnginePage),
    DirectivesModule
  ],
})
export class CruiseSearchEnginePageModule {}
