import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Slides, ToastController,AlertController } from 'ionic-angular';
import { SomethingWentWrongPage } from '../something-went-wrong/something-went-wrong';
import { HotelsProvider } from '../../providers/hotels/hotels';
import { FlightTransferResultsPage } from '../flight-transfer-results/flight-transfer-results';
import { TransferProvider } from '../../providers/transfer/transfer';
/**
 * Generated class for the FlightHotelDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-hotel-details',
  templateUrl: 'flight-hotel-details.html',
})
export class FlightHotelDetailsPage {
  //  map: GoogleMap;
  @ViewChild(Slides) slides: Slides;
  loading;sessionId;tokenId;searchResults; hotelDetail;hotelCity; rooms;
  fromCity;toCity;departDate;returnDate;personDetail;flightClass;currencys;
  hotelContentDetail=[];
  guestCount = 1;
  buildingInfo = [];facilities = [];roomFacilities = [];
  meals = []; sports = [];payments = [];
  hotelDescription="";
  isAmenitiesReadMore: boolean = true;
  isMoreReview:boolean=false;
  currentIndex=0;roomOptionResult;hotelImage;
  isHiddenl =[];isHidden = [];
  flightInfo;
  isPerBookingRates: boolean = false;isRoomCombination: boolean = false;
  isSimpleRoomRates: boolean = false;getNightStayDays;
  roomOptionMaps = [];perBookingRates = [];selectedOption = [];  totalPrice = 0;
  totalAdultCount = 0; totalChildCount = 0;totalInfantCount = 0;
  hotelAllMarkup;HotelFix;FlightAllMarkup;FlightAllFix;
   constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public loadingCtrl:LoadingController, public hotelProvider:HotelsProvider,public transferProvider:TransferProvider,
    public toastCtrl: ToastController) {
     this.presentLoading();
     this.sessionId = this.navParams.get("sessionId");
     this.hotelDetail = this.navParams.get("hotelDetail");
     this.hotelCity = this.navParams.get("hotelCity");
     this.rooms = this.navParams.get("rooms");
     this.tokenId = this.navParams.get("tokenId");
     this.searchResults = this.navParams.get("searchResults")
     this.getNightStayDays = this.navParams.get("getNightStayDays");
     this.fromCity = this.navParams.get("fromCity");
     this.toCity = this.navParams.get("toCity");
     this.departDate = this.navParams.get("departDate");
     this.returnDate = this.navParams.get("returnDate");
     this.flightClass = this.navParams.get("flightClass");
     this.currencys = this.navParams.get("currencys");
     this.flightInfo = this.navParams.get("flightInfo");
     this.totalAdultCount = this.navParams.get("totalAdultCount");
    this.totalChildCount = this.navParams.get("totalChildCount");
    this.totalInfantCount = this.navParams.get("totalInfantCount");
     this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
     this.HotelFix = this.navParams.get("HotelFix");
     this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
     this.FlightAllFix = this.navParams.get("FlightAllFix");
     this.guestCount = 0;
     for (let i = 0; i < this.rooms.length; i++) {
       this.guestCount = this.guestCount + this.rooms[i].roomSize;
     }
     console.log(this.hotelDetail.facilities)
   }
   ionViewDidLoad() {
    this.getRoomOptions()
    this.getHotelDetail();
    
  }
  goBack(){
    this.navCtrl.pop();
  }
  getHotelDetail() {
    this.hotelProvider.getSpecificHotelContent(this.sessionId,this.hotelDetail.hotelId,
      this.hotelDetail.productId,this.hotelDetail.tokenId).then(data => {
       this.hotelContentDetail.push(data);
       this.transferCity();
       console.log("hotelContentDetail",this.hotelContentDetail)
       this.hotelImage = data.hotelImages;
         this.loading.dismiss();
      })
      .catch(err => {
        console.error(err);
        this.loading.dismiss();
        this.goToSomethingWentWrongPage();
      });
  }b
  transferCities= []
  transferCity(){
    let json= {
      place: this.hotelContentDetail[0].name,
    }
    this.transferProvider.getDropOff(json).then(data=>{
      this.transferCities = data;
      console.log("TransferCitySeach", this.transferCities)
    }).catch(err=>{
      console.log(err)
    })
  }

  getRoomOptions() {
    let jsonObj = {sessionId: this.sessionId, productId: this.hotelDetail.productId,
      tokenId: this.hotelDetail.tokenId, hotelId: this.hotelDetail.hotelId };
      this.hotelProvider.getRoomOptios(jsonObj).then((data) => {
       // this.loading.dismiss();
        this.sessionId = data.sessionId;
        this.roomOptionResult = data.roomRates.perBookingRates;
        console.log("selectedroom",this.roomOptionResult);
      })
      .catch((err) => {
        //this.loading.dismiss();
        console.log(err);
        this.goToSomethingWentWrongPage();
      });
  }


  goToSomethingWentWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }


  getReviewDetail(rate){
    if(parseFloat(rate)>4){
      return "Excellent"
    }else if(parseFloat(rate)>3){
      return "Very Good"
    } else if(parseFloat(rate)>2){
        return "Average"
    } else if(parseFloat(rate)>1){
      return "Worst"
  } else return "Terible"
  }
  
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }

  gotoCancellation(abc) {
    const alert = this.alertCtrl.create({
      title: 'Cancellation Policy',
      subTitle: abc,
      buttons: ['OK']
    });
    alert.present();
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }
  
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  btnClick(data){
     this.navCtrl.push(FlightTransferResultsPage, {
       sessionId: this.sessionId,
       hotelDetail: this.hotelDetail,
       hotelContentDetail: this.hotelContentDetail,
       hotelCity: this.hotelCity,
       rooms: this.rooms,
       selectedOption: data,
       getNightStayDays:this.getNightStayDays,
       totalPrice: this.totalPrice,
       flightInfo: this.flightInfo,
      
       fromCity: this.fromCity,
       toCity: this.toCity,
       departDate: this.departDate,
       returnDate: this.returnDate,
       personDetail: this.personDetail,
       flightClass: this.flightClass,
       totalAdultCount:this.totalAdultCount,
       totalChildCount:  this.totalChildCount,
       totalInfantCount:  this.totalInfantCount,
       currencys: this.currencys,
       hotelAllMarkup: this.hotelAllMarkup,
       HotelFix: this.HotelFix,
       FlightAllMarkup: this.FlightAllMarkup,
       FlightAllFix:this.FlightAllFix,
       transferCities:this.transferCities
     });
   }
 
  
 }
