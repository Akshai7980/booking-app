import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ModalController} from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { NoResultPage } from "../no-result/no-result";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { FlightFilterComponent } from "../../components/flight-filter/flight-filter";
import { FlightDetailTwoWayPage } from "../flight-detail-two-way/flight-detail-two-way";
import { FlightFilterDomesticComponent } from '../../components/flight-filter-domestic/flight-filter-domestic';
import { FlightDomesticDetailsPage } from '../flight-domestic-details/flight-domestic-details';
import { IP_ADDRESS, USER_PASSWORD,USER_ID,ACCESS } from "../../providers/constants/constants";

/**
 * Generated class for the FlightSearchTwoWayResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-flight-search-two-way-results",
  templateUrl: "flight-search-two-way-results.html"
})

export class FlightSearchTwoWayResultsPage {
  fromCity;toCity;departDate; returnDate;personDetail;flightClass;loading;
  searchResults = [];filteredResults = []; domesticSearchResults = [];
  domesticSearchR = [];selectedOption = [];filterTwo;filterOne;
  isFlightsPresent: boolean = false;
  maxPrice: number = 0;
  minPrice: number = 0;
  selectedMaxPrice: number = 0;
  selectedMinPrice: number = 0;
  airlines = [];
  layowerAirports = [];
  column: string = "DEPART";
  order: number = -1;
  departDescending: boolean = false;
  arriveDescending: boolean = false;
  durationDescending: boolean = false;
  priceDescending: boolean = false;
  isZeroStopsSelected: boolean = true;
  isOneStopSelected: boolean = true;
  isTwoStopsSelected: boolean = true;
  isDepartEarlyMorning: boolean = true;
  isDepartDay: boolean = true;
  isDepartEvening: boolean = true;
  isDepartNight: boolean = true;
  isArriveEarlyMorning: boolean = true;
  isArriveDay: boolean = true;
  isArriveEvening: boolean = true;
  isArriveNight: boolean = true;
  isReturnDepartEarlyMorning:boolean=true;
  isReturnDepartDay: boolean = true;
  isReturnDepartEvening: boolean = true;
  isReturnDepartNight: boolean = true;
  isReturnArriveEarlyMorning: boolean = true;
  isReturnArriveDay: boolean = true;
  isReturnArriveEvening: boolean = true;
  isReturnArriveNight: boolean = true;
  selectedFareType:string="";
  adultCount;childCount;infantCount;rooms;
  FlightAllMarkup;FlightAllFix;session_id;currencys;
  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController,
    public flightProvider: FlightsProvider,public modalCtrl:ModalController) {
    this.presentLoading();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.currencys = this.navParams.get("currencys");
  }

  ionViewDidLoad() {
    this.newFlightSearch();
  }


  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait..."
    });

    this.loading.present();
  }

  newFlightSearch() {
    let obj = {
      user_id: USER_ID,
      user_password: USER_PASSWORD,
      access: ACCESS,
      ip_address: IP_ADDRESS,
      requiredCurrency: this.currencys.currency,
      journeyType: "Return",
      OriginDestinationInfo: [
        {
            departureDate: this.dateFormatter(this.departDate),
            returnDate: this.dateFormatter(this.returnDate),
            airportOriginCode: this.fromCity.AirportCode,
            airportDestinationCode: this.toCity.AirportCode
        }
    ],
    class: this.flightClass,
    adults: this.personDetail.adults,
    childs: this.personDetail.children,
    infants:this.personDetail.infants
    };
    console.log("mysendobj", JSON.stringify(obj));
    this.flightProvider.getFlightResults(obj).then((data) => {
              this.searchResults = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries;
        this.filteredResults = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries;
        this.domesticSearchResults = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries[0];
       this.filterOne = this.domesticSearchResults[0];
       console.log("twoway results filterOne", this.filterOne);
        this.domesticSearchR = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries[1];
      this.filterTwo = this.domesticSearchR[0];
      console.log("twoway results filterTwo", this.filterTwo);
        console.log( "twoway results", this.filteredResults);
        console.log( "twoway results domestic", this.domesticSearchResults);
        console.log( "twoway results return", this.domesticSearchR);
       this.session_id = data.AirSearchResponse.session_id;
        if (this.filteredResults.length <=2) {
        if (this.domesticSearchResults.length > 0) {
          this.isFlightsPresent = true;
          let priceDomestic = [];
          let priceFlagsDomestic = [];
          let airlineFlagsDomestic = [];
          let airlinesDomestic = [];
          let layowerFlagsDomestic = [];
          let layowerAirportsDomestic = [];
         this.loading.dismiss();
          for (let i = 0; i < this.domesticSearchResults.length; i++) {
            // price calculation
            if (!priceFlagsDomestic[this.domesticSearchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount]) {
              priceDomestic.push(this.domesticSearchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
            }priceFlagsDomestic[this.domesticSearchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount] = true;
            //airlines calculation
            for (let j = 0;j <this.domesticSearchResults[i].OriginDestinationOptions.length;j++) {
              if (
                !airlineFlagsDomestic[this.domesticSearchResults[i].OriginDestinationOptions[j].FlightSegment.MarketingAirlineCode]){
                  airlinesDomestic.push(this.domesticSearchResults[i].OriginDestinationOptions[j].FlightSegment.MarketingAirlineCode
                );
              }
              airlineFlagsDomestic[this.domesticSearchResults[i].OriginDestinationOptions[j].FlightSegment.MarketingAirlineCode] = true;
            }
            // layowerPorts
        
            if (this.domesticSearchResults[i].OriginDestinationOptions.length > 1) {
              for (let j = 0;j <this.domesticSearchResults[i].OriginDestinationOptions.length -1;j++) {
                if (!layowerFlagsDomestic[this.domesticSearchResults[i].OriginDestinationOptions[j].FlightSegment.ArrivalAirportLocationCode]) {
                  layowerAirportsDomestic.push(this.domesticSearchResults[i].OriginDestinationOptions[j].FlightSegment.ArrivalAirportLocationCode);
                }
                layowerFlagsDomestic[this.domesticSearchResults[i].OriginDestinationOptions[j].FlightSegment.ArrivalAirportLocationCode] = true;
              }
            }
            }
          this.maxPrice = Math.max(...priceDomestic);
          this.selectedMaxPrice = Math.max(...priceDomestic);
          this.minPrice = Math.min(...priceDomestic);
          this.selectedMinPrice = Math.min(...priceDomestic);

          for (let i = 0; i < airlinesDomestic.length; i++) {
            this.airlines.push({ value: airlinesDomestic[i], selected: true });
          }
          for (let i = 0; i < layowerAirportsDomestic.length; i++) {
            this.layowerAirports.push({value: layowerAirportsDomestic[i], selected: true
            });
          }
        }
      }

      else if (this.searchResults.length > 0) {
          this.isFlightsPresent = true;
          let price = [];
          let priceFlags = [];
          let airlineFlags = [];
          let airlines = [];
          let layowerFlags = [];
          let layowerAirports = [];
          this.loading.dismiss();
          for (let i = 0; i < this.searchResults.length; i++) {
            // price calculation
            if (!priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount]) {
                price.push(this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
            }priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount] = true;
            //airlines calculation
            for (let j = 0;j <this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length;j++) {
              if (
                !airlineFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode]){
                  airlines.push(this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
                );
              }
              airlineFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode] = true;
            }
            // layowerPorts
        
            if (this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length > 1) {
              for (let j = 0;j <this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length -1;j++) {
                if (!layowerFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode]) {
                  layowerAirports.push(this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode);
                }
                layowerFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode] = true;
              }
            }
            }
          this.maxPrice = Math.max(...price);
          this.selectedMaxPrice = Math.max(...price);
          this.minPrice = Math.min(...price);
          this.selectedMinPrice = Math.min(...price);

          for (let i = 0; i < airlines.length; i++) {
            this.airlines.push({ value: airlines[i], selected: true });
          }
          for (let i = 0; i < layowerAirports.length; i++) {
            this.layowerAirports.push({value: layowerAirports[i], selected: true
            });
          }
        }
         else {
          this.isFlightsPresent = false;
         this.loading.dismiss();
          this.goToNoResultPage();
         }
         })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider.getAuthSession().then(data => {
              console.log(data);
            })
            .catch(err => {
             this.loading.dismiss();
              this.goToNoResultPage();
            });
        } else {
         this.loading.dismiss();
          this.goToNoResultPage();
        }
      });
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

  domestic(amount){
    var num = parseFloat(amount);
    var round = num+(this.FlightAllMarkup.b2c/2)
    var n = round.toFixed(2);
    return n
  }

  tDomestic(aamount,bamount){
    var numa = parseFloat(aamount);
    var numb = parseFloat(bamount);
    var round = numa+numb+(this.FlightAllMarkup.b2c)
    var n = round.toFixed(2);
    return n
  }
  
  pdomestic(amount){
    var num = parseFloat(amount);
    var round = (num*this.FlightAllMarkup.b2c/100)+num;
    var n = round.toFixed(2);
    return n
  }

  ptDomestic(aamount){
    var numa = parseFloat(aamount);
    var totala = (numa*this.FlightAllMarkup.b2c/100)+numa;
    var n = totala
    return n
  }
  
  selectDomesticReturm(data){
    this.filterOne = data;
   console.log("filterOne",this.filterOne);
  }
  selectDomestic(data){
    this.filterTwo = data
   console.log("filterTwo",this.filterTwo);
  }
  

  
 

  dateFormatter(dateString: string) {
    if (dateString) {
      let date = new Date(dateString);
      return (date.getFullYear() + "-" +("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate() )).slice(-2));
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

  goToNoWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  getTotalDurationD(stopDetail){
    let totalTime = new Date(stopDetail).getTime()
    return (
      Math.floor(totalTime / 60) + " hrs " + (totalTime % 60) + " mins"
    );
  }

  getTotalDuration(stopDetail) {
    let totalTime = new Date(stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) + " hrs " + (totalTime % (3600 * 1000)) / 60000 + "mins"
    );
  }

  sortDepart() {
    console.log("sort");
    this.column = "DEPART";
    this.departDescending = !this.departDescending;
    this.order = this.departDescending ? 1 : -1;
  }

  sortArrive() {
    console.log("sort");
    this.column = "ARRIVE";
    this.arriveDescending = !this.arriveDescending;
    this.order = this.arriveDescending ? 1 : -1;
  }

  sortDuration() {
    console.log("sort");
    this.column = "DURATION";
    this.durationDescending = !this.durationDescending;
    this.order = this.durationDescending ? 1 : -1;
  }

  sortPrice() {
    console.log("sort");
    this.column = "PRICE";
    this.priceDescending = !this.priceDescending;
    this.order = this.priceDescending ? 1 : -1;
  }

  filter() {
    console.log("fil", this.airlines);
    let travellersModal = this.modalCtrl.create(
      FlightFilterComponent,
      {
        minPrice: Math.trunc(this.minPrice),
        maxPrice: Math.ceil(this.maxPrice),
        selectedMaxPrice: Math.ceil(this.selectedMaxPrice),
        selectedMinPrice: Math.trunc(this.selectedMinPrice),
        currencys: this.currencys,
        fromCity: this.fromCity.City,
        toCity: this.toCity.City,
        airlines: this.airlines,
        layowerAirports: this.layowerAirports,
        isZeroStopsSelected: this.isZeroStopsSelected,
        isOneStopSelected: this.isOneStopSelected,
        isTwoStopsSelected: this.isTwoStopsSelected,
        isDepartEarlyMorning: this.isDepartEarlyMorning,
        isDepartDay: this.isDepartDay,
        isDepartEvening: this.isDepartEvening,
        isDepartNight: this.isDepartNight,
        isArriveEarlyMorning: this.isArriveEarlyMorning,
        isArriveDay: this.isArriveDay,
        isArriveEvening: this.isArriveEvening,
        isArriveNight: this.isArriveNight,
        isReturnDepartEarlyMorning: this.isReturnDepartEarlyMorning,
        isReturnDepartDay: this.isReturnDepartDay,
        isReturnDepartEvening: this.isReturnDepartEvening,
        isReturnDepartNight: this.isReturnDepartNight,
        isReturnArriveEarlyMorning: this.isReturnArriveEarlyMorning,
        isReturnArriveDay: this.isReturnArriveDay,
        isReturnArriveEvening: this.isReturnArriveEvening,
        isReturnArriveNight: this.isReturnArriveNight,
        selectedFareType: this.selectedFareType,
        isRoundTrip: true
      },
      { cssClass: "filterModel" }
    );
    travellersModal.present();
    travellersModal.onDidDismiss(data => {
      console.log("data", data);
      if (data) {
        this.selectedFareType = data.selectedFareType;
        this.selectedMaxPrice = data.selectedMaxPrice;
        this.selectedMinPrice = data.selectedMinPrice;
        this.airlines = data.airlines;
        this.layowerAirports = data.layowerAirports;
        this.isZeroStopsSelected = data.isZeroStopsSelected;
        this.isOneStopSelected = data.isOneStopSelected;
        this.isTwoStopsSelected = data.isTwoStopsSelected;
        this.isDepartEarlyMorning = data.isDepartEarlyMorning;
        this.isDepartDay = data.isDepartDay;
        this.isDepartEvening = data.isDepartEvening;
        this.isDepartNight = data.isDepartNight;
        this.isArriveEarlyMorning = data.isArriveEarlyMorning;
        this.isArriveDay = data.isArriveDay;
        this.isArriveEvening = data.isArriveEvening;
        this.isArriveNight = data.isArriveNight;
        this.isReturnDepartEarlyMorning = data.isReturnDepartEarlyMorning;
        this.isReturnDepartDay = data.isReturnDepartDay;
        this.isReturnDepartEvening = data.isReturnDepartEvening;
        this.isReturnDepartNight = data.isReturnDepartNight;
        this.isReturnArriveEarlyMorning = data.isReturnArriveEarlyMorning;
        this.isReturnArriveDay = data.isReturnArriveDay;
        this.isReturnArriveEvening = data.isReturnArriveEvening;
        this.isReturnArriveNight = data.isReturnArriveNight;
        let a = [].slice.call(document.querySelectorAll("ion-card[data-stop]"));
        console.log("all data",a);
        for (let i = 0; i < a.length; i++) {
          //let b=<HTMLElement>a[i];
          let deptTime = (<HTMLElement>a[i]).dataset.departuretime;
          let arriveTime = (<HTMLElement>a[i]).dataset.aarivalime;
          let returnDeptTime = (<HTMLElement>a[i]).dataset.returndeparturetime;
          let returnArriveTime = (<HTMLElement>a[i]).dataset.returnarrivetime;
         // console.log(returnArriveTime);
          if ((this.selectedFareType == "" || this.selectedFareType == a[i].dataset.faretype) && 
              (a[i].dataset.price > this.selectedMinPrice && a[i].dataset.price < this.selectedMaxPrice) &&
              ((this.isZeroStopsSelected && a[i].dataset.stop == 0) || (this.isOneStopSelected && a[i].dataset.stop == 1) ||
              (this.isTwoStopsSelected && a[i].dataset.stop >= 2)) && ((this.isDepartEarlyMorning && new Date(deptTime).getHours() < 6) ||
              (this.isDepartDay && new Date(deptTime).getHours() >= 6 && new Date(deptTime).getHours() < 12) ||
              (this.isDepartEvening &&  new Date(deptTime).getHours() >= 12 && new Date(deptTime).getHours() < 18) ||
              (this.isDepartNight && new Date(deptTime).getHours() >= 18)) && ((this.isArriveEarlyMorning && new Date(arriveTime).getHours() < 6) ||
              (this.isArriveDay && new Date(arriveTime).getHours() >= 6 && new Date(arriveTime).getHours() < 12) ||
              (this.isArriveEvening && new Date(arriveTime).getHours() >= 12 && new Date(arriveTime).getHours() < 18) ||
              (this.isArriveNight && new Date(arriveTime).getHours() >= 18)) && ((this.isReturnDepartEarlyMorning && new Date(returnDeptTime).getHours() < 6) ||
              (this.isReturnDepartDay && new Date(returnDeptTime).getHours() >= 6 && new Date(returnDeptTime).getHours() < 12) ||
              (this.isReturnDepartEvening && new Date(returnDeptTime).getHours() >= 12 && new Date(returnDeptTime).getHours() < 18) ||
              (this.isReturnDepartNight && new Date(returnDeptTime).getHours() >= 18)) && ((this.isReturnArriveEarlyMorning && new Date(returnArriveTime).getHours() < 6) ||
              (this.isReturnArriveDay && new Date(returnArriveTime).getHours() >= 6 && new Date(returnArriveTime).getHours() < 12) ||
              (this.isReturnArriveEvening && new Date(returnArriveTime).getHours() >= 12 && new Date(returnArriveTime).getHours() < 18) ||
              (this.isReturnArriveNight && new Date(returnArriveTime).getHours() >= 18)) && this.isAirlinePresent(a[i]) && this.isLayowerAirportPresent(a[i])
          ) {(<HTMLElement>a[i]).hidden = false;
          } else {
            (<HTMLElement>a[i]).hidden = true;
          }
        }
        //console.log(a);
        let div = document.getElementById("searchDiv");
        let hiddenItems = 0;
        for (let i = 0; i < a.length; i++) {
          if (<HTMLElement>a[i].hidden) {
            hiddenItems++;
            if (hiddenItems == a.length) {
              div.style.backgroundImage ="url('assets/imgs/other/empty_state.png')";
              div.style.height = "100%";
              div.style.backgroundPositionX = "center";
              div.style.backgroundPositionY = "center";
            }
          } else {
            div.style.backgroundImage = "url('')";
          }
        }
      }
      console.log('dfghjkjhgf-------',data);
    });
  }
  filterDomestic() {
    console.log("fil", this.airlines);
    let travellersModal = this.modalCtrl.create(
      FlightFilterDomesticComponent,
      {
        minPrice: Math.trunc(this.minPrice),
        maxPrice: Math.ceil(this.maxPrice),
        selectedMaxPrice: Math.ceil(this.selectedMaxPrice),
        selectedMinPrice: Math.trunc(this.selectedMinPrice),
        currencyCode: this.domesticSearchR[0].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.CurrencyCode,
        fromCity: this.fromCity.City,
        toCity: this.toCity.City,
        airlines: this.airlines,
        layowerAirports: this.layowerAirports,
        isZeroStopsSelected: this.isZeroStopsSelected,
        isOneStopSelected: this.isOneStopSelected,
        isTwoStopsSelected: this.isTwoStopsSelected,
        isDepartEarlyMorning: this.isDepartEarlyMorning,
        isDepartDay: this.isDepartDay,
        isDepartEvening: this.isDepartEvening,
        isDepartNight: this.isDepartNight,
        isArriveEarlyMorning: this.isArriveEarlyMorning,
        isArriveDay: this.isArriveDay,
        isArriveEvening: this.isArriveEvening,
        isArriveNight: this.isArriveNight,
        isReturnDepartEarlyMorning: this.isReturnDepartEarlyMorning,
        isReturnDepartDay: this.isReturnDepartDay,
        isReturnDepartEvening: this.isReturnDepartEvening,
        isReturnDepartNight: this.isReturnDepartNight,
        isReturnArriveEarlyMorning: this.isReturnArriveEarlyMorning,
        isReturnArriveDay: this.isReturnArriveDay,
        isReturnArriveEvening: this.isReturnArriveEvening,
        isReturnArriveNight: this.isReturnArriveNight,
        selectedFareType: this.selectedFareType,
        isRoundTrip: false
      },
      { cssClass: "filterModel" }
    );
    travellersModal.present();
    travellersModal.onDidDismiss(data => {
      console.log("data", data);
      if (data) {
        this.selectedFareType = data.selectedFareType;
        this.selectedMaxPrice = data.selectedMaxPrice;
        this.selectedMinPrice = data.selectedMinPrice;
        this.airlines = data.airlines;
        this.layowerAirports = data.layowerAirports;
        this.isZeroStopsSelected = data.isZeroStopsSelected;
        this.isOneStopSelected = data.isOneStopSelected;
        this.isTwoStopsSelected = data.isTwoStopsSelected;
        this.isDepartEarlyMorning = data.isDepartEarlyMorning;
        this.isDepartDay = data.isDepartDay;
        this.isDepartEvening = data.isDepartEvening;
        this.isDepartNight = data.isDepartNight;
        this.isArriveEarlyMorning = data.isArriveEarlyMorning;
        this.isArriveDay = data.isArriveDay;
        this.isArriveEvening = data.isArriveEvening;
        this.isArriveNight = data.isArriveNight;
        this.isReturnDepartEarlyMorning = data.isReturnDepartEarlyMorning;
        this.isReturnDepartDay = data.isReturnDepartDay;
        this.isReturnDepartEvening = data.isReturnDepartEvening;
        this.isReturnDepartNight = data.isReturnDepartNight;
        this.isReturnArriveEarlyMorning = data.isReturnArriveEarlyMorning;
        this.isReturnArriveDay = data.isReturnArriveDay;
        this.isReturnArriveEvening = data.isReturnArriveEvening;
        this.isReturnArriveNight = data.isReturnArriveNight;
        // let a = [].slice.call(document.querySelectorAll("ion-card[data-faretype]"));
        // console.log("all data",a);
        // for (let i = 0; i < a.length; i++) {
        //   if ((this.selectedFareType == true || this.selectedFareType == a[i].dataset.faretype) && 
        //   (a[i].dataset.price > this.selectedMinPrice && a[i].dataset.price < this.selectedMaxPrice) &&
        //       ((this.isZeroStopsSelected && a[i].dataset.stop == 0) || (this.isOneStopSelected && a[i].dataset.stop == 1) || (this.isTwoStopsSelected && a[i].dataset.stop >= 2)) 
        //   ) {(<HTMLElement>a[i]).hidden = false;
        //   } else {
        //     (<HTMLElement>a[i]).hidden = true;
        //   }
        // }

        let b = [].slice.call(document.querySelectorAll("ion-card[data-stop]"));
        console.log("all data",b);
        for (let i = 0; i < b.length; i++) {
           let deptTime = (<HTMLElement>b[i]).dataset.departuretime;
         //console.log('deptTime',deptTime)
           let arriveTime = (<HTMLElement>b[i]).dataset.aarivalime;
         // console.log('arriveTime',arriveTime)
         // let returnDeptTime = (<HTMLElement>b[i]).dataset.returndeparturetime;
         //console.log('returnDeptTime',returnDeptTime)
         // let returnArriveTime = (<HTMLElement>b[i]).dataset.returnarrivetime;
          // console.log('returnArriveTime,',returnArriveTime)
          if (
              ((this.selectedFareType == "" || this.selectedFareType == b[i].dataset.faretype)
              &&(this.isZeroStopsSelected && b[i].dataset.stop == 0) || (this.isOneStopSelected && b[i].dataset.stop == 1) || (this.isTwoStopsSelected && b[i].dataset.stop >= 2))
              && (b[i].dataset.price > this.selectedMinPrice && b[i].dataset.price < this.selectedMaxPrice)
              && ((this.isDepartEarlyMorning && new Date(deptTime).getHours() < 6) ||
              (this.isDepartDay && new Date(deptTime).getHours() >= 6 && new Date(deptTime).getHours() < 12) ||
              (this.isDepartEvening &&  new Date(deptTime).getHours() >= 12 && new Date(deptTime).getHours() < 18) ||
              (this.isDepartNight && new Date(deptTime).getHours() >= 18)) && ((this.isArriveEarlyMorning && new Date(arriveTime).getHours() < 6) ||
              (this.isArriveDay && new Date(arriveTime).getHours() >= 6 && new Date(arriveTime).getHours() < 12) ||
              (this.isArriveEvening && new Date(arriveTime).getHours() >= 12 && new Date(arriveTime).getHours() < 18) ||
              (this.isArriveNight && new Date(arriveTime).getHours() >= 18)) && ((this.isReturnDepartEarlyMorning ))
              // && new Date(returnDeptTime).getHours() < 6) ||(this.isReturnDepartDay && new Date(returnDeptTime).getHours() >= 6 && new Date(returnDeptTime).getHours() < 12) ||
              // (this.isReturnDepartEvening && new Date(returnDeptTime).getHours() >= 12 && new Date(returnDeptTime).getHours() < 18) ||
              // (this.isReturnDepartNight && new Date(returnDeptTime).getHours() >= 18)) && ((this.isReturnArriveEarlyMorning && new Date(returnArriveTime).getHours() < 6) ||
              // (this.isReturnArriveDay && new Date(returnArriveTime).getHours() >= 6 && new Date(returnArriveTime).getHours() < 12) ||
              // (this.isReturnArriveEvening && new Date(returnArriveTime).getHours() >= 12 && new Date(returnArriveTime).getHours() < 18) ||
              // (this.isReturnArriveNight && new Date(returnArriveTime).getHours() >= 18))
              && this.isAirlinePresent(b[i]) && this.isLayowerAirportPresent(b[i])
              )
             {(<HTMLElement>b[i]).hidden = false;
          } else {
            (<HTMLElement>b[i]).hidden = true;
          }
        }
      
        let div = document.getElementById("searchDiv");
        let hiddenItems = 0;
        for (let i = 0; i < b.length; i++) {
          if (<HTMLElement>b[i].hidden) {
            hiddenItems++;
            if (hiddenItems == b.length) {
              div.style.backgroundImage ="url('assets/imgs/other/empty_state.png')";
              div.style.height = "100%";
              div.style.backgroundPositionX = "center";
              div.style.backgroundPositionY = "center";
            }
          } else {
            div.style.backgroundImage = "url('')";
          }
        }
      }
      console.log(data);
    });
  }

  isAirlinePresent(a) {
    let b = a.getAttribute("data-airlines").split(",");
    let d = false;
    for (let i = 0; i < b.length; i++) {
      console.log(i);
      let c = this.airlines.find(airline => {
        return airline.value == b[i];
      });
      if (c.selected) {
        d = true;
        break;
      }
    }
    return d;
  }

  isLayowerAirportPresent(a) {
    let b = a.getAttribute("data-airlines").split(",");
    if (b.length > 0) {
      let d = false;
      for (let i = 0; i < b.length; i++) {
        let c = this.airlines.find(airline => {
          return airline.value == b[i];
        });
       
        if (c.selected) {
          d = true;
          break;
        }
      }
      return d;
    } else {
      return true;
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  getAirlines(OriginDestinationOption) {
    let airlineFlags = [];
    let airlines = [];
    for (let j = 0; j < OriginDestinationOption.length; j++) {
      if (!airlineFlags[OriginDestinationOption[j].FlightSegment.MarketingAirlineCode]) {
        airlines.push(OriginDestinationOption[j].FlightSegment.MarketingAirlineCode);
      }
      airlineFlags[OriginDestinationOption[j].FlightSegment.MarketingAirlineCode] = true;
    }
    return airlines;
  }

  getLayowerPorts(originDestinationOption) {
    let layowerAirports = [];
    if (originDestinationOption.length > 1) {
      for (let j = 0; j < originDestinationOption.length - 1; j++) {
        layowerAirports.push(originDestinationOption[j].FlightSegment.ArrivalAirportLocationCode);
      }
    }
    return layowerAirports;
  }

 
  selectFlight(flight){
    this.navCtrl.push(FlightDetailTwoWayPage, {
      fromCity: this.fromCity,
      toCity: this.toCity,
      flightInfo: flight,
      departDate: this.departDate,
      returnDate:this.returnDate,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      session_id: this.session_id,
      currencys: this.currencys,
    });
  }
  selectDomesticFlight(filterOne,filterTwo){
    this.navCtrl.push(FlightDomesticDetailsPage, {
      fromCity: this.fromCity,
      toCity: this.toCity,
      filterOne: filterOne,
      filterTwo: filterTwo,
      departDate: this.departDate,
      returnDate:this.returnDate,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      session_id :this.session_id,
      currencys: this.currencys,
    });
  }
}
