import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController } from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { FlightFareRulePage } from "../flight-fare-rule/flight-fare-rule";
import { LoginProvider } from "../../providers/login/login";
import { FlightHotelResultsPage } from '../flight-hotel-results/flight-hotel-results';

/**
 * Generated class for the FlightFightDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-fight-detail',
  templateUrl: 'flight-fight-detail.html',
})
export class FlightFightDetailPage {
 // bookingTerms;
  //bookingId = "";


  loading; fromCity; toCity; flightInfo; departDate; returnDate;
  personDetail; flightClass;  flightFareRules; currencys;
  isFareRules: boolean = false; map = {};
  cityPair1: string = ""; cityPair2: string = "";
  rooms;getNightStayDays;
  sessionId;hotelDetail;hotelContentDetail;hotelCity;
  selectedOption;nightStay;roomDetails;totalPrice;AirLineName; 
  hotelAllMarkup;HotelFix;FlightAllMarkup;FlightAllFix;
  totalAdultCount;totalChildCount; totalInfantCount;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public flightProvider:FlightsProvider,
    public toastCtrl:ToastController,
    public jsonSearchProvider:JsonSearchProvider,
    public loginProvider:LoginProvider,
    public alertCtrl: AlertController
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
    this.totalPrice = this.navParams.get("totalPrice");

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
    this.getNightStayDays = this.navParams.get("getNightStayDays");
    this.cityPair1 = this.fromCity.AirportCode + this.toCity.AirportCode;
    this.cityPair2 = this.toCity.AirportCode + this.fromCity.AirportCode;
    //this.bookingId = "HE" + this.sessionId;
  }

  ionViewDidLoad() {
    this.flightFareRuleDetails();
    this.revalidatingFares();
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


  fareRulesdata(fareRule) {
    this.navCtrl.push(FlightFareRulePage,{
      fareRule:fareRule
    })
  }
  goToBaggage(xyz) {
    let cabinBaggage;
    if (xyz.CabinBaggage == null) {
      cabinBaggage = 0
      } else{
        cabinBaggage = xyz.CabinBaggage
      }
    const alert = this.alertCtrl.create({
      title: 'Baggage Details',
      message: 'Baggage: '+xyz.Baggage+' Cabin: '+cabinBaggage,
      buttons: ['OK']
    });
    alert.present();
  }

  flightFareRuleDetails() {
    this.flightProvider.flightFareRuleDetail(this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode).then(data => {
        this.flightFareRules = data;
        console.log("dataall",this.flightFareRules);
        // if (this.flightFareRules) {
        //   this.isFareRules = true;
        //   this.flightFareRules.FareRules.forEach(element => {
        //     let mapName = element.FareRule.CityPair;
        //     this.map[mapName] = this.map[mapName] || [];
        //     this.map[mapName].push(element.FareRule);
        //   });
        //   console.log(this.flightFareRules, this.map);
        // } else {
        //   this.isFareRules = false;
        // }
      })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider.getAuthSession().then(data => {
              console.log("dataallsessiom",data);
              this.flightFareRuleDetails();
            })
            .catch(err => {});
        } else {
        }
      });
  }

  getTotalDuration(stopDetail) {
    let totalTime =
      new Date(
        stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime
      ).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) +
      " h " +
      (totalTime % (3600 * 1000)) / 60000 +
      "m"
    );
  }

  revalidatingFares(){
    this.flightProvider.revalidatingFares(this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode).then(data=>{
      console.log(data);
      this.loading.dismiss();
      if(data.IsValid != "false"){
        this.flightInfo=data.FareItineraries;
      }else{
        this.presentToast("Flight Not Available");
       let targetView = this.navCtrl.getViews().filter(view=> view.id == 'TwoWayResultPage')
        targetView.length ? this.navCtrl.popTo(targetView[0]) : this.navCtrl.pop()
      }
    }).catch(err=>{
      if(err=="Invalid Session Id"){
        this.flightProvider.getAuthSession().then(data=>{
          console.log(data);
          this.revalidatingFares();
        }).catch(err=>{
          this.loading.dismiss();
        })
      }else{
        this.loading.dismiss();
      }
    })
  }

  getAirlineName(airlineCode) {
    return this.jsonSearchProvider.getAirlineName(airlineCode).AirLineName;
  }
  getAirportDetail(airportCode) {
    return this.jsonSearchProvider.getAirportName(airportCode).AirportName;
  }
  getAirportDetailCity(airportCode) {
    return this.jsonSearchProvider.getAirportName(airportCode).City;
  }
  
  getTripDuration(destDetail) {
    let tripDuration =
      new Date(destDetail.ArrivalDateTime).getTime() -
      new Date(destDetail.DepartureDateTime).getTime();
    return (
      Math.floor(tripDuration / (3600 * 1000)) +
      " h " +
      (tripDuration % (3600 * 1000)) / 60000 +
      "m"
    );
  }

  getBaggageInfo(dest){
    return  this.flightFareRules.BaggageInfos.filter(baggage=>{
        return baggage.BaggageInfo.Arrival==dest.ArrivalAirportLocationCode && baggage.BaggageInfo.Departure==dest.DepartureAirportLocationCode && baggage.BaggageInfo.FlightNo==dest.MarketingAirlineCode+dest.FlightNumber
      })[0].BaggageInfo.Baggage;
    }

    fareRuleDetail(code1,code2,way){
      console.log(code1,code2,way)
      let array2=this.map[code1]||this.map[code2];
      let array3=[];
      if(way=='depart'){
        let array1=this.map[this.cityPair1];
     
        if(this.cityPair1==code1 || this.cityPair1==code2){
          array3=array2;
        }else if(!array1){
          array3=array2;
        } else if(!array2){
          array3=array1;
        }
        else{
          array3=array1.concat(array2)
        }
      }else{
        let array1=this.map[this.cityPair2] ;
     
        if(this.cityPair2==code1||this.cityPair2==code2){
          array3=array2;
        }else if(!array1){
          array3=array2;
        } else if(!array2){
          array3=array1;
        }
        else{
          array3=array1.concat(array2)
        }
      }
   
    //  console.log(array1,array2,array1.concat(array2));
      this.navCtrl.push(FlightFareRulePage,{fareRule:array3})
    }

    getLayowerTime(i, k) {
      let layowerTime = new Date(
          this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[i + 1].FlightSegment.DepartureDateTime).getTime() - new Date(
          this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[i].FlightSegment.ArrivalDateTime).getTime();
      return (
        Math.floor(layowerTime / (3600 * 1000)) +" h " +
        (layowerTime % (3600 * 1000)) / 60000 + "m"
      );
    }

    // getLayowerTime(i, destDetail) {
    //   let layowerTime = new Date(destDetail.OriginDestinationOption[i + 1].FlightSegment.DepartureDateTime).getTime() -
    //                     new Date(destDetail.OriginDestinationOption[ i].FlightSegment.ArrivalDateTime).getTime();
    //   return (
    //     Math.floor(layowerTime / (3600 * 1000)) +
    //     " h " +
    //     (layowerTime % (3600 * 1000)) / 60000 +
    //     "m"
    //   );
    // }

    getFareBreakDownDetail(farebreakdown, code) {
      let amount = 0;
      for (let i = 0; i < farebreakdown.length; i++) {
        if (farebreakdown[i].PassengerTypeQuantity.Code == code) {
          // return farebreakdown[i].PassengerFare.EquivFare.Amount;
          amount = farebreakdown[i].PassengerFare.EquivFare.Amount;
          break;
        }
      }
      return amount;
    }
    roundOff(amount){
      var num = amount;
      var n = num.toFixed(2);
      return n
    }
    proceedToTravellerDetails(){
      this.navCtrl.push(FlightHotelResultsPage,{
        sessionId: this.sessionId,
        hotelDetail:this.hotelDetail,
        hotelContentDetail:this.hotelContentDetail,
        hotelCity:this.hotelCity,
        rooms:this.rooms,
        selectedOption:this.selectedOption,
        roomDetails: this.roomDetails,
        nightStay: this.nightStay,
        totalPrice:this.totalPrice,
        getNightStayDays: this.getNightStayDays,
        fromCity:this.fromCity,
        toCity:this.toCity,
        flightInfo:this.flightInfo,
        departDate:this.departDate,
        returnDate:this.returnDate,
        personDetail:this.personDetail,
        flightClass:this.flightClass,
        totalAdultCount:this.totalAdultCount,
        totalChildCount:  this.totalChildCount,
        totalInfantCount:  this.totalInfantCount,
        currencys: this.currencys,
        hotelAllMarkup: this.hotelAllMarkup,
        HotelFix: this.HotelFix,
        FlightAllMarkup: this.FlightAllMarkup,
        FlightAllFix:this.FlightAllFix,
      })
    }

    // proceedToTravellerDetails(){
    //   if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
    //   this.navCtrl.push(FlightHotelTravellerDetailPage,{
    //     sessionId: this.sessionId,
    //     hotelDetail:this.hotelDetail,
    //     hotelContentDetail:this.hotelContentDetail,
    //     hotelCity:this.hotelCity,
    //     rooms:this.rooms,
    //     selectedOption:this.selectedOption,
    //     roomDetails: this.roomDetails,
    //     nightStay: this.nightStay,
    //     totalPrice:this.totalPrice,

    //     fromCity:this.fromCity,
    //     toCity:this.toCity,
    //     flightInfo:this.flightInfo,
    //     departDate:this.departDate,
    //     returnDate:this.returnDate,
    //     personDetail:this.personDetail,
    //     flightClass:this.flightClass,
    //     currencys: this.currencys,
    //   })
    // }else{
    //   new Promise((resolve, reject) => {
    //     this.navCtrl.push(LoginPage, {resolve: resolve})
    //   }).then(data=>{
    //     if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
    //       this.navCtrl.push(FlightHotelTravellerDetailPage,{
    //         sessionId: this.sessionId,
    //         hotelDetail:this.hotelDetail,
    //         hotelContentDetail:this.hotelContentDetail,
    //         hotelCity:this.hotelCity,
    //         rooms:this.rooms,
    //         selectedOption:this.selectedOption,
    //         roomDetails: this.roomDetails,
    //         nightStay: this.nightStay,
    //         totalPrice:this.totalPrice,
      
    //         fromCity:this.fromCity,
    //         toCity:this.toCity,
    //         flightInfo:this.flightInfo,
    //         departDate:this.departDate,
    //         returnDate:this.returnDate,
    //         personDetail:this.personDetail,
    //         flightClass:this.flightClass,
    //         currencys: this.currencys  
    //       })
    //     }
    //   });
    // }
    // }
}
