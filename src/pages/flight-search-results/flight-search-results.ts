import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { FlightFilterComponent } from '../../components/flight-filter/flight-filter';
import { FlightsProvider } from '../../providers/flights/flights';
import { NoResultPage } from '../no-result/no-result';
import { SomethingWentWrongPage } from '../something-went-wrong/something-went-wrong';
import { FlightDetailPage } from '../flight-detail/flight-detail';
import { IP_ADDRESS, USER_PASSWORD, USER_ID, ACCESS } from "../../providers/constants/constants";
import { JsonSearchProvider } from "../../providers/json-search/json-search";
/**
 * Generated class for the FlightSearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-search-results',
  templateUrl: 'flight-search-results.html',
})
export class FlightSearchResultsPage {
  fromCity;
  toCity;
  departDate;
  personDetail;
  flightClass;
  searchResults = [];
  filteredResults = [];
  isFlightsPresent = false;
  loading;
  maxPrice: number = 0;
  minPrice: number = 0;
  selectedMaxPrice: number = 0;
  selectedMinPrice: number = 0;
  airlines = [];
  layowerAirports = [];
  totalTravellers=0;
  departDescending: boolean = false;
  arriveDescending: boolean = false;
  durationDescending: boolean = false;
  priceDescending: boolean = false;
  order: number = -1;
  column: string = "PRICE";
  selectedFareType: string = "";
  isZeroStopsSelected: boolean = true;
  isOneStopSelected: boolean = true;
  isTwoStopsSelected: boolean = true;
  isDepartEarlyMorning: boolean = true;
  isDepartDay: boolean = true;sss
  isDepartEvening: boolean = true;
  isDepartNight: boolean = true;
  isArriveEarlyMorning: boolean = true;
  isArriveDay: boolean = true;
  isArriveEvening: boolean = true;
  isArriveNight: boolean = true;
  currencys;
  session_id;
  FlightAllFix;FlightAllMarkup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl:ModalController, 
    public loadingCtrl:LoadingController,
    public flightProvider:FlightsProvider,public jsonSearch:JsonSearchProvider) {
    this.presentLoading();
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.departDate = this.navParams.get("departDate");
    console.log(this.departDate)
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup")
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.currencys = this.navParams.get("currencys");
    console.log("this.currencys ",this.currencys )
    this.totalTravellers =
    this.personDetail.adults +
    this.personDetail.children +
    this.personDetail.infants;
  }

  ionViewDidLoad() {
    this.newFlightSearch();
    // this.flightSearch();
  }

  
  newFlightSearch() {
    let obj = {
      user_id: USER_ID,
      user_password: USER_PASSWORD,
      access: ACCESS,
      ip_address: IP_ADDRESS,
      requiredCurrency: this.currencys.currency,
      journeyType: "OneWay",
      OriginDestinationInfo: [
        {
            departureDate: this.dateFormatter(this.departDate),
            returnDate: "",
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
        this.loading.dismiss();
          this.searchResults = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries;
          this.filteredResults = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries
          this.session_id =data.AirSearchResponse.session_id
          if (this.searchResults.length > 0) {
            this.isFlightsPresent = true;
            let price = [];
            let priceFlags = [];
            let airlineFlags = [];
            let airlines = [];
            let layowerFlags = [];
            let layowerAirports = [];
            for (let i = 0; i < this.searchResults.length; i++) {
              //price calculation
              if (!priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount]
              ) {
                price.push(this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
              }
              priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount] = true;
              //airlines calculation
              for (let j = 0; j < this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length;j++) {
                if (!airlineFlags[ this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
                  ]) {
                  airlines.push(this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
                  );
                }
                airlineFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode] = true;
              }
              //layowerPorts
              if (this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length > 1) {
                for (let j = 0;j <this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length - 1; j++
                ) {
                  if (!layowerFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode ]
                  ) {
                    layowerAirports.push( this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
                    );
                  }
                  layowerFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
                  ] = true;
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
              this.layowerAirports.push({
                value: layowerAirports[i],selected: true
              });
            }
          } else {
            this.isFlightsPresent = false;
            this.goToNoResultPage();
          }
        })
        .catch(err => {
          console.log("search",err)
          if (err == "Invalid Session Id") {
            this.flightProvider.getAuthSession()
              .then(data => {
                console.log(data);
                this.flightSearch();
              })
              .catch(err => {
                console.log("autherr",err)
                this.loading.dismiss();
               this.goToNoResultPage();
              });
          } else {
            console.log("ele",err)
            this.loading.dismiss();
           this.goToNoResultPage();
          }
        });
    }
    
    getAirlineName(airlineCode) {
      return this.jsonSearch.getAirlineName(airlineCode).AirLineName;
    }
    flightSearch() {
      this.flightProvider.flightSeach("OneWay",this.fromCity.AirportCode,this.toCity.AirportCode, this.dateFormatter(this.departDate),null,
          this.personDetail.adults, this.personDetail.children, this.personDetail.infants,this.flightClass).then(data => {
          console.log("flightSearch",data)
          this.searchResults = <any[]>data;
          this.filteredResults = <any[]>data;
          this.loading.dismiss();
          if (this.searchResults.length > 0) {
            this.isFlightsPresent = true;
            let price = [];
            let priceFlags = [];
            let airlineFlags = [];
            let airlines = [];
            let layowerFlags = [];
            let layowerAirports = [];
            for (let i = 0; i < this.searchResults.length; i++) {
              //price calculation
              if (!priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount]
              ) {
                price.push(this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
              }
              priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount] = true;
              //airlines calculation
              for (let j = 0; j < this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length;j++) {
                if (!airlineFlags[ this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
                  ]) {
                  airlines.push(this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
                  );
                }
                airlineFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode] = true;
              }
              //layowerPorts
              if (this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length > 1) {
                for (let j = 0;j <this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length - 1; j++
                ) {
                  if (!layowerFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode ]
                  ) {
                    layowerAirports.push( this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
                    );
                  }
                  layowerFlags[this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
                  ] = true;
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
              this.layowerAirports.push({
                value: layowerAirports[i],selected: true
              });
            }
          } else {
            this.isFlightsPresent = false;
            this.goToNoResultPage();
          }
        })
        .catch(err => {
          console.log("search",err)
          if (err == "Invalid Session Id") {
            this.flightProvider.getAuthSession()
              .then(data => {
                console.log(data);
                this.flightSearch();
              })
              .catch(err => {
                console.log("autherr",err)
                this.loading.dismiss();
                this.goToNoResultPage();
              });
          } else {
            console.log("ele",err)
           this.loading.dismiss();
            this.goToNoResultPage();
          }
        });
    }

    dateFormatter(dateString) {
      console.log(dateString)
      if (dateString) {
      let localTime = dateString.getTime();
      let localOffset = dateString.getTimezoneOffset() * 60000;
      let utc = localTime + localOffset;
      let offset = 5.5;   
      let bombay = utc + (3600000*offset);
      let nd = new Date(bombay); 
       console.log(localTime,localOffset,utc,new Date(utc),bombay,nd)
        // let date = new Date(dateString);
        return (nd.getFullYear() + "-" + ("0" + (nd.getMonth() + 1)).slice(-2) + "-" + ("0" + (nd.getDate() )).slice(-2));
      } else {
        return null;
      }
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
          selectedFareType: this.selectedFareType,
          isRoundTrip:false
        },
        { cssClass: "filterModel" }
      );
      travellersModal.present();
      travellersModal.onDidDismiss(data => {
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
          this.isArriveDay = this.isArriveDay;
          this.isArriveEvening = this.isArriveEvening;
          this.isArriveNight = this.isArriveNight;
          let a = [].slice.call(document.querySelectorAll("ion-card[data-stop]"));
          for (let i = 0; i < a.length; i++) {
            //let b=<HTMLElement>a[i];
            let deptTime = (<HTMLElement>a[i]).dataset.departuretime;
            let arriveTime = (<HTMLElement>a[i]).dataset.aarivalime;
            //  this.isAirlinePresent(a[i]);
            if (
              (this.selectedFareType == "" ||
                this.selectedFareType == a[i].dataset.faretype) &&
              (a[i].dataset.price > this.selectedMinPrice &&
                a[i].dataset.price < this.selectedMaxPrice) &&
              ((this.isZeroStopsSelected && a[i].dataset.stop == 0) ||
                (this.isOneStopSelected && a[i].dataset.stop == 1) ||
                (this.isTwoStopsSelected && a[i].dataset.stop >= 2)) &&
              ((this.isDepartEarlyMorning && new Date(deptTime).getHours() < 6) ||
                (this.isDepartDay &&
                  new Date(deptTime).getHours() >= 6 &&
                  new Date(deptTime).getHours() < 12) ||
                (this.isDepartEvening &&
                  new Date(deptTime).getHours() >= 12 &&
                  new Date(deptTime).getHours() < 18) ||
                (this.isDepartNight && new Date(deptTime).getHours() >= 18)) &&
              ((this.isArriveEarlyMorning &&
                new Date(arriveTime).getHours() < 6) ||
                (this.isArriveDay &&
                  new Date(arriveTime).getHours() >= 6 &&
                  new Date(arriveTime).getHours() < 12) ||
                (this.isArriveEvening &&
                  new Date(arriveTime).getHours() >= 12 &&
                  new Date(arriveTime).getHours() < 18) ||
                (this.isArriveNight && new Date(arriveTime).getHours() >= 18)) &&
              this.isAirlinePresent(a[i]) &&
              this.isLayowerAirportPresent(a[i])
            ) {
              (<HTMLElement>a[i]).hidden = false;
            } else {
              (<HTMLElement>a[i]).hidden = true;
            }
          }
        let div=document.getElementById('searchDiv');
        let hiddenItems=0;
        for(let i=0;i<a.length;i++){
          if(<HTMLElement>a[i].hidden){
            hiddenItems++;
            if(hiddenItems==a.length){
              div.style.backgroundImage = "url('assets/imgs/other/empty_state.png')";
              div.style.height='100%';
              div.style.backgroundPositionX="center";
              div.style.backgroundPositionY="center";
            }
          } else{
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
  
  presentLoading() {
    this.loading = this.loadingCtrl.create({
       spinner: "bubbles",
       content: "Loading Please Wait..."
     // content: '<img src="../assets/imgs/flight-loader-result.gif" width="300"  alt="loading">'+
     //'The Walztravels Explore the world your way with our app for iPhone and Android',
   // spinner: 'hide'
    });

    this.loading.present();
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

  getTotalDuration(stopDetail) {
    let totalTime =
      new Date(stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
      let hour= Math.floor(totalTime / (3600 * 1000));
      let min = (totalTime % (3600 * 1000)) / 60000;
    return (
      ((hour<10?'0':'')+hour) +" hrs " + ((min<10?'0':'')+min) + " mins " );
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

  getAirlines(OriginDestinationOption) {
    let airlineFlags = [];
    let airlines = [];
    for (let j = 0; j < OriginDestinationOption.length; j++) {
      if (!airlineFlags[OriginDestinationOption[j].FlightSegment.MarketingAirlineCode]
      ) {
        airlines.push(OriginDestinationOption[j].FlightSegment.MarketingAirlineCode);
      }

      airlineFlags[ OriginDestinationOption[j].FlightSegment.MarketingAirlineCode] = true;
    }
    return airlines;
  }

  getLayowerPorts(originDestinationOption) {
    let layowerAirports = [];
    if (originDestinationOption.length > 1) {
      for (let j = 0; j < originDestinationOption.length - 1; j++) {
        layowerAirports.push(
          originDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
        );
      }
    }
    return layowerAirports;
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

  goBack(){
    this.navCtrl.pop();
  }

  selectFlight(flight){
    this.navCtrl.push(FlightDetailPage, {
      fromCity: this.fromCity,
      toCity: this.toCity,
      flightInfo: flight,
      departDate: this.departDate,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix: this.FlightAllFix,
      currencys:this.currencys,
      session_id:this.session_id
    });
  }
}
