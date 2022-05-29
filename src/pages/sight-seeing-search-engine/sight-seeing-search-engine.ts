import { Component,ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController,AlertController,LoadingController,Slides } from "ionic-angular";
import { SightSeeingProvider } from "../../providers/sight-seeing/sight-seeing";
//import { SightSeeingLocationSearchComponent } from "../../components/sight-seeing-location-search/sight-seeing-location-search";
import { AddSightSeeingTravelsComponent } from '../../components/add-sight-seeing-travels/add-sight-seeing-travels';
import { SightSeeingResultsPage } from "../sight-seeing-results/sight-seeing-results";
import { CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import { SightSeeingCitySearchPage } from '../sight-seeing-city-search/sight-seeing-city-search';
import { addres } from '../../providers/constants/constants';

/**
 * Generated class for the SightSeeingSearchEnginePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sight-seeing-search-engine",
  templateUrl: "sight-seeing-search-engine.html"
})
export class SightSeeingSearchEnginePage {
  addres;
  @ViewChild('imageSlide') imageSlide: Slides;
  destination;
  SightSeeingsCitys;
  Countryes=[];
  country = {dest_code: "BLR", dest_name: "Bangalore", country: "India", country_code: "IN"};
  sightseenig=[];
  sightseenigCity =  {dest_code: "BLR", dest_name: "Bangalore", country: "India", country_code: "IN"};
  SightSeeings;
  startDate=new Date();
  endDate=new Date();
  minCheckOutDate=new Date();
  currency;
  loading;SightseeingDeals;
  paxes = [{adults: 1, childs: 0, child_ages: []}];
  constructor( public navCtrl: NavController, public navParams: NavParams, public sightSeeingPrvider: SightSeeingProvider,
    public modalCtrl: ModalController, public alertCtrl :AlertController,
    public loadingCtrl:LoadingController) {
    this.addres=addres;
    this.currency = this.navParams.get("currency");
    this.SightseeingDeals = this.navParams.get("SightseeingDeals");
    this.startDate.setHours(0,0,0,0);
    this.endDate.setDate(this.endDate.getDate()+1);
    this.endDate.setHours(0,0,0,0);
    this.minCheckOutDate=new Date(this.endDate);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SightSeeingSearchEnginePage");
   
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({});

    this.loading.present();
  }
  
  getCountry(){
    this.navCtrl.push(SightSeeingCitySearchPage, { callback: this.getData });
  }

  getData = data => {
    return new Promise<void>((resolve, reject) => {
      if(data){
        this.sightseenigCity=data
      }
      console.log(data);
      resolve();
    });
  };

  // getCountrys() {
  //   this.presentLoading();
  //   if(this.Countryes.length>0){
  //     this.continentAlert(this.Countryes);
  //   }else{
  //     this.sightSeeingPrvider.getSightSeeingsCuntry().then(data => {
  //       console.log(data);
  //       this.Countryes=[];
  //       this.continentAlert(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   }

  // }

  continentAlert(transferRegion) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("Country");
    for (let i = 0; i < transferRegion.length; i++) {
      alert.addInput({
        type: "radio",
        label: transferRegion[i].name,
        value: transferRegion[i],
        checked: this.country == transferRegion[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.country = data;
       // this.country = null;
      }
    });

    alert.present();
  }

  getCountryCity(){
    this.presentLoading();
    this.sightSeeingPrvider.getSightSeeingsCitys(this.country.dest_name).then((data) =>{
      if(data){
        this.countryAlert(data);
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  countryAlert(transferRegion) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle("City");
    for (let i = 0; i < transferRegion.length; i++) {
      alert.addInput({
        type: "radio",
        label: transferRegion[i].dest_name,
        value: transferRegion[i],
        checked: this.sightseenig == transferRegion[i]
      });
    }

    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.sightseenigCity = data;
      }
    });

    alert.present();
  }

  
  selectCheckInDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Select Dates',
      defaultScrollTo:  new Date(year, month + 1, day),
      closeLabel: '',
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      console.log(date);
      if(date){
        this.startDate = date.from.dateObj;
        this.endDate = date.to.dateObj;
      }
      else {
        myCalendar.onDidDismiss

       }
      console.log(type);
    });
  }

  getNightStayDays(){
    let one_day=1000*60*60*24;
    let date1=this.startDate.getTime();
    let date2=this.endDate.getTime();
    return Math.round((date2-date1)/one_day);
  }
  goBack() {
    this.navCtrl.pop();
  }
  
  getAdults(){
    let travellersModal = this.modalCtrl.create(
      AddSightSeeingTravelsComponent,
      {
        paxes:this.paxes
      },
      { cssClass: "addHotelRooms" }
    );
    travellersModal.present();
    travellersModal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.paxes = data.paxes;
      }
    });
  }
  

  searchSightSeeing(){
    this.navCtrl.push(SightSeeingResultsPage,{
      country:this.country,
      sightseenigCity:this.sightseenigCity,
      startDate:this.startDate,
      endDate:this.endDate,
      paxes:this.paxes,
      currency:this.currency
    })
  }
}
