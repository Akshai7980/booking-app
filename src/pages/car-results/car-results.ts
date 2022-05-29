import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { CarProvider } from "../../providers/car/car";
import { CarRentalDetailPage } from "../car-rental-detail/car-rental-detail";
import { NoResultPage } from "../no-result/no-result";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";

/**
 * Generated class for the CarResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-car-results",
  templateUrl: "car-results.html"
})
export class CarResultsPage {
  sameLocation: boolean = true;
  pickUpLocation;
  dropOffLocation;
  residentCountry = "IN";
  driver_age = 25;
  pickUpDate: Date = new Date();
  dropOffDate: Date = new Date();
  carSearchResult:any;
  vehvendoravail:any;
  cars=[];
  loading;arrivaltime;departuretime;currency;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carProvider: CarProvider,
    public loadingCtrl:LoadingController
  ) {
    this.presentLoading();
    this.sameLocation = this.navParams.get("sameLocation");
    this.pickUpLocation = this.navParams.get("pickUpLocation");
    this.dropOffLocation = this.navParams.get("dropOffLocation");
    this.pickUpDate = this.navParams.get("pickUpDate");
    this.dropOffDate = this.navParams.get("dropOffDate");
    this.residentCountry = this.navParams.get("residentCountry");
    this.driver_age = this.navParams.get("driver_age");
    this.arrivaltime = this.navParams.get("arrivaltime");
    this.departuretime = this.navParams.get("departuretime")
    this.currency = this.navParams.get("currency");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CarResultsPage");
    this.getCarSearchResults();
  }

  getCarSearchResults() {
    this.carProvider.getCarSeach(
      this.pickUpLocation.cityCode,
      this.dropOffLocation.cityCode,
      this.dateFormatter(this.pickUpDate),
      this.arrivaltime[0].houres+":"+this.arrivaltime[0].mintues,
      this.dateFormatter(this.dropOffDate),
      this.departuretime[0].houres+":"+this.departuretime[0].mintues,
      this.sameLocation?'1':'0',
      this.residentCountry,
      this.driver_age,
      this.currency
    ).then(data=>{
      console.log(data)
      this.loading.dismiss();
      if(data.length>0){
        console.log("alldata",data[0])
        this.carSearchResult=data[0];
        this.vehvendoravail=this.carSearchResult.vehvendoravails[0].vehvendoravail[0];
        this.cars=this.vehvendoravail.vehavails[0].vehavail;
        console.log("carSearchResult alldata",this.carSearchResult)
      }else{
        console.error("no data");
        this.goToNoResultPage();
      }
    }).catch(err=>{
      console.log(err)
      this.loading.dismiss();
      this.goToNoResultPage();
    })
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

  carSelected(car){
    this.navCtrl.push(CarRentalDetailPage,{
      sameLocation:this.sameLocation,
      pickUpLocation:this.pickUpLocation,
      dropOffLocation:this.dropOffLocation,
      pickUpDate:this.pickUpDate,
      dropOffDate:this.dropOffDate,
      arrivaltime:this.arrivaltime,
      departuretime:this.departuretime,
      residentCountry:this.residentCountry,
      driver_age:this.driver_age,
      car:car,
      vender:this.vehvendoravail.vendor[0],

    })
  }

  goBack(){
    this.navCtrl.pop();
  }
z
  goToNoResultPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(NoResultPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  goToNoWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  // presentLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: `
  //       Please Wait...`
  //   });

  //   this.loading.present();
  // }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
       spinner: "bubbles",
       content: "Loading Please Wait...",
      //content: '<img src="../assets/imgs/transfers.gif"  alt="loading">'+ 'The Walztravels Explore the world your way with our app for iPhone and Android',
      //spinner: 'hide'
    });
    this.loading.present();
  }
}
