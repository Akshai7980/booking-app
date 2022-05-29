import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,ToastController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { HotDealsProvider } from '../../providers/hot-deals/hot-deals';
import { FlightSearchEnginePage } from '../flight-search-engine/flight-search-engine';
import { HotelSearchEnginePage } from '../hotel-search-engine/hotel-search-engine';
import { FlightHotelSearchEnginePage } from '../flight-hotel-search-engine/flight-hotel-search-engine';
import { TransferSearchEnginePage } from '../transfer-search-engine/transfer-search-engine';
import { CarSearchEnginePage } from '../car-search-engine/car-search-engine';
import { SightSeeingSearchEnginePage } from '../sight-seeing-search-engine/sight-seeing-search-engine';
import { CruiseSearchEnginePage } from '../cruise-search-engine/cruise-search-engine';
import { MyHotelResultsPage } from '../my-hotel-results/my-hotel-results';
import { FlightsProvider } from '../../providers/flights/flights';
import { FlightSearchResultsPage } from '../flight-search-results/flight-search-results';
import { JsonSearchProvider } from '../../providers/json-search/json-search';
import { SightSeeingResultsPage } from '../sight-seeing-results/sight-seeing-results';
import { HotelsProvider } from '../../providers/hotels/hotels';
import { FlightSearchTwoWayResultsPage } from '../flight-search-two-way-results/flight-search-two-way-results';
import { HolidaySearchEnginePage } from '../holiday-search-engine/holiday-search-engine';
import { Stripe } from '@ionic-native/stripe';
import { PaymentProvider } from '../../providers/payment/payment';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

