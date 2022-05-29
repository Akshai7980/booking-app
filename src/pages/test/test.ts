import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  checkInDate=new Date();
  checkoutDate=new Date();
  newDate=new Date();
  maxDate: any;
  ChildDate :"2018-07-22";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.checkInDate = this.navParams.get("checkInDate");
    this.checkoutDate = this.navParams.get("checkoutDate");
     this.dateFormatter(this.checkInDate);
     this.dateFormatter(this.checkoutDate);

     this.maxDate =new Date().setFullYear(new Date().getFullYear()-2);
     console.log("",this.ChildDate)
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    console.log("",this.ChildDate)
  }

  dateFormatter(dateString) {
    if (dateString) {
      return (
        dateString.getFullYear() + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" + ("0" + dateString.getDate()).slice(-2));
    } else {
      return null;
    }
  }

  dateFormattermin(dateString) {
    if (dateString) {
      return (
        (dateString.getFullYear()-2) + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" + ("0" + dateString.getDate()).slice(-2));
  
      } else {
      return null;
    }
  }


}
