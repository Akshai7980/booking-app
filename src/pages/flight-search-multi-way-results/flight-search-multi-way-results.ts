import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from "ionic-angular";
import { FlightsProvider } from "../../providers/flights/flights";
import { NoResultPage } from "../no-result/no-result";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { FlightFilterComponent } from "../../components/flight-filter/flight-filter";
import { FlightDetailMultiWayPage } from "../flight-detail-multi-way/flight-detail-multi-way";
import { IP_ADDRESS, USER_PASSWORD,USER_ID,ACCESS } from "../../providers/constants/constants";

/**
 * Generated class for the FlightSearchMultiWayResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-flight-search-multi-way-results",
  templateUrl: "flight-search-multi-way-results.html"
})
export class FlightSearchMultiWayResultsPage {
  loading;
  destinationDetails = [];
  searchResults = [];
  filteredResults = [];
  destinationOptions = [];
  personDetail;
  flightClass;
  isFlightsPresent: boolean = false;
  maxPrice: number = 0;
  minPrice: number = 0;
  selectedMaxPrice: number = 0;
  selectedMinPrice: number = 0;
  airlines = [];
  selectedFareType: string = "";
  column: string = "PRICE";
  order: number = -1;
  departDescending: boolean = false;
  arriveDescending: boolean = false;
  durationDescending: boolean = false;
  priceDescending: boolean = false;
  FlightAllMarkup;
  FlightAllFix;
  currencys;session_id;
  OriginDestinationInfo = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public flightProvider: FlightsProvider,
    public modalCtrl:ModalController
  ) {
    this.presentLoading();
    this.destinationDetails = this.navParams.get("destinationDetails");
    this.personDetail = this.navParams.get("personDetail");
    this.flightClass = this.navParams.get("flightClass");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.currencys = this.navParams.get("currencys");
    var airportOriginCode= {};
    var airportDestinationCode ={};
    var departureDate;
    for (var j = 0; j < this.destinationDetails.length; j++) {
      airportOriginCode=this.destinationDetails[j].airportOriginCode;
      airportDestinationCode = this.destinationDetails[j].airportDestinationCode;
      departureDate = this.destinationDetails[j].departureDate;
      this.OriginDestinationInfo.push({airportOriginCode:airportOriginCode,
        airportDestinationCode:airportDestinationCode,
       departureDate:this.dateFormatter(departureDate)
      })
    }
    
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
      journeyType: "Circle",
      OriginDestinationInfo: this.OriginDestinationInfo,
    class: this.flightClass,
    adults: this.personDetail.adults,
    childs: this.personDetail.children,
    infants:this.personDetail.infants
    };
    console.log("mysendobj", JSON.stringify(obj));
    this.flightProvider.getFlightResults(obj).then((data) => {
          this.searchResults = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries;
          this.filteredResults = <any[]>data.AirSearchResponse.AirSearchResult.FareItineraries;
          this.session_id =data.AirSearchResponse.session_id
                 console.log("tsData------------",this.filteredResults);
          if (this.filteredResults.length > 0) {
            this.isFlightsPresent = true;
            let price = [];
            let priceFlags = [];
            let airlineFlags = [];
            let airlines = [];
            for (let i = 0; i < this.searchResults.length; i++) {
              this.filteredResults[i].destinationOptions = [];
              console.log(i);
              if (
                this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length == this.destinationDetails.length
              ) {
                let options = [];
                for (let k = 0; k < this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length; k++) {
                  this.filteredResults[i].destinationOptions.push([this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[k]]);
                }
                this.destinationOptions.push(options);
               } else {
                let op = [];
                for (let j = 0;j < this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length; j++) {
                  if (this.destinationDetails[this.filteredResults[i].destinationOptions.length].airportOriginCode == this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.DepartureAirportLocationCode &&
                    this.destinationDetails[this.filteredResults[i].destinationOptions.length].airportDestinationCode == this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
                  ) {
                    this.filteredResults[i].destinationOptions.push([this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j]
                    ]);
                  } else {
                    if (
                      this.destinationDetails[this.filteredResults[i].destinationOptions.length].airportDestinationCode == this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
                    ) {
                      op.push(this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j]);
                      this.filteredResults[i].destinationOptions.push(op);
                      op = [];
                    } else {
                      op.push(this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j]);
                    }
                  }
                }
               }
              if (
                !priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount]
              ) {
                price.push(this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
              }
              priceFlags[ this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount] = true;
  
              if (
                !airlineFlags[ this.searchResults[i].FareItinerary.ValidatingAirlineCode]) {
                airlines.push(this.searchResults[i].FareItinerary.ValidatingAirlineCode);
              }
  
              airlineFlags[this.searchResults[i].FareItinerary.ValidatingAirlineCode] = true;
              // hghghgh
            }
            this.loading.dismiss();
            this.maxPrice = Math.max(...price);
            this.selectedMaxPrice = Math.max(...price);
            this.minPrice = Math.min(...price);
            this.selectedMinPrice = Math.min(...price);
            for (let i = 0; i < airlines.length; i++) {
              this.airlines.push({ value: airlines[i], selected: true });
            }
          } else {
            this.loading.dismiss();
            this.goToNoResultPage();
          }
        })
        .catch(err => {
          if (err == "Invalid Session Id") {
            this.flightProvider.getAuthSession().then(data => {
                console.log(data);
                // this.flightSearch();
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
  

  // flightSearch() {
  //   let fromAirportCodes = "";
  //   let toAirportCodes = "";
  //   let journeyDates = "";
  //   for (let i = 0; i < this.destinationDetails.length; i++) {
  //     fromAirportCodes = fromAirportCodes + this.destinationDetails[i].from.AirportCode;
  //     toAirportCodes = toAirportCodes + this.destinationDetails[i].to.AirportCode;
  //     journeyDates = journeyDates + this.dateFormatter(this.destinationDetails[i].date);
  //     if (i < this.destinationDetails.length - 1) {
  //       fromAirportCodes = fromAirportCodes + "%3Cbr%3E";
  //       toAirportCodes = toAirportCodes + "%3Cbr%3E";
  //       journeyDates = journeyDates + "%3Cbr%3E";
  //     }
  //   }
  //   this.flightProvider.flightSeach("Circle",
  //       fromAirportCodes,
  //       toAirportCodes,
  //       journeyDates,
  //       null,
  //       this.personDetail.adults,
  //       this.personDetail.children,
  //       this.personDetail.infants,
  //       this.flightClass
  //     )
  //     .then(data => {
  //       console.log(data);
  //       this.searchResults = <any[]>data;
  //       this.filteredResults = <any[]>data;

  //       if (this.filteredResults.length > 0) {
  //         this.isFlightsPresent = true;
  //         let price = [];
  //         let priceFlags = [];
  //         let airlineFlags = [];
  //         let airlines = [];

  //         for (let i = 0; i < this.searchResults.length; i++) {
  //           this.filteredResults[i].destinationOptions = [];
  //           console.log(i);
  //           if (
  //             this.searchResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length == this.destinationDetails.length
  //           ) {
  //             let options = [];
  //             for (let k = 0; k < this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length; k++) {
  //               this.filteredResults[i].destinationOptions.push([this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[k]
  //               ]);
  //             }
  //             console.log(i);
  //             this.destinationOptions.push(options);
  //             console.log(i);
  //             //    this.filteredResults[i].destinationOptions=options
  //             console.log(i);
  //           } else {
  //             // let option = [];
  //             let op = [];
  //             for (let j = 0;j < this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption.length; j++) {
  //               if (this.destinationDetails[this.filteredResults[i].destinationOptions.length].from.AirportCode == this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.DepartureAirportLocationCode &&
  //                 this.destinationDetails[this.filteredResults[i].destinationOptions.length].to.AirportCode ==
  //                   this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
  //               ) {
  //                 this.filteredResults[i].destinationOptions.push([this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j]
  //                 ]);
  //               } else {
  //                 if (
  //                   this.destinationDetails[this.filteredResults[i].destinationOptions.length].to.AirportCode ==
  //                   this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j].FlightSegment.ArrivalAirportLocationCode
  //                 ) {
  //                   op.push( this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j]);
  //                   this.filteredResults[i].destinationOptions.push(op);
  //                   op = [];
  //                 } else {
  //                   op.push(this.filteredResults[i].FareItinerary.OriginDestinationOptions[0].OriginDestinationOption[j]);
  //                 }
  //               }
  //             }
  //             console.log(i);
  //             //this.destinationOptions.push(option);
  //             console.log(i);
  //             //  this.filteredResults[i].destinationOptions=option
  //             console.log(i);
  //           }
  //           console.log(i);
  //           if (
  //             !priceFlags[this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount]
  //           ) {
  //             price.push(this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount);
  //           }
  //           priceFlags[ this.searchResults[i].FareItinerary.AirItineraryFareInfo.ItinTotalFares.TotalFare.Amount] = true;

  //           if (
  //             !airlineFlags[ this.searchResults[i].FareItinerary.ValidatingAirlineCode]) {
  //             airlines.push(this.searchResults[i].FareItinerary.ValidatingAirlineCode);
  //           }

  //           airlineFlags[this.searchResults[i].FareItinerary.ValidatingAirlineCode] = true;
  //           // hghghgh
  //         }
  //         this.loading.dismiss();
  //         console.log(this.destinationOptions, this.filteredResults);
  //         this.maxPrice = Math.max(...price);
  //         this.selectedMaxPrice = Math.max(...price);
  //         this.minPrice = Math.min(...price);
  //         this.selectedMinPrice = Math.min(...price);
  //         for (let i = 0; i < airlines.length; i++) {
  //           this.airlines.push({ value: airlines[i], selected: true });
  //         }
  //       } else {
  //         this.loading.dismiss();
  //         this.goToNoResultPage();
  //       }
  //     })
  //     .catch(err => {
  //       if (err == "Invalid Session Id") {
  //         this.flightProvider.getAuthSession().then(data => {
  //             console.log(data);
  //             this.flightSearch();
  //           })
  //           .catch(err => {
  //             this.loading.dismiss();
  //             this.goToNoResultPage();
  //           });
  //       } else {
  //         this.loading.dismiss();
  //         this.goToNoResultPage();
  //       }
  //     });
  // }

  dateFormatter(dateString: string) {
    if (dateString) {
      let date = new Date(dateString);
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + (date.getDate())).slice(-2)
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
    //  console.log("fil", this.airlines);
    let travellersModal = this.modalCtrl.create(
      FlightFilterComponent,
      {
        minPrice: Math.trunc(this.minPrice),
        maxPrice: Math.ceil(this.maxPrice),
        selectedMaxPrice: Math.ceil(this.selectedMaxPrice),
        selectedMinPrice: Math.trunc(this.selectedMinPrice),
        currencys: this.currencys,
        airlines: this.airlines,
        selectedFareType: this.selectedFareType,
        isRoundTrip: false,
        isMultiWay: true
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
        console.log(
          this.selectedFareType,
          this.selectedMaxPrice,
          this.selectedMinPrice,
          this.airlines
        );
        let a = [].slice.call(
          document.querySelectorAll("ion-card[data-faretype]")
        );
        for (let i = 0; i < a.length; i++) {
          let returnArriveTime = (<HTMLElement>a[i]).dataset.returnarrivetime;
          console.log(returnArriveTime);
          if (
            (this.selectedFareType == "" ||
              this.selectedFareType == a[i].dataset.faretype) &&
            (a[i].dataset.price > this.selectedMinPrice &&
              a[i].dataset.price < this.selectedMaxPrice) &&
            this.isAirlinePresent(a[i])
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
    let b = a.getAttribute("data-airlines");

    let c = this.airlines.find(airline => {
      return airline.value == b;
    });
    if (c.selected) {
      return true;
    }
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
    this.navCtrl.push(FlightDetailMultiWayPage, {
      destinationDetails:this.destinationDetails,
      flightInfo: flight,
      personDetail: this.personDetail,
      flightClass: this.flightClass,
      FlightAllMarkup :this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
      currencys:this.currencys,
      session_id:this.session_id
    });
  }
}
