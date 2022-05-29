import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from "ionic-angular";
import { Hotel_ACCESS, Hotel_Image, HOTEL_USER_ID, HOTEL_USER_PASSWORD, CLIENT_NATIONALITY, HOTEL_IP_ADDRESS } from "../../providers/constants/constants";
import { HotelsProvider } from "../../providers/hotels/hotels";
import { NoResultPage } from "../no-result/no-result";
import { SomethingWentWrongPage } from "../something-went-wrong/something-went-wrong";
import { HotelFilterComponent } from "../../components/hotel-filter/hotel-filter";
import { FlightHotelDetailsPage } from '../flight-hotel-details/flight-hotel-details';
import { HotelCitySearchPage } from "../hotel-city-search/hotel-city-search";


@IonicPage()
@Component({
  selector: 'page-flight-hotel-results',
  templateUrl: 'flight-hotel-results.html',
})
export class FlightHotelResultsPage {
  hotelCity;
  // rooms=[{ adult:1, child:0, child_age:[0], infant:0,infant_age:[],roomSize:1 }];
  rooms;
  loading;currencys;searchResults = [];statusData: any;
  sortingName; maxResult = 20;
  maxPrice: number = 0;
  minPrice: number = 0;
  selectedMaxPrice: number = 0;
  selectedMinPrice: number = 0;
 
  ratingList = [];
  facilityList = [];
  hotelTypeList = [];
  subLocalityList = [];
  tripAdvRateList = [];
  column = "";

  priceDescending: boolean = false;
  ratingDescending: boolean = false;
  nameDescending: boolean = false;
  isFilterData: boolean = false;

