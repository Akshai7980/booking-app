import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { SearchCountryCodeComponent } from '../../components/search-country-code/search-country-code';

/**
 * Generated class for the FlightHotelAddGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-hotel-add-guest',
  templateUrl: 'flight-hotel-add-guest.html',
})
export class FlightHotelAddGuestPage {

  personDetail={
    title:"",
    firstName:"",
    lastName:"",
    dob:"",
    gender:"",
    passportNumber:"",
    passportExpiry:"",
    issueCountry:"",
    nationality:""
  }
  isAdult: boolean = true;
  isChild: boolean = false;
  isInfant: boolean = false;
  minDate: any;
  maxDate: any;
  callBack;isPassportMandatory;
  departDate= new Date()
  constructor(public navCtrl: NavController, public navParams: NavParams, public datePicker:DatePicker, public modalCtrl:ModalController) {
    this.isAdult = this.navParams.get("isAdult");
    this.isChild = this.navParams.get("isChild");
    this.isInfant = this.navParams.get("isInfant");
    this.personDetail = this.navParams.get("detail");
    this.isPassportMandatory = this.navParams.get("isPassportMandatory");
    this.callBack = this.navParams.get("callBack");
    this.departDate = this.navParams.get("departDate");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightHotelAddGuestPage');
  }

  dateFormatterminPass(dateString) {
    if (dateString) {
      return (
        (dateString.getFullYear()+10) + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" + ("0" + dateString.getDate()).slice(-2));
    } else {
      return null;
    }
  }

  dateFormattermax(dateString) {
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
  dateFormattermaxAdult(dateString) {
    if (dateString) {
      return (
        (dateString.getFullYear()-12) + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" + ("0" + dateString.getDate()).slice(-2));
    } else {
      return null;
    }
  }

  dateFormatterminAdult(dateString) {
    if (dateString) {
      return (
        ((dateString.getFullYear()-60)) + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" + ("0" + dateString.getDate()).slice(-2));
    } else {
      return null;
    }
  }
  dateFormattermaxChild(dateString) {
    if (dateString) {
      return (
        (dateString.getFullYear()-2) + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" + ("0" + dateString.getDate()).slice(-2));
    } else {
      return null;
    }
  }

  dateFormatterminChild(dateString) {
    if (dateString) {
      return (
        (dateString.getFullYear()-12) + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" + ("0" + dateString.getDate()).slice(-2));
    } else {
      return null;
    }
  }

  getDateOfBirth() {
    if (this.isAdult) {
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-12);
      this.minDate = new Date().setFullYear(new Date().getFullYear()-60);
       // this.maxDate.setFullYear(this.maxDate.getFullYear() - 12);
      // this.maxDate.setDate(this.maxDate.getDate() - 1);
    } else if (this.isChild) {
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-2);
      this.minDate = new Date().setFullYear(new Date().getFullYear()-12);
      // this.minDate = new Date();
      // this.minDate.setFullYear(this.minDate.getFullYear() - 12);
      // this.minDate.setDate(this.minDate.getDate() + 1);
      // this.maxDate = new Date();
      // this.maxDate.setFullYear(this.maxDate.getFullYear() - 2);
    } else if(this.isInfant) {
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-2);
      this.minDate = new Date().setMonth(new Date().getMonth()-1);
      // this.minDate = new Date();
      // this.minDate.setFullYear(this.minDate.getFullYear() - 2);
      // this.minDate.setDate(this.minDate.getDate() + 1);
      // this.maxDate = new Date();
    }else{
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-2);
      this.minDate = new Date().setFullYear(new Date().getFullYear());
    }
    this.datePicker.show({
        date: new Date(),
        mode: "date",
        maxDate: this.maxDate,
        minDate: this.minDate,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      })
      .then(
        date => {
          console.log("Got date: ", date);
          this.personDetail.dob = this.dateFormatter(date)
          console.log(" date: ", this.personDetail.dob);
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  getPassportExpiryDate() {
    this.maxDate = new Date().setFullYear(new Date().getFullYear()-2);
    this.minDate = new Date().setFullYear(new Date().getFullYear());
    this.datePicker.show({
      date: new Date(),
      mode: "date",
      maxDate: this.maxDate,
      minDate: this.minDate,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
      .then(
        date => {
          console.log("Got date: ", date);
          this.personDetail.passportExpiry = this.dateFormatter(date);
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  dateFormatter(dateString) {
    console.log(dateString)
    if (dateString) {
      return (
        dateString.getFullYear() +
        "-" +
        ("0" + (dateString.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + dateString.getDate()).slice(-2)
      );
    } else {
      return null;
    }
   }

  getIssueCountry() {
    let issueCountryModal = this.modalCtrl.create(
      SearchCountryCodeComponent,
      { isCountryName: true },
      { cssClass: "searchCountryNameModel" }
    );
    issueCountryModal.present();
    issueCountryModal.onDidDismiss(data => {
      if (data) {
        this.personDetail.issueCountry = data.countryName;
      }
      console.log(data);
    });
  }
  
  getNationality() {
    let nationalityModal = this.modalCtrl.create(
      SearchCountryCodeComponent,
      { isCountryName: true },
      { cssClass: "searchCountryNameModel" }
    );
    nationalityModal.present();
    nationalityModal.onDidDismiss(data => {
      if (data) {
        this.personDetail.nationality = data.countryName;
      }
      console.log(data);
    });
  }

  isButtonDisable(){
    let passportMandatory = true;
    if(this.isPassportMandatory){
      if(this.personDetail.passportNumber && this.personDetail.passportExpiry && this.personDetail.issueCountry){
        passportMandatory = true;
      }else{
        passportMandatory = false;
      }
    } else{
      passportMandatory = true;
    }
    console.log(passportMandatory)
    if(this.personDetail.title&&this.personDetail.firstName.trim()&&this.personDetail.lastName.trim()&&this.personDetail.dob&&this.personDetail.gender&&((!this.isChild&&parseInt(this.personDetail.dob)>12)||this.isChild)&&passportMandatory){
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
