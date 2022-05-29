import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProfilePage } from './my-profile';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    MyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyProfilePage),
    PipesModule
  ],
  exports:[MyProfilePage],
  entryComponents:[MyProfilePage]
})
export class MyProfilePageModule {}
