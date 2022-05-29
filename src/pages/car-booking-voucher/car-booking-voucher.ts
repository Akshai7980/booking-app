import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { addres } from '../../providers/constants/constants';
import { HomePage } from '../home/home';

/**
 * Generated class for the CarBookingVoucherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-booking-voucher',
  templateUrl: 'car-booking-voucher.html',
})
export class CarBookingVoucherPage {
  sameLocation: boolean = true;loading;
  pickUpLocation;
  dropOffLocation;
  residentCountry;
  driver_age;
  pickUpDate: Date = new Date();
  dropOffDate: Date = new Date();
  departDate = new Date();
  addres;
  arrivaltime;departuretime;
  car;
  vender;
  isClose: boolean = true;
  isHidden = [];
  rentalDetails = [];
  personDetail;bool= false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public carProvider:CarProvider,
    public loadingCtrl:LoadingController) {
    this.presentLoading();
    this.sameLocation = this.navParams.get("sameLocation");
    this.pickUpLocation = this.navParams.get("pickUpLocation");
    this.dropOffLocation = this.navParams.get("dropOffLocation");
    this.pickUpDate = this.navParams.get("pickUpDate");
    this.dropOffDate = this.navParams.get("dropOffDate");
    this.arrivaltime = this.navParams.get("arrivaltime");
    this.departuretime = this.navParams.get("departuretime")
    this.residentCountry = this.navParams.get("residentCountry");
    this.driver_age = this.navParams.get("driver_age");
    this.car = this.navParams.get("car");
    this.vender = this.navParams.get("vender");
    this.personDetail = this.navParams.get("personDetail")
    this.addres = addres;

    
  

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarBookingVoucherPage');
    this.getBookimg();
  }
  ionViewCanLeave() {
    return this.bool;
  }
  goBack(){
    this.bool = true
    this.navCtrl.push(HomePage)
  }
  

  getBookimg() {
    this.carProvider.getCarBooking(
        this.dateFormatter(this.pickUpDate),
        this.dateFormatter(this.dropOffDate),
        this.arrivaltime[0].houres+":"+this.arrivaltime[0].mintues,
        this.departuretime[0].houres+":"+this.departuretime[0].mintues,
        this.pickUpLocation.cityCode,
        this.dropOffLocation.cityCode,
        this.residentCountry,
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0],
        this.car.vehavailcore[0].reference[0].URL[0],
        this.car.vehavailcore[0].reference[0].ID[0],
        this.car.vehavailcore[0].reference[0].DateTime[0]
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

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }



}
