import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController } from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { FlightFareRulePage } from "../flight-fare-rule/flight-fare-rule";
import { LoginProvider } from "../../providers/login/login";
import { LoginPage } from "../login/login";
import { DomesticFlightRulesPage } from '../domestic-flight-rules/domestic-flight-rules';
import { FlightDomesticTravellerDetailsPage } from '../flight-domestic-traveller-details/flight-domestic-traveller-details';

/**
 * Generated class for the FlightDomesticDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-domestic-details',
  templateUrl: 'flight-domestic-details.html',
})
export class FlightDomesticDetailsPage {

  loading; fromCity; toCity;departDate;returnDate;personDetail;flightClass;totalFareOne;totalFareTwo;totalTaxFareOne;totalTaxFareTwo;totalBaseFareOne;totalBaseFareTwo;
  flightFareRules=[];flightFareRulesD=[];flightInfoOne=[];flightInfoTwo = [];flightInfoTwoAll;flightInfoOneAll;
  isFareRules: boolean = false;map = {};mapD ={}; cityPair1: string = "";cityPair2: string = "";
  filterTwo;filterOne;FlightAllMarkup;FlightAllFix;adminBalance;session_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    public flightProvider:FlightsProvider, public toastCtrl:ToastController,public jsonSearchProvider:JsonSearchProvider,
    public loginProvider:LoginProvider,public alertCtrl: AlertController) {
    this.presentLoading();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.filterOne = this.navParams.get("filterOne");
    this.filterTwo = this.navParams.get("filterTwo");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix")
    this.session_id = this.navParams.get("session_id");
    this.cityPair1 = this.fromCity.AirportCode + this.toCity.AirportCode;
    this.cityPair2 = this.toCity.AirportCode + this.fromCity.AirportCode;
  }
 
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightDomesticDetailsPage');
    this.revalidatingOneWay();
    
    this. getBalabce(); 
  } 
  getBalabce(){
    this.flightProvider.getAdminBalance().then((data) => {
    this.adminBalance = data;
   // this.loading.dismiss();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  revalidatingOneWay(){
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.filterOne.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getRevalidatingFares(obj).then(data=>{
      if(data.AirRevalidateResponse.AirRevalidateResult.IsValid!="false"){
        this.revalidatingTwoWay();
         this.flightInfoOne = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.OriginDestinationOptions[0];
         this.flightInfoOneAll = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries;
         this.totalFareOne = parseFloat(data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
         this.totalTaxFareOne = parseFloat(data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalTax.Amount);
         this.totalBaseFareOne = parseFloat(data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.AirItineraryFareInfo.ItinTotalFares.BaseFare.Amount);
         console.log("flightInfoOne data",this.flightInfoOne)
      }else{
        this.presentToast();
        let targetView = this.navCtrl.getViews().filter(view=> view.id == 'TwoWayResultPage')
        //console.log("TwoWayResultPage",targetView)
        targetView.length ? this.navCtrl.popTo(targetView[0]) : this.navCtrl.pop()
      }
    }).catch(err=>{
      if(err=="Invalid Session Id"){
        this.flightProvider.getAuthSession().then(data=>{
          console.log(data);
          this.revalidatingOneWay();
        }).catch(err=>{
         this.loading.dismiss();
        })
      }else{
        this.loading.dismiss();
      }
    })
  }

  revalidatingTwoWay(){
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.filterTwo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getRevalidatingFares(obj).then(data=>{
      console.log(data);
    
      if(data.AirRevalidateResponse.AirRevalidateResult.IsValid!="false"){
        
        this.flightFareRuleOneWay();
        this.flightInfoTwo = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.OriginDestinationOptions[0];
        this.flightInfoTwoAll = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries;
        this.totalFareTwo = parseFloat(data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
        this.totalTaxFareTwo = parseFloat(data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalTax.Amount);
        this.totalBaseFareTwo = parseFloat(data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.AirItineraryFareInfo.ItinTotalFares.BaseFare.Amount);
        console.log("flightInfoTworesults",this.flightInfoTwo)
      }else{
        this.presentToast();
       let targetView = this.navCtrl.getViews().filter(view=> view.id == 'TwoWayResultPage')
       // console.log("TwoWayResultPage",targetView)
        targetView.length ? this.navCtrl.popTo(targetView[0]) : this.navCtrl.pop()
      }
    }).catch(err=>{
      if(err=="Invalid Session Id"){
        this.flightProvider.getAuthSession().then(data=>{
          console.log(data);
          this.revalidatingTwoWay();
        }).catch(err=>{
          this.loading.dismiss();
        })
      }else{
        this.loading.dismiss();
      }
    })
  }

  flightFareRuleOneWay() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.filterOne.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getFareRuleDetail(obj).then(data => {
       // console.log("dataallflightFareRuleDetail",data);
        this.flightFareRules = [data];
        this.flightFareRuleTwoWay();
        console.log("dataallflight",this.flightFareRules);
        // if (this.flightFareRules) {
        //   this.isFareRules = true;
        //   this.flightFareRules.FareRules.forEach(element => {
        //     let mapName = element.FareRule.CityPair;
        //     this.map[mapName] = this.map[mapName] || [];
        //     this.map[mapName].push(element.FareRule);
        //   });
        //  // console.log("Invalid Session Id",this.map);
        // } else {
        //   this.isFareRules = false;
        // }
      })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider.getAuthSession().then(data => {
              console.log("dataallsessiom",data);
            })
            .catch(err => {});
        } else {
        }
      });
  }

  flightFareRuleTwoWay() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.filterTwo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getFareRuleDetail(obj).then(data => {
      this.loading.dismiss();
        this.flightFareRulesD = [data];
          console.log("dataall",this.flightFareRulesD);
        // if (this.flightFareRulesD) {
        //   this.isFareRules = true;
        //   this.flightFareRulesD.FareRules.forEach(element => {
        //     let mapName = element.FareRule.CityPair;
        //     this.mapD[mapName] = this.mapD[mapName] || [];
        //     this.mapD[mapName].push(element.FareRule);

        //   });
        //   //console.log("Invalid element",this.flightFareRules, this.mapD);
        // } else {
        //   this.isFareRules = false;
        // }
      })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider.getAuthSession().then(data => {
              console.log("dataallsessiom",data);
            })
            .catch(err => {});
        } else {
        }
      });
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

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait..."
    });
    this.loading.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Flight Not Available",
      duration: 3000,
      position: "top"
    });
    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    toast.present();
  }


  fareRulesdata(abc) {
    this.navCtrl.push(DomesticFlightRulesPage,{
      callback:abc
    })
  }
  
  fareRuleDetail(code1,code2,way){
    console.log("flightfarerules",code1,code2,way)
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

  fareRuleDetailD(code1,code2,way){
    console.log("flightfarerules",code1,code2,way)
    let array2=this.mapD[code1]||this.mapD[code2];
    let array3=[];
    if(way=='depart'){
      let array1=this.mapD[this.cityPair1];
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

  getAirlineName(airlineCode) {
    return this.jsonSearchProvider.getAirlineName(airlineCode).AirLineName;
  }

  getAirportDetailCity(airportCode) {
    return this.jsonSearchProvider.getAirportName(airportCode).City;
  }

  getAirportDetail(airportCode) {
    return this.jsonSearchProvider.getAirportName(airportCode).AirportName;
  }

  getTripDuration(destDetail) {
    let tripDuration = new Date(destDetail.ArrivalDateTime).getTime() -new Date(destDetail.DepartureDateTime).getTime();
    return ( Math.floor(tripDuration / (3600 * 1000)) +" h " + (tripDuration % (3600 * 1000)) / 60000 + "m");
  }


//  getBaggageInfo(dest){
//    console.log("ksaslfasf",dest)
//     return  this.flightFareRules.BaggageInfos.filter(baggage=>{
//       console.log(baggage)
//         return baggage.BaggageInfo.Arrival==dest.ArrivalAirportLocationCode 
//         && baggage.BaggageInfo.Departure==dest.DepartureAirportLocationCode 
//         && baggage.BaggageInfo.FlightNo==dest.MarketingAirlineCode+dest.FlightNumber}).BaggageInfo.Baggage;
//     }


  getTotalDuration(stopDetail) {
    let totalTime =
      new Date(stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) +" h " +(totalTime % (3600 * 1000)) / 60000 + "m"
    );
  }

  getLayowerTime(i, destDetail) {
    let layowerTime = new Date(destDetail.OriginDestinationOption[i + 1].FlightSegment.DepartureDateTime).getTime() -
    new Date(destDetail.OriginDestinationOption[i].FlightSegment.ArrivalDateTime).getTime();
    return (
      Math.floor(layowerTime / (3600 * 1000)) +
      " h " +
      (layowerTime % (3600 * 1000)) / 60000 +
      "m"
    );
  }

  getLayowerTimeTwo(i, destDetail){
    let layowerTime = new Date(destDetail.OriginDestinationOption[i + 1].FlightSegment.DepartureDateTime).getTime() -
    new Date(destDetail.OriginDestinationOption[i].FlightSegment.ArrivalDateTime).getTime();
    return (
      Math.floor(layowerTime / (3600 * 1000)) +
      " h " +
      (layowerTime % (3600 * 1000)) / 60000 +
      "m"
    );
  }

 
  getFareBreakDownDetailTwo(farebreakdown, code) {
    let amount = 0;
    for (let i = 0; i < farebreakdown.length; i++) {
      if (farebreakdown[i].PassengerTypeQuantity.Code == code) {
        amount = parseInt(farebreakdown[i].PassengerFare.EquivFare.Amount);
        break;
      }
    }
    return amount;
  }

    getFareBreakDownDetail(farebreakdown, code) {
      let amount = 0;
      for (let i = 0; i < farebreakdown.length; i++) {
        if (farebreakdown[i].PassengerTypeQuantity.Code == code) {
          // return farebreakdown[i].PassengerFare.EquivFare.Amount;
          amount = parseInt(farebreakdown[i].PassengerFare.EquivFare.Amount);
          break;
        }
      }
      return amount;
    }

    goBack(){
      this.navCtrl.pop()
    }


    proceedToTravellerDetails(){
      if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
      this.navCtrl.push(FlightDomesticTravellerDetailsPage,{
        fromCity:this.fromCity,
        toCity:this.toCity,
        totalFareTwo:this.totalFareTwo,
        totalFareOne:this.totalFareOne,
        totalTaxFare:this.totalTaxFareOne+this.totalTaxFareTwo,
        totalBaseFare:this.totalBaseFareOne+this.totalBaseFareTwo,
        flightInfoOneAll: this.flightInfoOneAll,
        flightInfoTwoAll: this.flightInfoTwoAll,
        flightInfoTwo: this.flightInfoTwo,
        flightInfoOne: this.flightInfoOne,
        departDate:this.departDate,
        returnDate:this.returnDate,
        personDetail:this.personDetail,
        flightClass:this.flightClass,
        FlightAllMarkup: this.FlightAllMarkup,
        adminBalance: this.adminBalance,
        FlightAllFix:this.FlightAllFix,
        session_id:this.session_id
      })
    }else{
      new Promise((resolve, reject) => {
        this.navCtrl.push(LoginPage, {resolve: resolve})
      }).then(data=>{
        if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
          this.navCtrl.push(FlightDomesticTravellerDetailsPage,{
            fromCity:this.fromCity,
            toCity:this.toCity,
            totalFareTwo:this.totalFareTwo,
            totalFareOne:this.totalFareOne,
            totalTaxFare:this.totalTaxFareOne+this.totalTaxFareTwo,
            totalBaseFare:this.totalBaseFareOne+this.totalBaseFareTwo,
            flightInfoOneAll: this.flightInfoOneAll,
            flightInfoTwoAll: this.flightInfoTwoAll,
            flightInfoTwo: this.flightInfoTwo,
            flightInfoOne: this.flightInfoOne,
            departDate:this.departDate,
            returnDate:this.returnDate,
            personDetail:this.personDetail,
            flightClass:this.flightClass,
            adminBalance: this.adminBalance,
            FlightAllMarkup: this.FlightAllMarkup,
            FlightAllFix:this.FlightAllFix,
            session_id:this.session_id
          })
        }
      });
    }
    }
 

}