/**
 * Generated class for the MyHomePage page.incrementYearBy
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 

@IonicPage()
@Component({
  selector: 'page-my-home',
  templateUrl: 'my-home.html',
})
export class  MyHomePage {
  @ViewChild('imageSlide') imageSlide: Slides;
  @ViewChild('cardSlide') cardSlide: Slides;
  hotDeals:any=[];
  superOffers:any=[];
  hotelOffers:any=[];
  SightseeingDeals:any=[];
  flightBanner: any=[];
  flightHotelBanner:any=[];
  cruiseBanner:any=[];
  sightBanner:any=[];
  transferBanner:any=[];
  carBanner:any=[];
  hotelBanner:any=[];
  currency = "AUD";
  rooms = [{room_no:1, adult: 2, child: 0, child_age: [0], roomSize:1}];
  checkInDate=new Date();
  checkoutDate=new Date();
  minCheckOutDate=new Date();
  startDate=new Date();
  endDate=new Date();
  personDetail = {  adults: 1,  children: 0,  infants: 0 };
  flightClass = "Economy";
  fromCity = {id: "871", AirportCode: "BOM",AirportName: "Chhatrapati Shivaji International Airport", City: "Mumbai",Country: "India" };
  toCity = {id: "801", AirportCode: "BLR", AirportName: "Bengaluru International Airport", City: "Bangalore", Country: "India"};
  currencys =[]
  FlightAllMarkup;flightMarkup;FlightAllFix;
  HotelMarkup;hotelAllMarkup;HotelFix;
  airportSearchResults=[];
  paxes = [{adults: 1, childs: 0, child_ages: []}];
  
  stripe_key = 'pk_test_51JYCQtASvCqftHZOOmaBCbO3XIlsJbvH8QhAgbdibLVeIf1fZmYTU2kuZcwOESG7rs3CFjTYJEN2U34sVCcMaY0z00XqSa7bsy';
  allCurrency=['USD','KRW','CNY','EUR','JPY','KRW','AUD','HKD','SGD','INR']
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public alertCtrl: AlertController,public flightProvider:FlightsProvider,
    public hotDealProvider:HotDealsProvider, public jsonSearchProvider:JsonSearchProvider, public modalCtrl:ModalController,
    public hotelProvider:HotelsProvider,public payment:PaymentProvider, public stripe:Stripe,private payPal: PayPal) {
      this.checkInDate.setDate(this.checkInDate.getDate()+2);
      this.checkoutDate.setDate(this.checkoutDate.getDate()+3);
      this.checkoutDate.setHours(0,0,0,0);
      this.minCheckOutDate=new Date(this.checkoutDate);
      this.startDate.setDate(this.startDate.getDate()+6);
      this.endDate.setDate(this.endDate.getDate()+9);
  }
 
  ngAfterViewInit() {
   
   this.getHotDeal();
   this.getSuperOffers();
   this.getHotelOffers();
   this.getSightseeingOffers();
   this.getcurrency();
   
   this.getFlightBanner();
   this.getFlightHotelBanner();
   this.getCruiseBanner();
   this.getSightBanner();
   this.getTransferBanner();
   this.getCarBanner();
   this.getHotelBanner();
   this.getmarkp();
   this.getmarkpHotel();
   this.getcurrency();
  }
  
  
  ionViewDidLoad() {
    this.airportSearchResults = this.jsonSearchProvider.getSearchAirportResult('');
  }
  
  saveCard(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'AZ5Y1-pZluOTdgM1Y9fevUw-zwey7IvG-FHGtoraE9TVxeZsHO4jWfz4gZ62P2XFbaJE4-zCWmDOy5cy',
      PayPalEnvironmentSandbox: 'AQ221Weh8TQW9eAOsAUPAVn9v8ohWblnCjhkwhYt5fb263DMm3cDnqaAKfRW4EeKZYj1qw7VwJBzIgF1'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          console.log("payment---",payment)
          // Successfully paid
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, (err) => {
          console.log("err",err)
          // Error or render dialog closed without being successful
        });
      }, (errCon) => {
        console.log("errCon",errCon)
        // Error in configuration
      });
    }, (Support) => {
      console.log("Support",Support)
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

 
  getmarkpHotel(){
    this.hotelProvider.getMarkup().then((data) => {
      console.log("hotel_markup_Data",data);
    this.HotelMarkup = data;
    var objamt = {
      // dest: this.HotelMarkup.hot_dest == null ? 0 : parseInt(this.HotelMarkup.hot_dest[0].markup),
      // fare: this.HotelMarkup.hot_fare == null ? 0 : parseInt(this.HotelMarkup.hot_fare[0].markup),
      // date: this.HotelMarkup.hot_date == null ? 0 : parseInt(this.HotelMarkup.hot_date[0].markup),
      // star: this.HotelMarkup.hot_star == null ? 0 : parseInt(this.HotelMarkup.hot_star[0].markup),
      b2c: this.HotelMarkup.b2c_markup[0] == null ? 0 : parseInt(this.HotelMarkup.b2c_markup[0].markup)
    };
    this.hotelAllMarkup = objamt
    var objFix = {
      // dest: this.HotelMarkup.hot_dest == null ? 0 : parseInt(this.HotelMarkup.hot_dest[0].fix),
      // fare: this.HotelMarkup.hot_fare == null ? 0 : parseInt(this.HotelMarkup.hot_fare[0].fix),
      // date: this.HotelMarkup.hot_date == null ? 0 : parseInt(this.HotelMarkup.hot_date[0].fix),
      // star: this.HotelMarkup.hot_star == null ? 0 : parseInt(this.HotelMarkup.hot_star[0].fix),
      b2c: this.HotelMarkup.b2c_markup[0] == null ? 0 : parseInt(this.HotelMarkup.b2c_markup[0].fix)
    };
    this.HotelFix = objFix
    console.log(this.HotelFix);
    console.log(this.hotelAllMarkup);

    })
    .catch((err) => {
      console.log(err);
    });
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
 
  fnCurrency() {
    let timeData = [];
    for(let i=0;i<this.allCurrency.length;++i){
      timeData.push({
        type: 'radio',
        label : this.allCurrency[i],
        value : this.allCurrency[i],
        checked : i === 6
      });
    }
    let alert = this.alertCtrl.create({
        title : 'Select Currency',
        inputs : timeData,
    });
    alert.addButton("Cancel");
    alert.addButton({
      text: "Ok",
      handler: (data: any) => {
        console.log("Radio data:", data);
        this.currency = data;
      }
    });
    
   alert.present();
  
  }
  getcurrency(){
    this.flightProvider.getcurrency(this.currency).then(data=>{
      console.log(data);
      this.currencys = data; 
    }).catch(err=>{
      console.log(err)
    })
  } 

  getmarkp(){
    this.flightProvider.getMarkup().then((data) => {
      console.log("flight_markup_Data",data);
    this.flightMarkup = data;
    var objmarkup = {
      dest: this.flightMarkup.fli_dest[0] == null ? 0 : parseInt(this.flightMarkup.fli_dest[0].markup),
      fare: this.flightMarkup.fli_fare[0] == null ? 0 : parseInt(this.flightMarkup.fli_fare[0].markup),
      date: this.flightMarkup.fli_date[0] == null ? 0 : parseInt(this.flightMarkup.fli_date[0].markup),
      star: this.flightMarkup.fli_air[0] == null ? 0 : parseInt(this.flightMarkup.fli_air[0].markup),
      b2c: this.flightMarkup.b2c_markup[0] == null ? 0 : parseInt(this.flightMarkup.b2c_markup[0].markup)
    };
    this.FlightAllMarkup = objmarkup
    console.log(this.FlightAllMarkup);
    var objFix = {
      dest: this.flightMarkup.fli_dest[0] == null ? 0 : parseInt(this.flightMarkup.fli_dest[0].fix),
      fare: this.flightMarkup.fli_fare[0] == null ? 0 : parseInt(this.flightMarkup.fli_fare[0].fix),
      date: this.flightMarkup.fli_date[0] == null ? 0 : parseInt(this.flightMarkup.fli_date[0].fix),
      star: this.flightMarkup.fli_air[0] == null ? 0 : parseInt(this.flightMarkup.fli_air[0].fix),
      b2c: this.flightMarkup.b2c_markup[0] == null ? 0 : parseInt(this.flightMarkup.b2c_markup[0].fix)
    };
    this.FlightAllFix = objFix
    // console.log(this.FlightAllFix);
    // console.log(this.flightMarkup);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getHotDeal(){
    this.hotDealProvider.getHotDeals().then(data=>{
      this.hotDeals=data;
     // console.log(" this.hotDeals", this.hotDeals)
      //this.imageSlide.freeMode=true;
      this.imageSlide.slidesPerView='1';
      this.imageSlide.effect='coverflow';
     // this.imageSlide.lockSwipes(true)
    //  this.imageSlide.speed=300;

     // this.cardSlide.freeMode = true;
      this.cardSlide.slidesPerView='auto';
    //this.cardSlide.spaceBetween='18';
    //  this.cardSlide.speed=350;
      this.cardSlide.centeredSlides=true;
      this.cardSlide.control = this.imageSlide;
     //this.cardSlide.effect='cube';
    }).catch(err=>{
      console.log(err)
    })
  }
  
  getSuperOffers(){
    this.hotDealProvider.getBestFlightDeals().then(data=>{
      this.superOffers=data;
     console.log(this.superOffers)
    }).catch(err=>{
      console.log(err)
    })
  }

  getHotelOffers(){
    this.hotDealProvider.getBestHotelDeals().then(data=>{
      this.hotelOffers=data;
    //  console.log(this.hotelOffers)
    }).catch(err=>{
      console.log(err)
    })
  }

  getSightseeingOffers(){
    this.hotDealProvider.getBestSightseeingDeals().then(data=>{
      this.SightseeingDeals=data;
     console.log(this.SightseeingDeals)
    }).catch(err=>{
      console.log(err)
    })
  }
  getFlightBanner(){
    this.hotDealProvider.getFlightBanner().then(data=>{
      this.flightBanner=data;
     // console.log(this.flightBanner)
    }).catch(err=>{
      console.log(err)
    })
  }
  getHotelBanner(){
    this.hotDealProvider.getHotelBanner().then(data=>{
      this.hotelBanner=data;
      //console.log(this.hotelBanner)
    }).catch(err=>{
      console.log(err)
    })
  }
  getCarBanner(){
    this.hotDealProvider.getCarBanner().then(data=>{
      this.carBanner=data;
     // console.log(this.carBanner)
    }).catch(err=>{
      console.log(err)
    })
  }
  getTransferBanner(){
    this.hotDealProvider.getTransferBanner().then(data=>{
      this.transferBanner=data;
      //console.log(this.transferBanner)
    }).catch(err=>{
      console.log(err)
    })
  }
  getSightBanner(){
    this.hotDealProvider.getSightBanner().then(data=>{
      this.sightBanner=data;
      //console.log(this.sightBanner)
    }).catch(err=>{
      console.log(err)
    })
  }
  getCruiseBanner(){
    this.hotDealProvider.getCruiseBanner().then(data=>{
      this.cruiseBanner=data;
      //console.log(this.cruiseBanner)
    }).catch(err=>{
      console.log(err)
    })
  }
  getFlightHotelBanner(){
    this.hotDealProvider.getFlightHotelBanner().then(data=>{
      this.flightHotelBanner=data;
      //console.log(this.flightHotelBanner)
    }).catch(err=>{
      console.log(err)
    })
  }

  SightseeingSearch(results){
    this.navCtrl.push(SightSeeingResultsPage, {
    sightseenigCity:results.sightseenigCity,
    startDate:new Date(results.departure_date),
    endDate:new Date(results.arrival_date),
    paxes:this.paxes,
    currency:this.currency
  });
}
  HotelSearch(results){
    this.navCtrl.push(MyHotelResultsPage, {
      hotelCity:results,
      hotelCodes:results.hotelName,
      rooms:this.rooms,
      checkInDate:new Date(results.departure_date),
      checkoutDate: new Date(results.arrival_date),
      currency:this.currency,
      getNightStayDays: this.getNightStayDays(),
      hotelAllMarkup: this.hotelAllMarkup,
      HotelFix: this.HotelFix
    });
  }
  
  getNightStayDays(){
    let one_day=1000*60*60*24;
    let date1=this.checkInDate.getTime();
    let date2=this.checkoutDate.getTime();
    return Math.round((date2-date1)/one_day);
  }

  flightSearch(results){
    let fromCity = JSON.parse(JSON.stringify(results.fromCity));
    let toCity = JSON.parse(JSON.stringify(results.toCity));
    let tripType = JSON.parse(JSON.stringify(results.trip_type));
    if(tripType == 1){
      this.navCtrl.push(FlightSearchResultsPage, {
        fromCity: fromCity,
        toCity: toCity,
        departDate: new Date(results.departure_date),
        returnDate: new Date(results.arrival_date),
        personDetail: this.personDetail,
        flightClass: this.flightClass,
        FlightAllMarkup: this.FlightAllMarkup,
        FlightAllFix:this.FlightAllFix,
        currencys: this.currencys
      });
    }else{
      this.navCtrl.push(FlightSearchTwoWayResultsPage, {
        fromCity: fromCity,
        toCity: toCity,
        departDate: new Date(results.departure_date),
        returnDate: new Date(results.arrival_date),
        personDetail: this.personDetail,
        flightClass: this.flightClass,
        FlightAllMarkup: this.FlightAllMarkup,
        FlightAllFix:this.FlightAllFix,
        currencys: this.currencys
      });
    }
    
  }
  
  
 
  swipe(ev){
    console.log(ev)
  }

  swiped(ev){
    console.log(ev)
  }

 
  slideChanged(){
    let imageIndex = this.imageSlide.getActiveIndex();
    let cardIndex = this.cardSlide.getActiveIndex();
    console.log('Current index is', imageIndex,cardIndex);
    this.cardSlide.slideTo(cardIndex);
    this.imageSlide.slideTo(cardIndex);
  }

 
  goToFlightSearchPage(){
    this.navCtrl.push(FlightSearchEnginePage,{
      superOffers:this.flightBanner,
      currency: this.currency
    });
  }

  goToHotelSearchPage(){
    this.navCtrl.push(HotelSearchEnginePage,{
      hotelOffers:this.hotelBanner,
      currency: this.currency
    });
  }
  goToTransferSearchPage(){
    this.navCtrl.push(TransferSearchEnginePage,{
      SightseeingDeals:this.transferBanner,
      currencys: this.currencys
    });
  }
  goTocarSearchPage(){
    this.navCtrl.push(CarSearchEnginePage,{
      SightseeingDeals:this.carBanner,
      currency: this.currency
    });
  }
  goToCruiseSearchPage(){
    this.navCtrl.push(CruiseSearchEnginePage,{
      SightseeingDeals:this.cruiseBanner,
      currencys: this.currencys
    });
  }
  goToFlightHotelSearchPage(){
    this.navCtrl.push(FlightHotelSearchEnginePage,{
      SightseeingDeals:this.flightHotelBanner,
      currency: this.currency
    });
  }
  goToFlightHolidaySearchPage(){
    this.navCtrl.push(FlightHotelSearchEnginePage,{
      SightseeingDeals:this.flightHotelBanner,
      currency: this.currency
    });
  }
 
  goToSightseeingSearchPage(){
    this.navCtrl.push(SightSeeingSearchEnginePage,{
      SightseeingDeals:this.sightBanner,
      currency: this.currency
    });
  }
  goToHolidaySearchPage(){
    this.navCtrl.push(HolidaySearchEnginePage,{
      SightseeingDeals:this.sightBanner,
      currency: this.currencys
    });
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
}
