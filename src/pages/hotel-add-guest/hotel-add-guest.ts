import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HotelAddGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-add-guest',
  templateUrl: 'hotel-add-guest.html',
})
export class HotelAddGuestPage {
  
  personDetail={
    title:"",
    firstName:"",
    lastName:"",
    age:""
  }
  isAdult: boolean = true;
  isChild: boolean = false;
  callBack;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isAdult = this.navParams.get("isAdult");
    this.isChild = this.navParams.get("isChild");
    this.personDetail = this.navParams.get("detail");
    this.callBack = this.navParams.get("callBack");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelAddGuestPage');
  }

  isButtonDisable(){
    if(this.personDetail.title&&this.personDetail.firstName.trim()&&this.personDetail.lastName.trim()&&this.personDetail.age&&((!this.isChild&&parseInt(this.personDetail.age)>12)||this.isChild)){
      return false
    }else{
      return true
    }
  }

  addGuest(Form){
    this.callBack(this.personDetail).then(() => {
      this.navCtrl.pop();
    });
  }

  goBack(){
    this.navCtrl.pop();
  }

}
