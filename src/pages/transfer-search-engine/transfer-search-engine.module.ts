import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferSearchEnginePage } from './transfer-search-engine';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TransferSearchEnginePage,
  ],
  imports: [
    IonicPageModule.forChild(TransferSearchEnginePage),
    DirectivesModule
  ],
})
export class TransferSearchEnginePageModule {}
