import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';

@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
  ],
  exports:[MyAccountPage],
  entryComponents:[MyAccountPage]
})
export class MyAccountPageModule {}