  selectedHotel;
  guestCount = 1;
  filterData: any;
  flightInfo;
  pricelist = [];
  totalAdultCount = 0; totalChildCount = 0;totalInfantCount = 0;
  hotelCountry;HotelImage; getNightStayDays;
  fromCity;toCity;departDate;returnDate;personDetail;flightClass;
  hotelAllMarkup;HotelFix;FlightAllMarkup;FlightAllFix;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public hotelProvider:HotelsProvider,
    public modalCtrl:ModalController
  ) {
    this.presentLoading();
    this.hotelCity = this.navParams.get("hotelCity");
    this.hotelCountry =this.navParams.get("hotelCountry");
    this.rooms = this.navParams.get("rooms");
    this.getNightStayDays= this.navParams.get("getNightStayDays");
    this.fromCity = this.navParams.get("fromCity");
    this.toCity = this.navParams.get("toCity");
    this.departDate = this.navParams.get("departDate");
    this.returnDate = this.navParams.get("returnDate");
    this.flightClass = this.navParams.get("flightClass");
    this.currencys = this.navParams.get("currencys");
    this.flightInfo = this.navParams.get("flightInfo");
    this.hotelAllMarkup = this.navParams.get("hotelAllMarkup");
    this.HotelFix = this.navParams.get("HotelFix");
    this.FlightAllMarkup = this.navParams.get("FlightAllMarkup");
    this.FlightAllFix = this.navParams.get("FlightAllFix");
    this.totalAdultCount = this.navParams.get("totalAdultCount");
    this.totalChildCount = this.navParams.get("totalChildCount");
    this.totalInfantCount = this.navParams.get("totalInfantCount");
    this.HotelImage = Hotel_Image;
    
    this.guestCount = 0;
    for (let i = 0; i < this.rooms.length; i++) {
      this.guestCount = this.guestCount + this.rooms[i].roomSize;
    }
  }

  ionViewDidLoad() {
    this.hotelSearch();
  }
 
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Please Wait...",
    });

    this.loading.present();
  }

  goBack() {
    this.navCtrl.pop();
  }
  
  hotelSearch() {
    let obj = {
      user_id: HOTEL_USER_ID,
      user_password: HOTEL_USER_PASSWORD,
      access: Hotel_ACCESS,
      ip_address: HOTEL_IP_ADDRESS,
      requiredCurrency: this.currencys.currency,
      checkin: this.dateFormatter(this.departDate),
      checkout: this.dateFormatter(this.returnDate),
      city_name: this.hotelCity.City,
      client_nationality: CLIENT_NATIONALITY,
      country_name: this.hotelCity.Country,
      radius: 20,
      maxResult: 20,
      occupancy: this.rooms,
    };
    console.log("mysendobj", JSON.stringify(obj));
    this.hotelProvider.getHotelResults(obj).then((data) => {
        this.loading.dismiss();
        if (data.itineraries) {
          this.searchResults = data.itineraries;
          this.statusData = data.status;
          console.log(this.searchResults);
          console.log(this.statusData);
          this.getFilterData();
          this.searchResults.forEach((ans,i) => {
          this.searchResults[i]['face'] =[];
          ans.facilities.forEach((val,index) => {
            var obj ={};
            obj = {name:val,url:this.HotelImage+''+val+'.svg'};
            this.searchResults[i]['face'].push(obj);
          });
      });
    
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
  

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    {
      this.hotelProvider.moreHotelSearch( this.statusData.sessionId, this.statusData.nextToken,this.maxResult).then((data) => {
          if (typeof data.status.error != "undefined")
            this.statusData = data.status;
      
          for (let i = 0; i < data.itineraries.length; i++) {
            this.searchResults.push(data.itineraries[i]);
          }
        
          this.searchResults.forEach((ans,i) => {
            this.searchResults[i]['face'] =[];
            ans.facilities.forEach((val,index) => {
              var obj ={};
              obj ={name:val,url:this.HotelImage+''+val+'.svg'};
              this.searchResults[i]['face'].push(obj);
            });
        });
          console.log(this.searchResults);
          infiniteScroll.complete();
        })
        .catch((err) => {
          console.log(err);
          infiniteScroll.complete();
        });

      // console.log("Async operation has ended");
    }
  }
 
  searchHotelName() {
    this.navCtrl.push(HotelCitySearchPage, { callback: this.gethData });   
   }
   gethData = data => {
     return new Promise<void>((resolve, reject) => {
       if(data){
        this.hotelCity = data;
        console.log("city",this.hotelCity)
       }
       resolve();
       this.getHotelSearchByName(data);
     });
   };

 
   getHotelSearchByName(data):any{
    this.presentLoading();
    let obj = {
      access: Hotel_ACCESS,
      ip_address: HOTEL_IP_ADDRESS,
      user_id: HOTEL_USER_ID,
      user_password: HOTEL_USER_PASSWORD,
      checkin: this.dateFormatter(this.departDate),
      checkout: this.dateFormatter(this.returnDate),
      client_nationality: CLIENT_NATIONALITY,
      requiredCurrency: this.currencys.currency,
      hotelCodes: [data.id],
      latitude: data.latitude,
      longitude: data.longitude,
      radius: 20,
      maxResult: 20,
      occupancy: this.rooms,
    };
    console.log("mysendobj", JSON.stringify(obj));
    this.hotelProvider.getHotelResults(obj).then((data) => {
        this.loading.dismiss();
        if (data.itineraries) {
          this.searchResults = data.itineraries;
          this.statusData = data.status;
          console.log(this.searchResults);
          console.log(this.statusData);
          this.getFilterData();
          this.searchResults.forEach((ans,i) => {
          this.searchResults[i]['face'] =[];
          ans.facilities.forEach((val,index) => {
            var obj ={};
            obj ={name:val,url:this.HotelImage+''+val+'.svg'};
            this.searchResults[i]['face'].push(obj);
          });
      });
    //  console.log("dsifsf", this.searchResults);
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


  getReviewDetail(rate) {
    if (parseFloat(rate) > 4) {
      return "Excellent";
    } else if (parseFloat(rate) > 3) {
      return "Very Good";
    } else if (parseFloat(rate) > 2) {
      return "Average";
    } else if (parseFloat(rate) > 1) {
      return "Worst";
    } else return "Terible";
  }

  getFilterData() {
    this.hotelProvider.getFilterMetaData(this.statusData.sessionId).then((data) => {
        console.log("dfdf", data);
        this.isFilterData = true;
        this.minPrice = data.minPrice;
        this.maxPrice = data.maxPrice;

        for (let i = 0; i < data.facilities.length; i++) {
          this.facilityList.push(data.facilities[i]);
        }
        for (let i = 0; i < data.landmark.length; i++) {
          this.subLocalityList.push(data.landmark[i]);
        }
        for (let i = 0; i < data.propertyType.length; i++) {
          this.hotelTypeList.push(data.propertyType[i]);
        }
      })
      .catch((err) => {
        this.isFilterData = false;
        console.log(err);
      });
  }

  filter() {
    let filterModal = this.modalCtrl.create(
      HotelFilterComponent,
      { 
        minPrice: Math.trunc(this.minPrice),
        maxPrice: Math.ceil(this.maxPrice),
        currency: this.currencys.currency,
        facilityList: this.facilityList,
        hotelTypeList: this.hotelTypeList,
        subLocalityList: this.subLocalityList,
      },
      { cssClass: "filterModel" }
    );
    filterModal.present();
    filterModal.onDidDismiss((data) => {
      console.log("filtdsder", data);
      if (data) {
        this.presentLoading();
        var hotelTypeList = new Array(data.hotelTypeList);
        var property = hotelTypeList.toString();

        var facilityList = new Array(data.facilityList);
        var facility = facilityList.toString();

        var subLocalityList = new Array(data.subLocalityList);
        var loc = subLocalityList.toString();

        var ratingList = new Array(data.hotelRating);
        var rating = ratingList.toString();
        console.log(rating);

        var tripAdvisorRating = new Array(data.tripAdvisorRating);
        var tripAdvisor = tripAdvisorRating.toString();
        console.log(tripAdvisor);

        var fareTypes = new Array(data.fareTypes);
        var faretype = fareTypes.toString();
        console.log(faretype);
        
        this.column = "FILTER";
        let obj = {};
        obj = {
          maxResult: this.searchResults.length,
          sessionId: this.statusData.sessionId,
          filters: {
            price:{
              min: data.price.lower,
              max: data.price.upper
            },
            propertyType: property != "" ? property : undefined,
            facility: facility != "" ? facility : undefined,
            locality: loc != "" ? loc : undefined,
            rating: rating != "" ? rating : undefined,
            tripadvisorRating: tripAdvisor != "" ? tripAdvisor : undefined,
            faretype: faretype != "" ? faretype: undefined
          },
        };
        obj = JSON.parse(JSON.stringify(obj));
        console.log("obj:", obj);
        this.hotelProvider.sortHotels(obj).then((data) => {
            this.statusData = data.status;
            this.searchResults = data.itineraries;
            this.loading.dismiss();
            this.searchResults.forEach((ans,i) => {
              this.searchResults[i]['face'] =[];
              ans.facilities.forEach((val,index) => {
                var obj ={};
                obj ={name:val,url:this.HotelImage+''+val+'.svg'};
                this.searchResults[i]['face'].push(obj);
              });
          });
            if (this.searchResults.length > 0) {
            } else {
              this.goToNoResultPage();
            }
          })
          .catch((err) => {
            this.loading.dismiss();
            this.goToNoResultPage();
            console.log(err);
          });
      }
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

  goToNoWrongPage() {
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(SomethingWentWrongPage).then(() => {
      this.navCtrl.remove(currentIndex);
    });
  }

  sortName() {
    this.presentLoading();
    this.nameDescending = !this.nameDescending;
    if (this.nameDescending) {
      this.sortingName = "alpha-Z-A";
    } else {
      this.sortingName = "alpha-A-Z";
    }
    this.column = "NAME";
    let obj = {
      maxResult: this.searchResults.length,
      sessionId: this.statusData.sessionId,
      filters: {
        sorting: this.sortingName,
      },
    };
    this.hotelProvider.sortHotels(obj).then((data) => {
      this.loading.dismiss();
        console.log(data);
        this.statusData = data.status;
        this.searchResults = data.itineraries;
        this.searchResults.forEach((ans,i) => {
          this.searchResults[i]['face'] =[];
          ans.facilities.forEach((val,index) => {
            var obj ={};
            obj ={name:val,url:this.HotelImage+''+val+'.svg'};
            this.searchResults[i]['face'].push(obj);
          });
      });
      })
      .catch((err) => {
        this.loading.dismiss();
        this.goToNoResultPage();
      });
  }
  sortRating() {
    this.presentLoading();
    this.ratingDescending = !this.ratingDescending;
    if (this.ratingDescending) {
      this.sortingName = "rating-low-high";
    } else {
      this.sortingName = "rating-high-low";
    }
    this.column = "RATING";
    let obj = {
      maxResult: this.searchResults.length,
      sessionId: this.statusData.sessionId,
      filters: {
        sorting: this.sortingName,
      },
    };
    this.hotelProvider.sortHotels(obj).then((data) => {
        this.loading.dismiss();
        this.statusData = data.status;
        this.searchResults = data.itineraries;
        this.searchResults.forEach((ans,i) => {
          this.searchResults[i]['face'] =[];
          ans.facilities.forEach((val,index) => {
            var obj ={};
            obj ={name:val,url:this.HotelImage+''+val+'.svg'};
            this.searchResults[i]['face'].push(obj);
          });
      });
      })
      .catch((err) => {
        this.loading.dismiss();
        this.goToNoResultPage();
      });
  }

  sortPrice() {
    this.presentLoading();
    this.priceDescending = !this.priceDescending;
    if (this.priceDescending) {
      this.sortingName = "price-low-high";
    } else {
      this.sortingName = "price-high-low";
    }
    this.column = "PRICE";
    let obj = {
      maxResult: this.searchResults.length,
      sessionId: this.statusData.sessionId,
      filters: {
        sorting: this.sortingName,
      },
    };
    this.hotelProvider.sortHotels(obj).then((data) => {
        this.loading.dismiss();
        this.statusData = data.status;
        this.searchResults = data.itineraries;
        this.searchResults.forEach((ans,i) => {
          this.searchResults[i]['face'] =[];
          ans.facilities.forEach((val,index) => {
            var obj ={};
            obj ={name:val,url:this.HotelImage+''+val+'.svg'};
            this.searchResults[i]['face'].push(obj);
          });
      });
      })
      .catch((err) => {
        this.loading.dismiss();
        this.goToNoResultPage();
      });
  }
  roundOff(amount){
    var num = amount;
    var n = num.toFixed(2);
    return n
  }
  
  hotelSelected(hotel){
    this.navCtrl.push(FlightHotelDetailsPage,{
      sessionId: this.statusData.sessionId,
      hotelDetail: hotel,
      hotelCity: this.hotelCity,
      rooms: this.rooms,
      searchResults: this.searchResults,
      getNightStayDays:this.getNightStayDays,

      fromCity: this.fromCity,
      toCity: this.toCity,
      departDate: this.departDate,
      returnDate: this.returnDate,
      flightClass: this.flightClass,
      flightInfo: this.flightInfo,
      currencys: this.currencys,
      totalAdultCount:this.totalAdultCount,
      totalChildCount:  this.totalChildCount,
      totalInfantCount:  this.totalInfantCount,
      hotelAllMarkup: this.hotelAllMarkup,
      HotelFix: this.HotelFix,
      FlightAllMarkup: this.FlightAllMarkup,
      FlightAllFix:this.FlightAllFix,
    })
  }

 
 

 
}
