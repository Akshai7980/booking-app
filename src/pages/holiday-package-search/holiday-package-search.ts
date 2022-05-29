import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HolidaysProvider } from '../../providers/holidays/holidays';

/**
 * Generated class for the HolidayPackageSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-holiday-package-search',
  templateUrl: 'holiday-package-search.html',
})
export class HolidayPackageSearchPage {
  callback;
  packages=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public holidayProvider:HolidaysProvider) {
    this.callback = this.navParams.get('callback');
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayPackageSearchPage');
  }

 
 

  onChange(ev){
    console.log(ev)
    ev=ev.replace(" ", "%20");
    this.holidayProvider.getHolidayPackageSeach(ev).then(data=>{
      this.packages = data;
      console.log("dfdsfsdfdsaf",data)
    }).catch(err=>{
      console.log(err)
    })
  }

  
  selectedCity(value){
    console.log(value);
    this.callback(value).then( () => { this.navCtrl.pop() });
  }
  
  goBack(){
    this.navCtrl.pop();
  }

 

}









