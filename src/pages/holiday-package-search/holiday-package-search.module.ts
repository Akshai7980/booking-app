import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HolidayPackageSearchPage } from './holiday-package-search';

@NgModule({
  declarations: [
    HolidayPackageSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(HolidayPackageSearchPage),
  ],
})
export class HolidayPackageSearchPageModule {}
