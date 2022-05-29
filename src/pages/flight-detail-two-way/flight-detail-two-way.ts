import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController } from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { LoginProvider } from "../../providers/login/login";
import { LoginPage } from "../login/login";
import { FlightTwoWayTravllerDetailPage } from '../flight-two-way-travller-detail/flight-two-way-travller-detail';
import { FlightFareRulePage } from '../flight-fare-rule/flight-fare-rule';

/**
 * Generated class for the FlightDetailTwoWayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-flight-detail-two-way",
  templateUrl: "flight-detail-two-way.html"
})
export class FlightDetailTwoWayPage {
  loading; fromCity; toCity;flightInfo;departDate;returnDate;personDetail;flightClass;flightFareRules;currencys;
  isFareRules: boolean = false;map = {};cityPair1: string = "";cityPair2: string = "";FlightAllMarkup;FlightAllFix;adminBalance;session_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    public flightProvider:FlightsProvider, public toastCtrl:ToastController,public jsonSearchProvider:JsonSearchProvider,
    public loginProvider:LoginProvider,public alertCtrl: AlertController) {
    this.presentLoading();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.flightInfo = this.navParams.get("flightInfo");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.currencys = this.navParams.get("currencys");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.cityPair1 = this.fromCity.AirportCode + this.toCity.AirportCode;
    this.cityPair2 = this.toCity.AirportCode + this.fromCity.AirportCode;
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.session_id = this.navParams.get("session_id");
  }

  ionViewDidLoad() {
    this.flightFareRuleDetails();
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
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
  }

  flightFareRuleDetails() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getFareRuleDetail(obj).then(data => {
        this.flightFareRules = data;
        console.log("dataall",this.flightFareRules);
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
              console.log("dataallsessiom",data);
              this.flightFareRuleDetails();
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
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getRevalidatingFares(obj).then(data=>{
      console.log(data);
      this.loading.dismiss();
      if(data.AirRevalidateResponse.AirRevalidateResult.IsValid!="false"){
        this.flightInfo=data.AirRevalidateResponse.AirRevalidateResult.FareItineraries;
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
          this.loading.dismiss();
        })
      }else{
        this.loading.dismiss();
      }
    })
  }

  roundOff(amount){
    var num = parseFloat(amount);
    var round = num+this.FlightAllMarkup.b2c
    var n = round.toFixed(2);
    return n
  }

  roundOffPer(amount){
    console.log("amount",amount)
    var num = parseFloat(amount);
    var round = (num*this.FlightAllMarkup.b2c/100)+num;
    var n = round.toFixed(2);
    return n
  }

  
  getTotalDuration(stopDetail) {
    let totalTime =
      new Date(
        stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime
      ).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) +
      " hrs " +
      (totalTime % (3600 * 1000)) / 60000 +
      " mins "
    );
  }
   goToBaggage(xyz) {
     console.log(xyz)
    let cabinBaggage;
    let Baggage;
    if (xyz.Baggage == undefined) {
      Baggage = "Please check with airline website"
      } else{
       
        Baggage = xyz
        if (Baggage.CabinBaggage == null) {
          cabinBaggage = ''
          } else{
            Baggage ='Baggage: '+xyz.Baggage+' Cabin: '+xyz.cabinBaggage
            
          }
      }
     
    const alert = this.alertCtrl.create({
      title: 'Baggage Details',
      message:Baggage,
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
    return ( Math.floor(tripDuration / (3600 * 1000)) +" hrs " +
      (tripDuration % (3600 * 1000)) / 60000 + " mins ");
  }

  getLayowerTime(i, k) {
    let layowerTime = new Date(
        this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[i + 1].FlightSegment.DepartureDateTime).getTime() - new Date(
        this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[i].FlightSegment.ArrivalDateTime).getTime();
    return (
      Math.floor(layowerTime / (3600 * 1000)) +" hrs " +
      (layowerTime % (3600 * 1000)) / 60000 + " mins "
    );
  }

  // getLayowerTime(i, destDetail) {
  //   let layowerTime = new Date(destDetail.OriginDestinationOption[i + 1].FlightSegment.DepartureDateTime).getTime() -
  //   new Date(destDetail.OriginDestinationOption[i].FlightSegment.ArrivalDateTime).getTime();
  //   return (
  //     Math.floor(layowerTime / (3600 * 1000)) +
  //     " h " +
  //     (layowerTime % (3600 * 1000)) / 60000 +
  //     "m"
  //   );
  // }

  getBaggageInfo(dest){
    return  this.flightFareRules.BaggageInfos.filter(baggage=>{
        return baggage.BaggageInfo.Arrival==dest.ArrivalAirportLocationCode
         && baggage.BaggageInfo.Departure==dest.DepartureAirportLocationCode && 
         baggage.BaggageInfo.FlightNo==dest.MarketingAirlineCode+dest.FlightNumber})
         [0].BaggageInfo.Baggage;
    }

    // fareRuleDetail(code1,code2,way){
    //   console.log("flightfarerules",code1,code2,way)
    //   let array2=this.map[code1]||this.map[code2];
    //   let array3=[];
    //   if(way=='depart'){
    //     let array1=this.map[this.cityPair1];
    //     if(this.cityPair1==code1 || this.cityPair1==code2){
    //       array3=array2;
    //     }else if(!array1){
    //       array3=array2;
    //     } else if(!array2){
    //       array3=array1;
    //     }
    //     else{
    //       array3=array1.concat(array2)
    //     }
    //   }else{
    //     let array1=this.map[this.cityPair2] ;
    //     if(this.cityPair2==code1||this.cityPair2==code2){
    //       array3=array2;
    //     }else if(!array1){
    //       array3=array2;
    //     } else if(!array2){
    //       array3=array1;
    //     }
    //     else{
    //       array3=array1.concat(array2)
    //     }
    //   }
    // //  console.log(array1,array2,array1.concat(array2));
    //   this.navCtrl.push(FlightFareRulePage,{fareRule:array3})
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

    goBack(){
      this.navCtrl.pop()
    }
    proceedToTravellerDetails(){
      this.navCtrl.push(FlightTwoWayTravllerDetailPage,{
        fromCity:this.fromCity,
        toCity:this.toCity,
        flightInfo:this.flightInfo,
        departDate:this.departDate,
        returnDate:this.returnDate,
        personDetail:this.personDetail,
        flightClass:this.flightClass,
        flightFareRules:this.flightFareRules,
        FlightAllMarkup: this.FlightAllMarkup,
        FlightAllFix:this.FlightAllFix,
        adminBalance: this.adminBalance,
        session_id: this.session_id,
        currencys:this.currencys 
      })
    }
    // proceedToTravellerDetails(){
    //   if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
    //   this.navCtrl.push(FlightTwoWayTravllerDetailPage,{
    //     fromCity:this.fromCity,
    //     toCity:this.toCity,
    //     flightInfo:this.flightInfo,
    //     departDate:this.departDate,
    //     returnDate:this.returnDate,
    //     personDetail:this.personDetail,
    //     flightClass:this.flightClass,
    //     FlightAllMarkup: this.FlightAllMarkup,
    //     FlightAllFix:this.FlightAllFix,
    //     adminBalance: this.adminBalance,
    //     session_id: this.session_id,
    //     currencys:this.currencys 
    //   })
    // }else{
    //   new Promise((resolve, reject) => {
    //     this.navCtrl.push(LoginPage, {resolve: resolve})
    //   }).then(data=>{
    //     if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
    //       this.navCtrl.push(FlightTwoWayTravllerDetailPage,{
    //         fromCity:this.fromCity,
    //         toCity:this.toCity,
    //         flightInfo:this.flightInfo,
    //         departDate:this.departDate,
    //         returnDate:this.returnDate,
    //         personDetail:this.personDetail,
    //         flightClass:this.flightClass,
    //         FlightAllMarkup: this.FlightAllMarkup,
    //         FlightAllFix:this.FlightAllFix,
    //         adminBalance: this.adminBalance,
    //         session_id:this.session_id,
    //         currencys:this.currencys 
    //       })
    //     }
    //   });
    // }
    // }
}
