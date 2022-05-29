import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
/**
 * Generated class for the CruiseAddTravellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-add-traveller',
  templateUrl: 'cruise-add-traveller.html',
})
export class CruiseAddTravellerPage {
  personDetail={
    title:"",
    firstName:"",
    lastName:"",
    dob:"",
    meal:""
  }
  isAdult: boolean = true;
  isChild: boolean = false;
  callBack;
  minDate: any;
  maxDate: any;
  departDate= new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams, public datePicker:DatePicker, public alertCtrl: AlertController) {
    this.isAdult = this.navParams.get("isAdult");
    this.isChild = this.navParams.get("isChild");
    this.personDetail = this.navParams.get("detail");
    this.callBack = this.navParams.get("callBack");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseAddTravellerPage');
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


  isButtonDisable(){
    if(this.personDetail.title&&this.personDetail.firstName.trim()&&this.personDetail.lastName.trim()&&this.personDetail.dob&&((!this.isChild&&parseInt(this.personDetail.dob)>12)||this.isChild)&&this.personDetail.meal){
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
  
  meals=["Veg","Non-Veg","Any"];

  getMeal() {
    let timeData = [];
    for(let i=0;i<this.meals.length;++i){
      timeData.push({
        type: 'radio',
        label : this.meals[i],
        value : this.meals[i],
        checked : i === 0
      });
    }
    let alert = this.alertCtrl.create({
        title : 'Please Select Meal',
        inputs : timeData,
    });
    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        
        this.personDetail.meal = data;
        console.log("Radio data:", this.personDetail.meal);
      }
    });
    
   alert.present();
  
  }


  getDateOfBirth() {
    if (this.isAdult) {
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-12);
      this.minDate = new Date().setFullYear(new Date().getFullYear()-60);
    } else if (this.isChild) {
      this.maxDate = new Date().setFullYear(new Date().getFullYear()-2);
      this.minDate = new Date().setFullYear(new Date().getFullYear()-12);
      
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

}
