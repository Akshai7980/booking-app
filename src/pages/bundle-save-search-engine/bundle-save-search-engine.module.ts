import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BundleSaveSearchEnginePage } from './bundle-save-search-engine';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    BundleSaveSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(BundleSaveSearchEnginePage),
    DirectivesModule
  ],
})
export class BundleSaveSearchEnginePageModule {}
