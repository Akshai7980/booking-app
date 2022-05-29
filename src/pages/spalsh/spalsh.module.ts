import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpalshPage } from './spalsh';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SpalshPage,
  ],
  imports: [
    IonicPageModule.forChild(SpalshPage),
    ComponentsModule
  ],
})
export class SpalshPageModule {}
