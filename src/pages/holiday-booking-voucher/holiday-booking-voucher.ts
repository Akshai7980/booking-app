import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HolidaysProvider } from "../../providers/holidays/holidays";
import { addres } from '../../providers/constants/constants';
/**
 * Generated class for the HolidayBookingVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-holiday-booking-voucher',
  templateUrl: 'holiday-booking-voucher.html',
})
export class HolidayBookingVoucherPage {
  departDate: Date = new Date();
  jsonObj;holiday;loading;contactDeatil;adults;children;infants;holidayDetail;holidayBookingDetail=[];personDetail;contact;
  constructor(public navCtrl: NavController, public navParams: NavParams, public holidayProvider: HolidaysProvider, public loadingCtrl: LoadingController,) {
    this.presentLoading();
    this.jsonObj = this.navParams.get("jsonObj");
    this.holiday = this.navParams.get("holiday");
    this.contactDeatil = this.navParams.get("contactDeatil");
    this.holidayDetail = this.navParams.get("holidayDetail")
    this.personDetail = this.navParams.get("personDetail")
    console.log('ionViewDidLoad ',this.personDetail);
    this.adults = this.navParams.get("adults");
    this.children = this.navParams.get("children");
    this.infants = this.navParams.get("infants");
    this.contact=addres
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayBookingVoucherPage');
    this.getHolidayBooking()
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });
    this.loading.present();
  }

  getHolidayBooking() {
    let title=[];
    for (let i = 0; i < this.adults.length; i++) {
      title.push(this.adults[i].title);
    }
    
    let firstName=[];
    for (let i = 0; i < this.adults.length; i++) {
      firstName.push(this.adults[i].firstName);
    }
    let lastName=[];
    for (let i = 0; i < this.adults.length; i++) {
      lastName.push(this.adults[i].lastName);
    }
    let dob=[];
    for (let i = 0; i < this.adults.length; i++) {
      dob.push(this.adults[i].dob);
    }
    let gender=[];
    for (let i = 0; i < this.adults.length; i++) {
      gender.push(this.adults[i].gender);
    }
    let nationality=[];
    for (let i = 0; i < this.adults.length; i++) {
      nationality.push(this.adults[i].nationality);
    }
    let jsonObj = {
      id:this.holidayDetail[0].id,
      user_id: this.jsonObj.user_id,
      user_password: this.jsonObj.user_password,
      access: this.jsonObj.access,
      ip_address: this.jsonObj.ip_address,
      email:this.contactDeatil.email,
      mobile_no:this.contactDeatil.mobile_no,
      quantity : title.length,
      title : title,
      first_name : firstName,
      last_name : lastName,
      dob : dob,
      gender : gender,
      nationality : nationality,
      past_passenger : this.contactDeatil.past_passenger,
      pre_booking_ref: this.contactDeatil.pre_booking_ref,
      pre_ex_med_cond :this.contactDeatil.pre_ex_med_cond,
    };
    console.log(jsonObj)
    this.holidayProvider.getHolidayBooking(jsonObj).then((data) => {
        this.loading.dismiss();
        console.log(data);
        this.holidayBookingDetail = data
      })
      .catch((err) => {
        console.log(err);
        this.loading.dismiss();
        this.navCtrl.pop();
      });
  }


}
