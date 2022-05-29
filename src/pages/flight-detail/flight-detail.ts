import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController } from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
import { FlightFareRulePage } from "../flight-fare-rule/flight-fare-rule";
import { LoginProvider } from "../../providers/login/login";
import { LoginPage } from "../login/login";
import { FlightTravellerDetailPage } from "../flight-traveller-detail/flight-traveller-detail";


/**
 * Generated class for the FlightDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-flight-detail",
  templateUrl: "flight-detail.html"
})
export class FlightDetailPage {
  loading; fromCity;toCity;flightInfo; departDate; personDetail;flightClass;FlightAllMarkup;FlightAllFix;
  flightFareRules; isFareRules: boolean = false; map = {};cityPair: string = "";adminBalance;currencys;session_id;
  constructor( public navCtrl: NavController,public navParams: NavParams, public loadingCtrl: LoadingController,
    public flightProvider:FlightsProvider, public toastCtrl:ToastController,public jsonSearch:JsonSearchProvider,
    public loginProvider:LoginProvider,public alertCtrl: AlertController) {
    this.presentLoading();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.flightInfo = this.navParams.get("flightInfo");
    console.log("flightInfo",this.flightInfo)
    this.departDate = this.navParams.get("departDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix =this.navParams.get("FlightAllFix")
    this.adminBalance = this.navParams.get("adminBalance");
    this.session_id = this.navParams.get("session_id");
    this.currencys = this.navParams.get("currencys");
    //this.cityPair = this.fromCity.AirportCode + this.toCity.AirportCode;
  }

  ionViewDidLoad() {
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

 

  revalidatingFares() {
    let obj = {
        session_id: this.session_id,
        fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
    }
    console.log("mysendobj", JSON.stringify(obj));
    this.flightProvider.getRevalidatingFares(obj).then(data => {
        console.log(data);
        this.flightFareRuleDetail();
        if (data.AirSearchResponse.AirSearchResult.IsValid != "false") {
          this.flightInfo = data.AirSearchResponse.AirSearchResult.FareItineraries;
        } else {
          this.presentToast("Flight Not Available");
          let targetView = this.navCtrl.getViews().filter(view => view.id == "FlightSearchResultsPage");
          targetView.length?this.navCtrl.popTo(targetView[0]):this.navCtrl.pop();
        }
      })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider.getAuthSession().then(data => {
              console.log(data);
              this.revalidatingFares();
            })
            .catch(err => {
              console.log(err);
              this.loading.dismiss();
            });
        }
      });
  }
  flightFareRuleDetail() {
    let obj = {
      session_id: this.session_id,
      fare_source_code: this.flightInfo.FareItinerary.AirItineraryFareInfo.FareSourceCode
  }
    this.flightProvider.getFareRuleDetail(obj).then(data => {
        this.flightFareRules = data;
        this.loading.dismiss();
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
            .catch(err => {
            console.log(err)
            });
        } else {
        }
      });
  }

  fareRuleDetail(code1,code2) {
    let array1 = this.map[this.cityPair];
    let array2 = this.map[code1]||this.map[code2];
    let array3 = [];
    if (this.cityPair == code1) {
      array3 = array1;
    } else if (!array1) {
      array3 = array2;
    } else if (!array2) {
      array3 = array1;
    } else {
      array3 = array1.concat(array2);
    }
    //  console.log(array1,array2,array1.concat(array2));
   this.navCtrl.push(FlightFareRulePage, { fareRule: array3 });
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
 

  goToBaggage(xyz) {
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

  fareRulesdata(fareRule) {
    this.navCtrl.push(FlightFareRulePage,{
      fareRule:fareRule
    })
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

  getTotalDuration(stopDetail) {
    let totalTime =
      new Date(stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) +
      " hrs " +
      (totalTime % (3600 * 1000)) / 60000 +
      " mins "
    );
  }

  // getBaggageInfo(dest){
  //   return  this.flightFareRules.BaggageInfos.filter(baggage=>{
  //       return baggage.BaggageInfo.Arrival==dest.ArrivalAirportLocationCode && baggage.BaggageInfo.Departure==dest.DepartureAirportLocationCode && baggage.BaggageInfo.FlightNo==dest.MarketingAirlineCode+dest.FlightNumber
  //     })[0].BaggageInfo.Baggage;
  //   }
    
  getAirlineName(airlineCode) {
    return this.jsonSearch.getAirlineName(airlineCode).AirLineName;
  }

  getAirportDetailCity(airportCode) {
    return this.jsonSearch.getAirportName(airportCode).City;
  }
  
  getAirportDetail(airportCode) {
    return this.jsonSearch.getAirportName(airportCode).AirportName;
  }


  getTripDuration(destDetail) {
    let tripDuration =
      new Date(destDetail.ArrivalDateTime).getTime() - new Date(destDetail.DepartureDateTime).getTime();
    return (
      Math.floor(tripDuration / (3600 * 1000)) +  " hrs " + (tripDuration % (3600 * 1000)) / 60000 + " mins "
    );
  }
  getLayowerTime(i, k) {
    let layowerTime = new Date(
        this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[i + 1].FlightSegment.DepartureDateTime).getTime() - new Date(
        this.flightInfo.FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[i].FlightSegment.ArrivalDateTime).getTime();
    return (
      Math.floor(layowerTime / (3600 * 1000)) + " h " +
      (layowerTime % (3600 * 1000)) / 60000 + "m"
    );
  }



  goBack(){
    this.navCtrl.pop();
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

  proceedToTravellerDetails() {
    this.navCtrl.push(FlightTravellerDetailPage, {
        fromCity: this.fromCity,
        toCity: this.toCity,
        flightInfo: this.flightInfo,
        departDate: this.departDate,
        personDetail: this.personDetail,
        flightClass: this.flightClass,
        FlightAllMarkup: this.FlightAllMarkup,
        FlightAllFix:this.FlightAllFix,
        adminBalance: this.adminBalance,
        currencys: this.currencys,
        session_id :this.session_id
    });
  }

  // proceedToTravellerDetails() {
  //   if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
  //     this.navCtrl.push(FlightTravellerDetailPage, {
  //       fromCity: this.fromCity,
  //       toCity: this.toCity,
  //       flightInfo: this.flightInfo,
  //       departDate: this.departDate,
  //       personDetail: this.personDetail,
  //       flightClass: this.flightClass,
  //       FlightAllMarkup: this.FlightAllMarkup,
  //       FlightAllFix:this.FlightAllFix,
  //       adminBalance: this.adminBalance,
  //       currencys: this.currencys,
  //       session_id :this.session_id
  //     });
  //   } else{
  //     console.log("proceed")
  //     new Promise((resolve, reject) => {
  //       this.navCtrl.push(LoginPage, {resolve: resolve})
  //     }).then(data=>{
  //       console.log("then proceed",data)
  //       if(this.loginProvider.user||this.loginProvider.getUserDeatil()){
  //       this.navCtrl.push(FlightTravellerDetailPage, {
  //         fromCity: this.fromCity,
  //         toCity: this.toCity,
  //         flightInfo: this.flightInfo,
  //         departDate: this.departDate,
  //         personDetail: this.personDetail,
  //         flightClass: this.flightClass,
  //         FlightAllMarkup:this.FlightAllMarkup,
  //         FlightAllFix:this.FlightAllFix,
  //         adminBalance: this.adminBalance,
  //         currencys: this.currencys,
  //         session_id:this.session_id
  //       });
  //     }
  //     })
     
  //   }
  
  // }

}
