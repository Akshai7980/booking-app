import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular";
import { LoginProvider } from '../../providers/login/login';
import { CarBookingVoucherPage } from '../car-booking-voucher/car-booking-voucher';

/**
 * Generated class for the CarTravellerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-car-traveller-detail",
  templateUrl: "car-traveller-detail.html"
})
export class CarTravellerDetailPage {
  pickUpLocation; dropOffLocation; pickUpDate; dropOffDate; sameLocation; residentCountry; driver_age;
  user: any = {}; callBack; car;
  personDetail = {title: "", firstName: "", lastName: "", email: "", country_code: "", mobile_no: "",
  country: "",address:"",cardtype:"",
  cc_type:"",cc_number:"",cardholdername:"",cc_mo:"",cc_yr:"",cc_code:"", };
  arrivaltime;departuretime;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController,
    public loginProvider: LoginProvider) {
    // this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    // this.personDetail.title = this.user.title;
    // this.personDetail.firstName = this.user.fname;
    // this.personDetail.lastName = this.user.lname;
    // this.personDetail.email = this.user.emailid;
    // this.personDetail.country_code = this.user.country_code;
    // this.personDetail.mobile_no = this.user.mobile;
    this.personDetail.country = this.navParams.get("residentCountry");
    this.car = this.navParams.get("car");
    this.sameLocation = this.navParams.get("sameLocation");
    this.pickUpLocation = this.navParams.get("pickUpLocation");
    this.dropOffLocation = this.navParams.get("dropOffLocation");
    this.pickUpDate = this.navParams.get("pickUpDate");
    this.dropOffDate = this.navParams.get("dropOffDate");
    this.driver_age = this.navParams.get("driver_age");
    this.arrivaltime = this.navParams.get("arrivaltime");
    this.departuretime = this.navParams.get("departuretime")
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CarTravellerDetailPage");
  }
  isButtonDisable() {
    if (
      this.personDetail.title &&
      this.personDetail.firstName.trim() &&
      this.personDetail.lastName.trim() &&
      this.personDetail.email.trim() &&
      this.personDetail.country_code.trim() &&
      this.personDetail.mobile_no.trim() &&
      this.personDetail.address &&
      //this.personDetail.postcode &&
      this.personDetail.country
    ) {
      return false;
    } else {
      return true;
    }
  }
  makepayment(Form) {
    this.navCtrl.push(CarBookingVoucherPage,{
      car:this.car,
      pickUpLocation:this.pickUpLocation,
      dropOffLocation:this.dropOffLocation,
      pickUpDate:this.pickUpDate,
      dropOffDate:this.dropOffDate,
      sameLocation:this.sameLocation,
      residentCountry:this.residentCountry,
      driver_age:this.driver_age,
      personDetail: this.personDetail,
      arrivaltime:this.arrivaltime,
      departuretime:this.departuretime 

    });
  }
  



}
