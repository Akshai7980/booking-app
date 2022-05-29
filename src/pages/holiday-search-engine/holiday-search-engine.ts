import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from "ionic-angular";
import { HolidayPackageSearchPage } from "../holiday-package-search/holiday-package-search";
import { HolidaysProvider } from "../../providers/holidays/holidays";
import { HolidayResultsPage } from "../holiday-results/holiday-results";
import { ACCESS, HOLIDAY_USER_ID, HOLIDAY_USER_PASSWORD,  HOLIDAY_IP_ADDRESS,addres } from "../../providers/constants/constants";
/**
 * Generated class for the HolidaySearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-holiday-search-engine",
  templateUrl: "holiday-search-engine.html"
})
export class HolidaySearchEnginePage {
  addres;
   packege = {city: "", id: "1", countryid: "namibia"}
   currency;
  //  loading;
  // holidaySearchType = 1;
  
  // tourThemes=[];
  // tourTheme =  { "id": "7","category": "Family Holidays" };
  // tourTypes =[];
  // tourType = {"type":"Private Tours"};
 
  
  // continents=[];
  // continent = {id: "1", name: "Africa"};
  // country = null;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public holidayProvider: HolidaysProvider,public loadingCtrl:LoadingController) {
      this.currency = this.navParams.get("currency");
      this.addres=addres;
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HolidaySearchEnginePage");
  }

  getPackages() {
    this.navCtrl.push(HolidayPackageSearchPage, { callback: this.getData });
  }

  getData = data => {
    return new Promise<void>((resolve, reject) => {
      if (data) {
        this.packege = data;
      }
      console.log(data);
      resolve();
    });
  };

  goBack() {
    this.navCtrl.pop();
  }

 
  searchHolidays(){
    this.navCtrl.push(HolidayResultsPage,{
    jsonObj: {
        country:this.packege.city,
        access: ACCESS,
        user_id: HOLIDAY_USER_ID,
        user_password: HOLIDAY_USER_PASSWORD,
        ip_address: HOLIDAY_IP_ADDRESS
     },
     currency:this.currency
    });
  }

  
}
