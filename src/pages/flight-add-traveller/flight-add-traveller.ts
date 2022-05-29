import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { SearchCountryCodeComponent } from '../../components/search-country-code/search-country-code';

/**
 * Generated class for the FlightAddTravellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-add-traveller',
  templateUrl: 'flight-add-traveller.html',
})
export class FlightAddTravellerPage {
  isAdult: boolean = true;
  isChild: boolean = false;
  isInfant: boolean = false;
  detail: any;
  isPassportMandatory: boolean = false;
  isNationality: boolean = false;
  callBack;
  // minDate: any;
  // maxDate: any;
  departDate=new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams, public datePicker:DatePicker, public modalCtrl:ModalController) {
    this.isAdult = this.navParams.get("isAdult");
    this.isChild = this.navParams.get("isChild");
    this.isInfant = this.navParams.get("isInfant");
    this.detail = this.navParams.get("detail");
    this.isPassportMandatory = this.navParams.get("isPassportMandatory");
    console.log("isPassportMandatory",  this.isPassportMandatory)
    this.isNationality = this.navParams.get("isNationality");
    this.callBack = this.navParams.get("callBack");
    this.departDate = this.navParams.get("departDate");
    // if(this.isAdult){
    //   this.detail.type="adult"
    // }
    // if(this.isChild){
    //   this.detail.type="child"
    // }
    // if(this.isInfant){
    //   this.detail.type="infant"
    // }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightAddTravellerPage');
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


  goBack(){
    this.navCtrl.pop();
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
        this.detail.passportIssueCountry = data.countryName;
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
        this.detail.nationality = data.countryName;
      }
      console.log(data);
    });
  }

  addTravellerDetail(form) {
    this.callBack(this.detail).then(() => {
      this.navCtrl.pop();
    });
  }

  getButtonStatus(){
    let nationality = true;
    if(this.isNationality){
      if(this.detail.nationality){
        nationality = true;
      }else{
        nationality = false;
      }
    }else{
      nationality =true;
    }
    let passportMandatory = true;
    if(this.isPassportMandatory){
      if(this.detail.passportNo && this.detail.issueDate && this.detail.passportIssueCountry){
        passportMandatory = true;
      }else{
        passportMandatory = false;
      }
    } else{
      passportMandatory = true;
    }
    console.log(nationality,passportMandatory)
    if(this.detail.title && this.detail.firstName && this.detail.lastName && this.detail.gender && this.detail.dob && nationality && passportMandatory){
      return false
     // if(this.isNationality &&)
    }else{
      return true;
    }
  }

}
