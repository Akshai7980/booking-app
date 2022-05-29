import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { HolidaysProvider } from "../../providers/holidays/holidays";
import { HolidayDetailsPage } from "../holiday-details/holiday-details";
import { NoResultPage } from "../no-result/no-result";
import { HOLIDAY_IMG_BASE_URL } from "../../providers/constants/constants";

/**
 * Generated class for the HolidayResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-holiday-results",
  templateUrl: "holiday-results.html"
})
export class HolidayResultsPage {
  currency;jsonObj;holidays = [];loading;baseImgUrl=HOLIDAY_IMG_BASE_URL;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public holidayProvider: HolidaysProvider,
    public loadingCtrl:LoadingController
  ) {
    this.presentLoading();
    this.jsonObj = this.navParams.get("jsonObj");;
    this.currency = this.navParams.get("currency");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HolidayResultsPage");
    this.getHolidaySearch();
  }

  

  remove(str){
    let replaceData =  str.replace(/""/, '');
    return replaceData
  }
  
  images= [{image:"assets/imgs/hotDeals/hotel10.jpg"},
  {image:"assets/imgs/hotDeals/hotel11.jpg"},
  {image:"assets/imgs/hotDeals/hotel12.jpg"},
  {image:"assets/imgs/hotDeals/hotel13.jpg"},
  {image:"assets/imgs/hotDeals/hotel14.jpg"},
  {image:"assets/imgs/hotDeals/hotel15.jpg"},
  {image:"assets/imgs/hotDeals/hotel16.jpg"},
  {image:"assets/imgs/hotDeals/hotel17.jpg"},
  {image:"assets/imgs/hotDeals/hotel18.jpg"},
  {image:"assets/imgs/hotDeals/hotel19.jpg"},
  {image:"assets/imgs/hotDeals/hotel20.jpg"},
  {image:"assets/imgs/hotDeals/hotel21.jpg"},
  {image:"assets/imgs/hotDeals/hotel22.jpg"},
  {image:"assets/imgs/hotDeals/hotel23.jpg"},
]
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait..."
    });

    this.loading.present();
  }

  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }

  goToNoResultPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(NoResultPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  getHolidaySearch() {
    this.holidayProvider.getHolidaySeach(this.jsonObj).then(data => {
        console.log(data);
       this.loading.dismiss();
        if(data.holidays.length>0){
          this.holidays = data.holidays;
          for(var i=0;i<this.holidays.length;++i){
            for(var j=0;j<this.holidays[i].length;++j){
              this.holidays[i][j] = this.holidays[i][j].split(",").map(value => value.substring(1)).join(",");
            }  
           }
           console.log("dffdf",data);
        }else{
          this.goToNoResultPage();
        }
      })
      .catch(err => {
        this.loading.dismiss();
        console.log(err);
        this.goToNoResultPage();
      });
  }

  holidaySelected(holiday) {
    this.navCtrl.push(HolidayDetailsPage, {
      holiday: holiday,
      jsonObj: this.jsonObj,
      currency:this.currency
    });
    
  }
}
