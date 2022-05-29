import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CruiseProvider } from '../../providers/cruise/cruise';
import { NoResultPage } from '../no-result/no-result';
import { CruiseItineraryPage } from '../cruise-itinerary/cruise-itinerary';
import { CruiseDetailsPage } from '../cruise-details/cruise-details';

/**
 * Generated class for the CruiseResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cruise-results',
  templateUrl: 'cruise-results.html',
})
export class CruiseResultsPage {
  loading
  To = 10;
  maxResult = 0;
  destination;ports;departureDate;returnDate;AdultCount;ChildCount;currencys;
  cruiseResults;cruiseAllFix; cruiseAllMarkup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cruiseProvider: CruiseProvider,
    public loadingCtrl: LoadingController) {
    this.presentLoading();
    this.destination =  this.navParams.get("destination");
    this.ports =  this.navParams.get("ports");
    this.departureDate =  this.navParams.get("departureDate");
    this.returnDate =  this.navParams.get("returnDate");
    this.AdultCount =  this.navParams.get("AdultCount");
    this.ChildCount =  this.navParams.get("ChildCount");
    this.currencys =  this.navParams.get("currencys");
    this.cruiseAllMarkup = this.navParams.get("cruiseAllMarkup");
    this.cruiseAllFix = this.navParams.get("cruiseAllFix")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruiseResultsPage');
    this.cruiseSearch();

  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });

    this.loading.present();
  }

 

  cruiseSearch() {
    this.cruiseProvider.getCruiseSeach(this.maxResult, this.To,this.destination,this.ports.port_name,
      this.dateFormatter(this.departureDate), this.dateFormatter(this.returnDate),this.AdultCount.adults,this.ChildCount.childs).then((data) => {
        this.loading.dismiss();
        console.log("cruiseresults-----------",data)
        if(data.length !== 0){
          this.cruiseResults = data;
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

  gotoItinerary(results){
    this.navCtrl.push(CruiseItineraryPage,{
      results:results
    }); 
  }

  dateFormatter(dateString) {
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

  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  
  SelectedCruise(results){
    this.navCtrl.push(CruiseDetailsPage,{
      destination:this.destination,
      ports:this.ports,
      departureDate:this.departureDate,
      returnDate:this.returnDate,
      AdultCount:this.AdultCount,
      ChildCount:this.ChildCount,
      currencys:this.currencys,
      cruiseData:results,
      cruiseAllMarkup: this.cruiseAllMarkup,
      cruiseAllFix:this.cruiseAllFix,
    });
  }
  
}
