import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, Slides} from "ionic-angular";
import { SightSeeingProvider } from "../../providers/sight-seeing/sight-seeing";
import { SightSeeingDetailPage } from "../sight-seeing-detail/sight-seeing-detail";
import { NoResultPage } from "../no-result/no-result";
import { SIGHT_SEEING_ACCESS, SIGHT_SEEING_USER_ID, SIGHT_SEEING_USER_PASSWORD,SIGHT_SEEING_IP_ADDRESS } from "../../providers/constants/constants";
import { LoginProvider } from "../../providers/login/login";
import { LoginPage } from '../login/login';
/**
 * Generated class for the SightSeeingResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sight-seeing-results",
  templateUrl: "sight-seeing-results.html"
})
export class SightSeeingResultsPage {
  @ViewChild(Slides) slides: Slides;
  destination;
  currentIndex=0; 
  startDate = new Date();
  endDate = new Date();
  sightSeeingResults = [];
  loading;
  sightSeeingTravels;
  country;currency;
  user: any = {};
  sightseenigCity;paxes;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sightSeeingProvider: SightSeeingProvider,
    public loadingCtrl:LoadingController,public loginProvider: LoginProvider
  ) {
    this.presentLoading();
    this.user = this.loginProvider.user || this.loginProvider.getUserDeatil();
    this.destination = this.navParams.get("destination");
    this.startDate = this.navParams.get("startDate");
    this.endDate = this.navParams.get("endDate");
    this.sightSeeingTravels = this.navParams.get("sightSeeingTravels");
    this.country = this.navParams.get("country");
    this.sightseenigCity = this.navParams.get("sightseenigCity");
    this.currency = this.navParams.get("currency");
    this.paxes = this.navParams.get("paxes");
  }
  
 
  ionViewDidLoad() {
    this.getSightSeeingResult();
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
  }

  getSightSeeingResult() {
    let obj = {
      "user_id": SIGHT_SEEING_USER_ID,
      "user_password": SIGHT_SEEING_USER_PASSWORD,
      "ip_address": SIGHT_SEEING_IP_ADDRESS,
      "access": SIGHT_SEEING_ACCESS,
      "city_name": this.sightseenigCity.dest_name,
      "country_code": this.sightseenigCity.country_code,
      "from_date": this.dateFormatter(this.startDate),
      "to_date": this.dateFormatter(this.endDate),
      // "language":"en",
      "requiredCurrency": this.currency,
      "paxes": {
        "adults": this.paxes[0].adults,
        "childs": this.paxes[0].childs,
        "child_ages": this.paxes[0].child_ages
      }
    };
    console.log("mysendobj", JSON.stringify(obj));
    this.sightSeeingProvider.getSightSeeingResults(obj).then((data) => {
        this.loading.dismiss();
        if (data.totalResults !== 0) {
          this.sightSeeingResults = data;
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
 

  goBack(){
    this.navCtrl.pop();
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: `
        Please Wait...`
    });

    this.loading.present();
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
  selectSightSeeing(results){
    this.navCtrl.push(SightSeeingDetailPage,{
      destination:this.destination,
      startDate:this.startDate,
      endDate:this.endDate,
      sightSeeing: results,
      sessionId: this.sightSeeingResults,
      country:this.country,
      paxes:this.paxes,
      sightseenigCity:this.sightseenigCity,
    })
  }

  // selectSightSeeing(results) {
  //   if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //     this.goToReviewPage(results);
  //   } else {
  //     console.log("proceed");
  //     new Promise((resolve) => {
  //       this.navCtrl.push(LoginPage, { resolve: resolve });
  //     }).then((data) => {
  //       console.log("then proceed", data);
  //       if (this.loginProvider.user || this.loginProvider.getUserDeatil()) {
  //         this.goToReviewPage(results);
  //       }
  //     });
  //   }
  // }
  // goToReviewPage(results){
  //   this.navCtrl.push(SightSeeingDetailPage,{
  //     destination:this.destination,
  //     startDate:this.startDate,
  //     endDate:this.endDate,
  //     sightSeeing: results,
  //     sessionId: this.sightSeeingResults,
  //     country:this.country,
  //     paxes:this.paxes,
  //     sightseenigCity:this.sightseenigCity,
  //   })
  // }


}
