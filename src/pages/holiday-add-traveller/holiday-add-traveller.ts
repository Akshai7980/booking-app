import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { SearchCountryCodeComponent } from '../../components/search-country-code/search-country-code';
/**
 * Generated class for the HolidayAddTravellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-holiday-add-traveller',
  templateUrl: 'holiday-add-traveller.html',
})
export class HolidayAddTravellerPage {
  isAdult: boolean = true;
  isChild: boolean = false;
  isInfant: boolean = false;
  detail: any;
  isPassportMandatory: boolean = false;
  isNationality: boolean = false;
  callBack;
  minDate: any;
  maxDate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public datePicker:DatePicker, public modalCtrl:ModalController) {
    this.isAdult = this.navParams.get("isAdult");
    this.isChild = this.navParams.get("isChild");
    this.isInfant = this.navParams.get("isInfant");
    this.detail = this.navParams.get("detail");
    this.isNationality = this.navParams.get("isNationality");
    this.callBack = this.navParams.get("callBack");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayAddTravellerPage');
  }
  goBack(){
    this.navCtrl.pop();
  }

  getDateOfBirth() {
    if (this.isAdult) {
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-12);
      this.minDate = new Date().setFullYear(new Date().getFullYear()-50);
    } else if (this.isChild) {
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-2);
      this.minDate = new Date().setFullYear(new Date().getFullYear()-12);
    } else if(this.isInfant) {
      this.minDate = new Date().setFullYear(new Date().getFullYear()-2);
      this.maxDate = new Date().setMonth(new Date().getMonth()-1);
    }else{
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-2);
      this.minDate = new Date().setFullYear(new Date().getFullYear());
    }
    this.datePicker.show({
        date: new Date(),
        mode: "date",
        maxDate: this.maxDate,
        minDate: this.minDate,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
      })
      .then(
        date => {
          console.log("Got date: ", date);
          this.detail.dob = date;
        },
        err => console.log("Error occurred while getting date: ", err)
      );
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
    if(this.detail.title && this.detail.firstName && this.detail.lastName && this.detail.gender && this.detail.dob && this.detail.nationality){
      return false
     // if(this.isNationality &&)
    }else{
      return true;
    }
  }

}



