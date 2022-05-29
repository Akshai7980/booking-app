import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController,AlertController} from 'ionic-angular';
import { TransferProvider } from '../../providers/transfer/transfer';
import { NoResultPage } from '../no-result/no-result';
import { TRANSFER_IMAGE_BASE } from "../../providers/constants/constants";
import { FlightHotelTravellerDetailPage } from '../flight-hotel-traveller-detail/flight-hotel-traveller-detail';
import { LoginProvider } from '../../providers/login/login';



/**
 * Generated class for the FlightTransferResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-transfer-results',
  templateUrl: 'flight-transfer-results.html',
})
export class FlightTransferResultsPage {
  transferCity={atype: "AP", city: "Bangalore",from_code: "BLR",pickup_lat_long: "13.1986351013184,77.7065963745117",value: "Bangalore (Bengaluru Intl. Airport) (BLR), Bangalore, India" };
  transferDest= {drop_code: "393641",drop_type: "GIATA", dropoff_lat_long: "12.972332,77.60870899999999",value: "Bangalore Residency, Bangalore, India"};
  loading; fromCity; toCity; flightInfo; departDate; returnDate;
  personDetail; flightClass;  flightFareRules; currencys;
  isFareRules: boolean = false; map = {};
  cityPair1: string = ""; cityPair2: string = "";
  rooms;
  sessionId;hotelDetail;hotelContentDetail;hotelCity;
  selectedOption;nightStay;roomDetails;totalPrice;AirLineName; 
  hotelAllMarkup;HotelFix;FlightAllMarkup;FlightAllFix;
  totalAdultCount;totalChildCount; totalInfantCount;
  transferCities;getNightStayDays;
  pickUPLocation: any;dropOffLocation: any; transferType = 1;transferWay = 0;
  searchResults: any;
  transferResults: any[] = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public trasferProvider:TransferProvider,
    public toastCtrl:ToastController,
    public alertCtrl: AlertController,
    public loginProvider:LoginProvider
  ) {
    this.presentLoading();
    this.sessionId = this.navParams.get("sessionId");
    this.hotelDetail = this.navParams.get("hotelDetail");
    this.hotelContentDetail = this.navParams.get("hotelContentDetail");
    this.hotelCity = this.navParams.get("hotelCity");
    this.rooms = this.navParams.get("rooms")
    this.selectedOption = this.navParams.get("selectedOption");
    this.roomDetails = this.navParams.get("roomDetails");
    this.nightStay = this.navParams.get("nightStay");
    this.getNightStayDays = this.navParams.get("getNightStayDays");
    this.totalPrice = this.navParams.get("totalPrice");
    this.transferCities = this.navParams.get("transferCities");
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.flightInfo = this.navParams.get("flightInfo");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.currencys = this.navParams.get("currencys");
    this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
    this.HotelFix = this.navParams.get("HotelFix");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.totalAdultCount = this.navParams.get("totalAdultCount");
    this.totalChildCount = this.navParams.get("totalChildCount");
    this.totalInfantCount = this.navParams.get("totalInfantCount");
    
    this.cityPair1 = this.fromCity.AirportCode + this.toCity.AirportCode;
    this.cityPair2 = this.toCity.AirportCode + this.fromCity.AirportCode;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightTransferResultsPage');
    this.getTransferResult();
  }


  getTransferResult() {
    this.trasferProvider.getTransferSearchIttenary(
        this.dateFormatter(this.departDate),
        "10",
        "00",
        this.dateFormatter(this.returnDate),
        "10",
        "30",
        this.transferType,
        this.toCity.AirportCode,
        //this.transferType == 1 ? this.transferDest.drop_code: this.transferDest.drop_code,
        this.hotelContentDetail[0].hotelId,
        this.totalAdultCount,
        this.totalChildCount,
        this.totalInfantCount,
        this.transferWay == 1 ? "one_way" : "return",
        this.hotelDetail.latitude + ',' + this.hotelDetail.longitude,
      )
      .then(data => {
        console.log("taansfer--------",data);
        this.loading.dismiss();
        if (!data.errors) {
          this.searchResults = data;
          this.transferResults = data.travelling.products;
          for (var i = 0; i < this.transferResults.length; i++) {
            this.transferResults[i].isSelectedClose = false;
        }
          for (let i = 0; i < this.transferResults.length; i++) {
            switch (this.transferResults[i].general.producttype) {
              case "Private Transfer":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "ret2_private.jpg";
                break;
              case "Private Luxury Car":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "ret2_suv.jpg";
                break;
              case "Private Minivan":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "minibus.jpg";
                break;
              case "Private Minibus":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "minibus.jpg";
                break;
              case "Private Coach":
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "minibus.jpg";
                break;
              default:
                this.transferResults[i].imageUrl = TRANSFER_IMAGE_BASE + "ret2_private.jpg";
            }
          }
        } else {
          
          console.log("no Results found");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  dateFormatter(dateString) {
    if (dateString) {
      return (
        ("0" + dateString.getDate()).slice(-2) +
        "/" +
        ("0" + (dateString.getMonth() + 1)).slice(-2) +
        "/" +
        dateString.getFullYear()
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

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }
 
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
 
  getTotalPrice(transfer) {
    if (this.transferWay == 1) {
      return transfer.pricing.price;
    } else {
      return (
        parseFloat(this.searchResults.returning.products.filter(prod => {
            return prod.general.productid == transfer.general.productid;
          })[0].pricing.price) + parseFloat(transfer.pricing.price)
      );
    }
  }
  transfers =[];
 
  selecthotelType(i,sizeListId){
    this.transferResults[i].isSelectedClose = ! this.transferResults[i].isSelectedClose;
    let index = this.transfers.indexOf(sizeListId);
      if(index > -1){
        this.transfers.splice(index, 1);
    }else{
      if(this.transfers.length == 0)
      this.transfers.push(sizeListId);
      else{
        this.presentToast("Only One Transfer Can Add")
      }
     }
    console.log("dfjdjfdfj",this.transfers)
    
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  // proceedToTravellerDetails() {
  //   if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
  //     this.navCtrl.push(FlightHotelTravellerDetailPage, {
  //       sessionId: this.sessionId,
  //       hotelDetail: this.hotelDetail,
  //       hotelContentDetail: this.hotelContentDetail,
  //       hotelCity: this.hotelCity,
  //       rooms: this.rooms,
  //       selectedOption: this.selectedOption,
  //       getNightStayDays:this.getNightStayDays,
  //       totalPrice: this.totalPrice,
  //       flightInfo: this.flightInfo,
       
  //       fromCity: this.fromCity,
  //       toCity: this.toCity,
  //       departDate: this.departDate,
  //       returnDate: this.returnDate,
  //       personDetail: this.personDetail,
  //       flightClass: this.flightClass,
  //       totalAdultCount:this.totalAdultCount,
  //       totalChildCount:  this.totalChildCount,
  //       totalInfantCount:  this.totalInfantCount,
  //       currencys: this.currencys,
  //       hotelAllMarkup: this.hotelAllMarkup,
  //       HotelFix: this.HotelFix,
  //       FlightAllMarkup: this.FlightAllMarkup,
  //       FlightAllFix:this.FlightAllFix,
  //       transferCities:this.transferCities,
  //       transfers:this.transfers,
  //       transferWay:this.transferWay,
  //       returning: this.transfers.length == 0? null: this.searchResults.returning.products.filter(prod => { return prod.general.productid == this.transfers[0].general.productid; })
  //     });
  //   } else{
  //     console.log("proceed")
  //     new Promise((resolve, reject) => {
  //       this.navCtrl.push(LoginPage, {resolve: resolve})
  //     }).then(data=>{
  //       console.log("then proceed",data)
  //       if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
  //       this.navCtrl.push(FlightHotelTravellerDetailPage, {
  //         sessionId: this.sessionId,
  //     hotelDetail: this.hotelDetail,
  //     hotelContentDetail: this.hotelContentDetail,
  //     hotelCity: this.hotelCity,
  //     rooms: this.rooms,
  //     selectedOption: this.selectedOption,
  //     getNightStayDays:this.getNightStayDays,
  //     totalPrice: this.totalPrice,
  //     flightInfo: this.flightInfo,
     
  //     fromCity: this.fromCity,
  //     toCity: this.toCity,
  //     departDate: this.departDate,
  //     returnDate: this.returnDate,
  //     personDetail: this.personDetail,
  //     flightClass: this.flightClass,
  //     totalAdultCount:this.totalAdultCount,
  //     totalChildCount:  this.totalChildCount,
  //     totalInfantCount:  this.totalInfantCount,
  //     currencys: this.currencys,
  //     hotelAllMarkup: this.hotelAllMarkup,
  //     HotelFix: this.HotelFix,
  //     FlightAllMarkup: this.FlightAllMarkup,
  //     FlightAllFix:this.FlightAllFix,
  //     transferCities:this.transferCities,
  //     transfers:this.transfers,
  //     transferWay:this.transferWay,
  //     returning: this.transfers.length == 0? null: this.searchResults.returning.products.filter(prod => { return prod.general.productid == this.transfers[0].general.productid; })
  //       });
  //     }
  //     })
     
  //   }
  
  // }



  makePayment(){
    this.navCtrl.push(FlightHotelTravellerDetailPage, {
      sessionId: this.sessionId,
      hotelDetail: this.hotelDetail,
      hotelContentDetail: this.hotelContentDetail,
      hotelCity: this.hotelCity,
      rooms: this.rooms,
      selectedOption: this.selectedOption,
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
      transferCities:this.transferCities,
      transfers:this.transfers,
      transferWay:this.transferWay,
      returning: this.transfers.length == 0? null: this.searchResults.returning.products.filter(prod => { return prod.general.productid == this.transfers[0].general.productid; })
    });
  }



}
