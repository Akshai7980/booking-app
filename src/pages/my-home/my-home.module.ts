import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyHomePage } from './my-home';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MyHomePage),
    Ionic2RatingModule,
   
  ],
  exports:[MyHomePage],
  entryComponents:[MyHomePage]
})
export class MyHomePageModule {}
