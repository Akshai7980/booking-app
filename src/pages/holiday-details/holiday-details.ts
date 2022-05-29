import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController,Slides} from "ionic-angular";
//import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, Environment, GoogleMapsMapTypeId} from "@ionic-native/google-maps";
import { HolidaysProvider } from "../../providers/holidays/holidays";
import { LoginProvider } from "../../providers/login/login";
import { HolidayTravellerDetailPage } from "../holiday-traveller-detail/holiday-traveller-detail";
// import { LoginPage } from "../login/login";

/**
 * Generated class for the HolidayDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-holiday-details",
  templateUrl: "holiday-details.html",
})
export class HolidayDetailsPage {
  @ViewChild(Slides) slides: Slides;
  holiday;jsonObj; holidayDetail;loading;currentIndex=0;
  isHiddenl = [];isHidden = [];isHiddenw = [];isHiddenr = [];currency;
  constructor(public navCtrl: NavController,public navParams: NavParams,public holidayProvider: HolidaysProvider,public loginProvider: LoginProvider,
    public loadingCtrl: LoadingController,  public toastCtrl: ToastController) {
    this.presentLoading();
    this.jsonObj = this.navParams.get("jsonObj");
    this.holiday = this.navParams.get("holiday");
    this.currency= this.navParams.get("currency");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HolidayDetailsPage");
    this.getHolidayDetail();
    //this.loadMap();
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });
    this.loading.present();
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }
 
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle",
    });
    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    toast.present();
  }

  getHolidayDetail() {
    let jsonObj = {
      user_id: this.jsonObj.user_id,
      user_password: this.jsonObj.user_password,
      access: this.jsonObj.access,
      ip_address: this.jsonObj.ip_address,
      id: this.holiday.id,
    };
    this.holidayProvider.getHolidayDetail(jsonObj).then((data) => {
        this.loading.dismiss();
        this.holidayDetail = data.holidays_det;
        console.log(this.holidayDetail);
        if(!this.holidayDetail){
          this.presentToast('Holiday Package Not Availbale');
         // this.navCtrl.pop();
        }
      })
      .catch((err) => {
        console.log(err);
        this.loading.dismiss();
        this.presentToast("Holiday Package Not Availbale");
        this.navCtrl.pop();
      });
  }



  // loadMap() {
  //   // This code is necessary for browser
  //   let lat=this.holiday.lat.split(',')[0];
  //   let long=this.holiday.lon.split(',')[0];
  //   Environment.setEnv({
  //     API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBF4cORZmabnOeZ9ARvKA-AstWYIXE-QXw"
  //   });

  //   let mapOptions: GoogleMapOptions = {
  //     mapType: GoogleMapsMapTypeId.NORMAL,
  //     controls: {
  //       compass: true,
  //       myLocationButton: false,
  //       myLocation: true, // (blue dot)
  //       indoorPicker: true,
  //       zoom: true, // android only
  //       mapToolbar: false // android only
  //     },
  //     camera: {
  //       target: {
  //         lat:lat,
  //         lng:long
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     },
  //     preferences: {
  //       zoom: {
  //         minZoom: 15,
  //         maxZoom: 18
  //       },

  //       padding: {
  //         left: 10,
  //         top: 10,
  //         bottom: 10,
  //         right: 10
  //       }
  //     }
  //   };

  //   this.map = GoogleMaps.create("map_canvas", mapOptions);

  //   let marker: Marker = this.map.addMarkerSync({
  //     title: "Yoga City Rishikesh",
  //     icon: "#0072cf",
  //     animation: "DROP",
  //     position: {
  //       lat: lat,
  //       lng: long
  //     }
  //   });

  //   marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //     // alert("clicked");
  //   });
  // }

  goBack() {
    this.navCtrl.pop();
  }

  proceed() {
    this.navCtrl.push(HolidayTravellerDetailPage, {
      currency:this.currency,
      holiday: this.holiday,
      jsonObj: this.jsonObj,
      holidayDetail: this.holidayDetail,
      selectedPrice: {
        startDate: new Date().getFullYear() + "-" + 10 + "-" + 1,
        endDate: new Date().getFullYear() + "-" + 0 + "-" + 21,
        price: this.holiday.total_price,
      },
    });
  }

  // proceed() {
  //   if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //     this.navCtrl.push(HolidayTravellerDetailPage, {
  //       holiday: this.holiday,
  //       jsonObj: this.jsonObj,
  //       holidayDetail: this.holidayDetail,
  //       selectedPrice:{ startDate:new Date().getFullYear()+'-'+ 10+'-'+1,
  //         endDate: new Date().getFullYear()+'-'+ 0+'-'+21,
  //         price: this.holiday.price}
  //     });
  //   } else {
  //     console.log("proceed");
  //     new Promise((resolve, reject) => {
  //       this.navCtrl.push(LoginPage, { resolve: resolve });
  //     }).then(data => {
  //       console.log("then proceed", data);
  //       if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //         this.navCtrl.push(HolidayTravellerDetailPage, {
  //           holiday: this.holiday,
  //           jsonObj: this.jsonObj,
  //           holidayDetail: this.holidayDetail,
  //           selectedPrice:{ startDate:new Date().getFullYear()+'-'+ 10+'-'+1,
  //           endDate: new Date().getFullYear()+'-'+ 0+'-'+21,
  //           price: this.holiday.price}
  //         });
  //       }
  //     });
  //   }
  // }
}
