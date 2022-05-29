import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from "ionic-angular";
import { Hotel_ACCESS, Hotel_Image, HOTEL_USER_ID, HOTEL_USER_PASSWORD, CLIENT_NATIONALITY,HOTEL_IP_ADDRESS } from "../../providers/constants/constants";
import { HotelsProvider } from "../../providers/hotels/hotels";
import { NoResultPage } from "../no-result/no-result";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { HotelDetailPage } from '../hotel-detail/hotel-detail';

/**
 * Generated class for the MyHotelResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-hotel-results',
  templateUrl: 'my-hotel-results.html',
})
export class MyHotelResultsPage {
  hotelCity;
  rooms;
  checkInDate = new Date();  checkoutDate = new Date();
  loading;searchResults = [];statusData: any;
  sortingName; maxResult = 20;
  maxPrice: number = 0;
  minPrice: number = 0;
  selectedMaxPrice: number = 0;
  selectedMinPrice: number = 0;
  HotelImage;
  column = "";
  selectedHotel;
  guestCount = 1;
  filterData: any;
  getNightStayDays;
  currency;
  hotelCodes;hotelAllMarkup;HotelFix;
  constructor( public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public hotelProvider: HotelsProvider,public modalCtrl: ModalController) {
    this.presentLoading();
    this.currency = this.navParams.get("currency");  
    this.hotelCity = this.navParams.get("hotelCity");
    this.rooms = this.navParams.get("rooms");
    console.log("checkInDate",this.checkInDate)
    this.checkInDate = this.navParams.get("checkInDate");
    this.checkoutDate = this.navParams.get("checkoutDate");
    this.getNightStayDays= this.navParams.get("getNightStayDays");
    this.hotelCodes = this.navParams.get("hotelCodes");
    this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
    this.HotelFix = this.navParams.get("HotelFix");
    this.guestCount = 0;
    for (let i = 0; i < this.rooms.length; i++) {
      this.guestCount = this.guestCount + this.rooms[i].roomSize;
    }
    this.HotelImage = Hotel_Image;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyHotelResultsPage');
    this.hotelSearch();
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });

    this.loading.present();
  }

  hotelSearch() {
    let obj = {
      access: Hotel_ACCESS,
      ip_address: HOTEL_IP_ADDRESS,
      user_id: HOTEL_USER_ID,
      user_password: HOTEL_USER_PASSWORD,
      checkin: this.dateFormatter(this.checkInDate),
      checkout: this.dateFormatter(this.checkoutDate),
      client_nationality: CLIENT_NATIONALITY,
      requiredCurrency: this.currency,    
      hotelCodes: [this.hotelCodes],
      radius: 20,
      maxResult: 20,
      occupancy: this.rooms,
    };
    console.log("mysendobj", JSON.stringify(obj));
    this.hotelProvider.getHotelResults(obj).then((data) => {
        this.loading.dismiss();
        if (data.itineraries) {
          this.searchResults = data.itineraries;
          this.statusData = data.status;
          console.log(this.searchResults);
          console.log(this.statusData);
          this.searchResults.forEach((ans,i) => {
          this.searchResults[i]['face'] =[];
          ans.facilities.forEach((val,index) => {
            var obj ={};
            obj ={name:val,url:this.HotelImage+''+val+'.svg'};
            this.searchResults[i]['face'].push(obj);
          });
      });
    //  console.log("dsifsf", this.searchResults);
        } else {
          console.log("empty response");
          this.goToNoResultPage();
        }
      })
      .catch((err) => {
        this.loading.dismiss();
        this.goToNoResultPage();
        console.error(err);
      });
  }
  
  getReviewDetail(rate) {
    if (parseFloat(rate) > 4) {
      return "Excellent";
    } else if (parseFloat(rate) > 3) {
      return "Very Good";
    } else if (parseFloat(rate) > 2) {
      return "Average";
    } else if (parseFloat(rate) > 1) {
      return "Worst";
    } else return "Terible";
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

  hotelSelected(hotel) {
    this.navCtrl.push(HotelDetailPage, {
      sessionId: this.statusData.sessionId,
      hotelDetail: hotel,
      rooms: this.rooms,
      checkInDate: this.checkInDate,
      checkoutDate: this.checkoutDate,
      getNightStayDays:this.getNightStayDays,
      hotelAllMarkup: this.hotelAllMarkup,
      HotelFix: this.HotelFix
    });
  }

}
