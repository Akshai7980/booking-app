import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { NoResultPage } from "../no-result/no-result";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { FlightFilterComponent } from "../../components/flight-filter/flight-filter";
import { FlightFightDetailPage } from '../flight-fight-detail/flight-fight-detail';
import { HotelsProvider } from "../../providers/hotels/hotels";


/**
 * Generated class for the FlightFlightResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flight-flight-results',
  templateUrl: 'flight-flight-results.html',
})
export class FlightFlightResultsPage {
 rooms;
  currencys;
  fromCity;
  toCity;
  departDate;
  returnDate;
  personDetail;
  flightClass;
  searchResults = [];
  filteredResults = [];
  isFlightsPresent: boolean = false;
  loading;
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
  selectedFareType: string = "";
  sessionId;hotelDetail;hotelContentDetail;hotelCity;getNightStayDays;
  totalAdultCount = 0; totalChildCount = 0;totalInfantCount = 0;
  selectedOption;roomDetails = [];;nightStay;totalPrice;
  hotelAllMarkup;HotelFix;FlightAllMarkup;FlightAllFix;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public flightProvider: FlightsProvider,
    public modalCtrl:ModalController, public hotelProvider:HotelsProvider
  ) {
    this.presentLoading()
    this.sessionId = this.navParams.get("sessionId");
    this.hotelDetail = this.navParams.get("hotelDetail");
    this.hotelContentDetail = this.navParams.get("hotelContentDetail");
    this.hotelCity = this.navParams.get("hotelCity");
    this.selectedOption = this.navParams.get("selectedOption");
    // this.roomDetails = this.navParams.get("roomDetails");
    this.getNightStayDays = this.navParams.get("getNightStayDays");
    this.totalPrice = this.navParams.get("totalPrice");
    this.rooms = this.navParams.get("rooms");

    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.currencys = this.navParams.get("currencys");
    this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
    this.HotelFix = this.navParams.get("HotelFix");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    for (let i = 0; i < this.rooms.length; i++) {
      this.totalAdultCount = this.totalAdultCount + this.rooms[i].adult;
      this.totalChildCount = this.totalChildCount + this.rooms[i].child;
      this.totalInfantCount = this.totalInfantCount + this.rooms[i].infant;
    }
  }

  ionViewDidLoad() {
    this.flightSearch();
   // this.getBookingTerms();
  }

  // getBookingTerms() {
  //   let jsonObj = {sessionId: this.sessionId,productId: this.hotelDetail.productId,
  //     tokenId: this.hotelDetail.tokenId, rateBasisId: this.selectedOption.rateBasisId };
  //   //console.log(jsonObj);
  //   this.hotelProvider.getBookingTerms(jsonObj).then(data => {
  //       console.log("bookingterms data",data);
  //       // this.loading.dismiss();
  //       this.roomDetails = data.roomRates.perBookingRates;

  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait..."
    });

    this.loading.present();
  }

  flightSearch() {
    this.flightProvider
      .flightSeach( "Return",
        this.fromCity.AirportCode,
        this.toCity.AirportCode,
        this.dateFormatter(this.departDate),
        this.dateFormatter(this.returnDate),
        this.totalAdultCount,
        this.totalChildCount,
        this.totalInfantCount,
        this.flightClass
      )
      .then(data => {
        this.searchResults = <any[]>data;
        this.filteredResults = <any[]>data;

        if (this.searchResults.length > 0) {
          this.isFlightsPresent = true;
          let price = [];
          let priceFlags = [];
          let airlineFlags = [];
          let airlines = [];
          let layowerFlags = [];
          let layowerAirports = [];
          this.loading.dismiss();
          for (let i = 0; i < this.searchResults.length; i++) {
            //price calculation
            if (
              !priceFlags[
                this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount
              ]
            ) {
              price.push(
                this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount
              );
            }
            priceFlags[
              this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount
            ] = true;

            //airlines calculation
            for (
              let j = 0;
              j <
              this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length;
              j++
            ) {
              if (
                !airlineFlags[
                  this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
                ]
              ) {
                airlines.push(
                  this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
                );
              }

              airlineFlags[
                this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.MarketingAirlineCode] = true;
            }

            //layowerPorts
            if (
              this.searchResults[i].FareItinerary.OriginDestinationOptions[0]
                .OriginDestinationOption.length > 1
            ) {
              for (
                let j = 0;
                j <
                this.searchResults[i].FareItinerary.OriginDestinationOptions[0]
                  .OriginDestinationOption.length -
                  1;
                j++
              ) {
                if (
                  !layowerFlags[
                    this.searchResults[i].FareItinerary
                      .OriginDestinationOptions[0].OriginDestinationOption[j]
                      .FlightSegment.ArrivalAirportLocationCode
                  ]
                ) {
                  layowerAirports.push(
                    this.searchResults[i].FareItinerary
                      .OriginDestinationOptions[0].OriginDestinationOption[j]
                      .FlightSegment.ArrivalAirportLocationCode
                  );
                }
                layowerFlags[
                  this.searchResults[
                    i
                  ].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[
                    j
                  ].FlightSegment.ArrivalAirportLocationCode
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
              value: layowerAirports[i],
              selected: true
            });
          }
        } else {
          this.isFlightsPresent = false;
          this.loading.dismiss();
          this.goToNoResultPage();
        }
      })
      .catch(err => {
        if (err == "Invalid Session Id") {
          this.flightProvider
            .getAuthSession()
            .then(data => {
              console.log(data);

              this.flightSearch();
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

  dateFormatter(dateString: string) {
    if (dateString) {
      let date = new Date(dateString);
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + (date.getDate() )).slice(-2)
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

  goToNoWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  getTotalDuration(stopDetail) {
    let totalTime =
      new Date(
        stopDetail[stopDetail.length - 1].FlightSegment.ArrivalDateTime
      ).getTime() -
      new Date(stopDetail[0].FlightSegment.DepartureDateTime).getTime();
    return (
      Math.floor(totalTime / (3600 * 1000)) +
      " h " +
      (totalTime % (3600 * 1000)) / 60000 +
      "m"
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
        for (let i = 0; i < a.length; i++) {
          //let b=<HTMLElement>a[i];
          let deptTime = (<HTMLElement>a[i]).dataset.departuretime;
          let arriveTime = (<HTMLElement>a[i]).dataset.aarivalime;
          let returnDeptTime = (<HTMLElement>a[i]).dataset.returndeparturetime;
          let returnArriveTime = (<HTMLElement>a[i]).dataset.returnarrivetime;
          console.log(returnArriveTime);
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
            ((this.isReturnDepartEarlyMorning &&
              new Date(returnDeptTime).getHours() < 6) ||
              (this.isReturnDepartDay &&
                new Date(returnDeptTime).getHours() >= 6 &&
                new Date(returnDeptTime).getHours() < 12) ||
              (this.isReturnDepartEvening &&
                new Date(returnDeptTime).getHours() >= 12 &&
                new Date(returnDeptTime).getHours() < 18) ||
              (this.isReturnDepartNight &&
                new Date(returnDeptTime).getHours() >= 18)) &&
            ((this.isReturnArriveEarlyMorning &&
              new Date(returnArriveTime).getHours() < 6) ||
              (this.isReturnArriveDay &&
                new Date(returnArriveTime).getHours() >= 6 &&
                new Date(returnArriveTime).getHours() < 12) ||
              (this.isReturnArriveEvening &&
                new Date(returnArriveTime).getHours() >= 12 &&
                new Date(returnArriveTime).getHours() < 18) ||
              (this.isReturnArriveNight &&
                new Date(returnArriveTime).getHours() >= 18)) &&
            this.isAirlinePresent(a[i]) &&
            this.isLayowerAirportPresent(a[i])
          ) {
            (<HTMLElement>a[i]).hidden = false;
          } else {
            (<HTMLElement>a[i]).hidden = true;
          }
        }
        console.log(a);
        let div = document.getElementById("searchDiv");
        let hiddenItems = 0;
        for (let i = 0; i < a.length; i++) {
          if (<HTMLElement>a[i].hidden) {
            hiddenItems++;
            if (hiddenItems == a.length) {
              div.style.backgroundImage =
                "url('assets/imgs/other/empty_state.png')";
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
    this.navCtrl.pop()
    ;
  }

  getAirlines(OriginDestinationOption) {
    let airlineFlags = [];
    let airlines = [];
    for (let j = 0; j < OriginDestinationOption.length; j++) {
      if (
        !airlineFlags[
          OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
        ]
      ) {
        airlines.push(
          OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
        );
      }

      airlineFlags[
        OriginDestinationOption[j].FlightSegment.MarketingAirlineCode
      ] = true;
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
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  
  selectFlight(flight){
    this.navCtrl.push(FlightFightDetailPage, {
      sessionId: this.sessionId,
      hotelDetail:this.hotelDetail,
      hotelContentDetail:this.hotelContentDetail,
      hotelCity:this.hotelCity,
      rooms:this.rooms,
      selectedOption:this.selectedOption,
      roomDetails: this.roomDetails,
      nightStay: this.nightStay,
      totalPrice:this.totalPrice,
      getNightStayDays:this.getNightStayDays,
      fromCity: this.fromCity,
      toCity: this.toCity,
      flightInfo: flight,
      departDate: this.departDate,
      returnDate:this.returnDate,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      currencys: this.currencys,
      hotelAllMarkup: this.hotelAllMarkup,
      HotelFix: this.HotelFix,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      totalAdultCount:this.totalAdultCount,
      totalChildCount:  this.totalChildCount,
      totalInfantCount:  this.totalInfantCount,
    });
  }
}
