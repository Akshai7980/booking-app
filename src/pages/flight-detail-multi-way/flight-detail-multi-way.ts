import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController } from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { FlightFareRulePage } from "../flight-fare-rule/flight-fare-rule";
import { LoginProvider } from "../../providers/login/login";
import { LoginPage } from "../login/login";
import { FlightMultiWatTravllerPage } from '../flight-multi-wat-travller/flight-multi-wat-travller';


/**
 * Generated class for the FlightDetailMultiWayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-flight-detail-multi-way",
  templateUrl: "flight-detail-multi-way.html"
})
export class FlightDetailMultiWayPage {
  loading;
  destinationDetails = [];
  AllflightInfo = [];
  flightInfo;
  personDetail;
  flightClass;
  isFareRules: boolean = false;
  flightFareRules;
  map = {}
  FlightAllMarkup;session_id;
  currencys;adminBalance;FlightAllFix;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public flightProvider:FlightsProvider,
    public toastCtrl:ToastController,
    public jsonSearchProvider:JsonSearchProvider,
    public loginProvider:LoginProvider,public alertCtrl: AlertController
  ) {
    this.presentLoading();
    this.currencys = this.navParams.get("currencys");
    this.destinationDetails = this.navParams.get("destinationDetails");
    this.flightInfo = this.navParams.get("flightInfo");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.session_id = this.navParams.get("session_id");
  }

  ionViewDidLoad() {
    this.flightFareRuleDetail();
    this.revalidatingFares();
    this.getBalabce();
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

  flightFareRuleDetail() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getFareRuleDetail(obj).then(data => {
        console.log(data);
        this.flightFareRules = data;
        if (this.flightFareRules) {
          this.isFareRules = true;
          this.flightFareRules.FareRules.forEach(element => {
            let mapName = element.FareRule.CityPair;
            this.map[mapName] = this.map[mapName] || [];
            this.map[mapName].push(element.FareRule);
          });
          console.log(this.flightFareRules, this.map);
        } else {
          this.isFareRules = false;
        }
      })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider.getAuthSession().then(data => {
              console.log(data);
              this.flightFareRuleDetail();
            })
            .catch(err => {});
        } else {
        }
      });
  }
  fareRulesdata(fareRule) {
    this.navCtrl.push(FlightFareRulePage,{
      fareRule:fareRule
    })
  }

  revalidatingFares(){
    let destinationOptions=this.flightInfo.destinationOptions;
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getRevalidatingFares(obj).then(data=>{
      console.log("ts---data---",data);
      this.loading.dismiss();
      if(data.AirRevalidateResponse.AirRevalidateResult.IsValid != "false"){
        this.AllflightInfo  = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries.FareItinerary.OriginDestinationOptions;
        this.flightInfo = data.AirRevalidateResponse.AirRevalidateResult.FareItineraries
        console.log("details page all data--------",this.AllflightInfo)
        this.flightInfo.destinationOptions = destinationOptions;
      }else{
        this.presentToast();
       let targetView = this.navCtrl.getViews().filter(view=> view.id == 'TwoWayResultPage')
       console.log("TwoWayResultPage",targetView)
        targetView.length ? this.navCtrl.popTo(targetView[0]) : this.navCtrl.pop()
      }
    }).catch(err=>{
      if(err=="Invalid Session Id"){
        this.flightProvider.getAuthSession().then(data=>{
          console.log(data);
          this.revalidatingFares();
        }).catch(err=>{
          // this.loading.dismiss();
        })
      }else{
        // this.loading.dismiss();
      }
    })
  }

  goToBaggage(xyz) {
    console.log("fhadgf",xyz)
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
  


  getTotalDuration(stopDetail) {
    let totalTime =
      new Date(stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) +
      " h " +
      (totalTime % (3600 * 1000)) / 60000 +
      "m"
    );
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

  getJourneyTime(stopDetail) {
    let totalTime =
      new Date(stopDetail.FlightSegment.ArrivalDateTime).getTime() -
      new Date(stopDetail.FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) +
      " h " +
      (totalTime % (3600 * 1000)) / 60000 +
      "m"
    );
  }

  getBaggageInfo(dest) {
    return this.flightFareRules.BaggageInfos.filter(baggage => {
      return (
        baggage.BaggageInfo.Arrival == dest.ArrivalAirportLocationCode &&
        baggage.BaggageInfo.Departure == dest.DepartureAirportLocationCode &&
        baggage.BaggageInfo.FlightNo == dest.MarketingAirlineCode + dest.FlightNumber
      );
    })[0].BaggageInfo.Baggage;
  }

  fareRuleDetail(code1,code2,code3,code4){
    let array1=this.map[code1]||this.map[code2];
    let array2=this.map[code3]||this.map[code4];
    let array3=[];
    if(code1==code3 || code1==code4 || code2==code3|| code2==code4){
      array3=array2;
    } else if(!array1){
      array3=array2;
    } else if(!array2){
      array3=array1;
    } else{
      array3=array1.concat(array1);
    }
 
 
  //  console.log(array1,array2,array1.concat(array2));
    this.navCtrl.push(FlightFareRulePage,{fareRule:array3})
  }

  getLayowerTime(i, destDetail) {
    let layowerTime =
      new Date(destDetail[i + 1].FlightSegment.DepartureDateTime).getTime() -
      new Date(destDetail[i].FlightSegment.ArrivalDateTime).getTime();
    return (
      Math.floor(layowerTime / (3600 * 1000)) +
      " h " +
      (layowerTime % (3600 * 1000)) / 60000 +
      "m"
    );
  }

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
    var num = parseFloat(amount);
    var round = num+this.FlightAllMarkup.b2c
    var n = round.toFixed(2);
    return n
  }

  roundOffPer(amount){
    var num = parseFloat(amount);
    var round = (num*this.FlightAllMarkup.b2c/100)+num;
    var n = round.toFixed(2);
    return n
  }
  proceedToTravellerDetails(){
    if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
    this.navCtrl.push(FlightMultiWatTravllerPage,{
      destinationDetails:this.destinationDetails,
      flightInfo:this.flightInfo,
      personDetail:this.personDetail,
      flightClass:this.flightClass,
      AllflightInfo:this.AllflightInfo,
      FlightAllMarkup:this.FlightAllMarkup,
      adminBalance: this.adminBalance,
      FlightAllFix:this.FlightAllFix,
      currencys: this.currencys,
      session_id: this.session_id
    })
  }else{
    new Promise((resolve, reject) => {
      this.navCtrl.push(LoginPage, {resolve: resolve})
    }).then(data=>{
      if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
        this.navCtrl.push(FlightMultiWatTravllerPage,{
          destinationDetails:this.destinationDetails,
          flightInfo:this.flightInfo,
          personDetail:this.personDetail,
          flightClass:this.flightClass,
          AllflightInfo:this.AllflightInfo,
          FlightAllMarkup:this.FlightAllMarkup,
          adminBalance: this.adminBalance,
          FlightAllFix:this.FlightAllFix,
          currencys: this.currencys,
          session_id: this.session_id
        })
      }
    });
  }
  }

  
}
