import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { CarProvider } from "../../providers/car/car";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { CarTravellerDetailPage } from '../car-traveller-detail/car-traveller-detail';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CarRentalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-car-rental-detail",
  templateUrl: "car-rental-detail.html"
})
export class CarRentalDetailPage {
  sameLocation: boolean = true;
  pickUpLocation;
  dropOffLocation;
  residentCountry;
  driver_age;
  pickUpDate: Date = new Date();
  dropOffDate: Date = new Date();
  car;
  vender;
  isClose: boolean = true;
  isHidden = [];
  rentalDetails = [];
  loading;arrivaltime;departuretime;currency;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carProvider: CarProvider,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController,
    public loginProvider:LoginProvider
  ) {
    this.presentLoading();
    this.sameLocation = this.navParams.get("sameLocation");
    this.pickUpLocation = this.navParams.get("pickUpLocation");
    this.dropOffLocation = this.navParams.get("dropOffLocation");
    this.pickUpDate = this.navParams.get("pickUpDate");
    this.dropOffDate = this.navParams.get("dropOffDate");
    this.arrivaltime = this.navParams.get("arrivaltime");
    this.departuretime = this.navParams.get("departuretime")
    this.currency = this.navParams.get("currency");
    this.residentCountry = this.navParams.get("residentCountry");
    this.driver_age = this.navParams.get("driver_age");
    this.car = this.navParams.get("car");
    this.vender = this.navParams.get("vender");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CarRentalDetailPage");
    this.getCarRentalDetails();
  }

  getCarRentalDetails() {
    this.carProvider.getCarRentalCondtions(
        this.dateFormatter(this.pickUpDate),
        this.dateFormatter(this.dropOffDate),
        this.arrivaltime[0].houres+":"+this.arrivaltime[0].mintues,
        this.departuretime[0].houres+":"+this.departuretime[0].mintues,
        this.pickUpLocation.cityCode,
        this.dropOffLocation.cityCode,
        this.residentCountry,
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0]
      )
      .then(data => {
        console.log("tsdata",data);
        this.loading.dismiss();
        this.rentalDetails = data.rentalconditions[0].subsection;
        for (let i = 0; i < this.rentalDetails.length; i++) {
          this.isHidden[i] = true;
        }
      })
      .catch(err => {
        this.loading.dismiss();
        console.error(err);
      //  this.goToNoWrongPage();
      });
  }

  dateFormatter(dateString) {
    if (dateString) {
      return (
        ("0" + (dateString.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + dateString.getDate()).slice(-2) +
        "/" +
        dateString.getFullYear()
      );
    } else {
      return null;
    }
  }

  timeFormatter(dateString) {
    if (dateString) {
      return (
        ("0" + dateString.getHours()).slice(-2) +
        ":" +
        ("0" + dateString.getMinutes()).slice(-2)
      );
    } else {
      return null;
    }
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }

  goToNoWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }
  proceed(){
    this.navCtrl.push(CarTravellerDetailPage,{
      car:this.car,
      pickUpLocation:this.pickUpLocation,
      dropOffLocation:this.dropOffLocation,
      pickUpDate:this.pickUpDate,
      dropOffDate:this.dropOffDate,
      sameLocation:this.sameLocation,
      residentCountry:this.residentCountry,
      driver_age:this.driver_age,
      arrivaltime:this.arrivaltime,
      departuretime: this.departuretime
    })
  }
  // proceed(){
  //   if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
  //     this.goToReviewPage()
  //   } else{
  //     console.log("proceed")
  //     new Promise((resolve, reject) => {
  //       this.navCtrl.push(LoginPage, {resolve: resolve})
  //     }).then(data=>{
  //       console.log("then proceed",data)
  //       if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
  //         this.goToReviewPage();
  //       }
  //     })
     
  //   }
  // }
  // goToReviewPage(){
  //   this.navCtrl.push(CarTravellerDetailPage,{
  //     car:this.car,
  //     pickUpLocation:this.pickUpLocation,
  //     dropOffLocation:this.dropOffLocation,
  //     pickUpDate:this.pickUpDate,
  //     dropOffDate:this.dropOffDate,
  //     sameLocation:this.sameLocation,
  //     residentCountry:this.residentCountry,
  //     driver_age:this.driver_age,
  //     arrivaltime:this.arrivaltime,
  //     departuretime: this.departuretime
  //   })
  // }


 
}
