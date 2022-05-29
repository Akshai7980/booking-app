import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { FlightsProvider } from "../../providers/flights/flights";
/**
 * Generated class for the DomesticFlightRulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-domestic-flight-rules',
  templateUrl: 'domestic-flight-rules.html',
})
export class DomesticFlightRulesPage {
  filterOne;filterTwo;flightFareRules=[];isFareRules: boolean = false;map = {};loading; mapName = {};callback;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl :LoadingController, public flightProvider:FlightsProvider) {
    // this.presentLoading();
    // this.filterOne = this.navParams.get("filterOne");
    // console.log("filterOne domestic data",this.filterOne);
    // this.filterTwo = this.navParams.get("filterTwo");
    this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    //this.flightFareRuleDetails();
   // this.flightFareRuleDetailsDomestic();
   // console.log('ionViewDidLoad DomesticFlightRulesPage');
  }


  // presentLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     spinner: "bubbles",
  //     content: "Loading Please Wait..."
  //   });
  //   this.loading.present();
  // }

  // flightFareRuleDetails() {
  //   this.flightProvider.flightFareRuleDetail(this.filterOne.FareItinerary.AirItineraryFareInfo.FareSourceCode).then(data => {
  //       console.log("dataallflightFareRuleDetail",data);
  //       this.loading.dismiss();
  //       this.flightFareRules = [data];
  //       console.log("dataallflightFareRuleDetail",this.flightFareRules);
  //     })
  //     .catch(err => {
  //       if (err == "Invalid Session Id") {
  //         this.flightProvider.getAuthSession().then(data => {
  //             console.log("dataallsessiom",data);
  //             this.flightFareRuleDetails();
  //           })
  //           .catch(err => {});
  //       } else {
  //       }
  //     });
  // }

  // flightFareRuleDetailsDomestic() {
  //   this.flightProvider.flightFareRuleDetail(this.filterTwo.FareItinerary.AirItineraryFareInfo.FareSourceCode).then(data => {
  //       console.log("dataall",data);
  //       this.flightFareRules = data;
  //       if (this.flightFareRules) {
  //         this.isFareRules = true;
  //         this.flightFareRules.FareRules.forEach(element => {
  //           let mapName = element.FareRule.CityPair;
  //           this.map[mapName] = this.map[mapName] || [];
  //           this.map[mapName].push(element.FareRule);

  //         });
  //         console.log("Invalid element",this.flightFareRules, this.map);
  //       } else {
  //         this.isFareRules = false;
  //       }
  //     })
  //     .catch(err => {
  //       if (err == "Invalid Session Id") {
  //         this.flightProvider.getAuthSession().then(data => {
  //             console.log("dataallsessiom",data);
  //             this.flightFareRuleDetailsDomestic();
  //           })
  //           .catch(err => {});
  //       } else {
  //       }
  //     });
  // }

}
