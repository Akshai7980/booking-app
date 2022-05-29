import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Home,APP_HOME_PAGE } from "../constants/constants";
/*
  Generated class for the HotDealsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HotDealsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HotDealsProvider Provider');
  }

  getFlightBanner():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_search_banner/Flights";
      this.http.get(url).subscribe(data=>{
        let  flightBanner = <any[]>data;
        resolve(flightBanner);       
     });
   });
  }
  getHotelBanner():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_search_banner/Hotels";
      this.http.get(url).subscribe(data=>{
        let  hotelBanner = <any[]>data;
        resolve(hotelBanner);       
     });
   });
  }
  getCarBanner():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_search_banner/Cars";
      this.http.get(url).subscribe(data=>{
        let  carBanner = <any[]>data;
        resolve(carBanner);       
     });
   });
  }
  getTransferBanner():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_search_banner/Transfer";
      this.http.get(url).subscribe(data=>{
        let  transferBanner = <any[]>data;
        resolve(transferBanner);       
     });
   });
  }
  getSightBanner():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_search_banner/Sightseeing";
      this.http.get(url).subscribe(data=>{
        let  sightBanner = <any[]>data;
        resolve(sightBanner);       
     });
   });
  }
  getCruiseBanner():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_search_banner/Cruise";
      this.http.get(url).subscribe(data=>{
        let  cruiseBanner = <any[]>data;
        resolve(cruiseBanner);       
     });
   });
  }
  getFlightHotelBanner():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_search_banner/Itinerary";
      this.http.get(url).subscribe(data=>{
        let  flightHotelBanner = <any[]>data;
        resolve(flightHotelBanner);       
     });
   });
  }

  getHotDeals():Promise<any[]> {
    return new Promise((resolve) => {
      const url = APP_HOME_PAGE + "get_app_banner";
      this.http.get(url).subscribe(data=>{
        let  hotdeals = <any[]>data;
        resolve(hotdeals);       
     });
   });
  }
  getSuperOffers():Promise<any[]> {
    return new Promise(resolve => {
      const url = Home + "get_super_offers";
      console.log
      this.http.get(url).subscribe(data => {
        let  superOffer = <any[]>data;
        resolve(superOffer);
      });
    });
  }

  getBestFlightDeals():Promise<any[]> {
    return new Promise(resolve => {
      const url = APP_HOME_PAGE + "get_app_flightdeals";
      this.http.get(url).subscribe(data => {
        let  flightdeals = <any[]>data;
        resolve(flightdeals);
      });
    });
  }

  getBestHotelDeals():Promise<any[]> {
    return new Promise(resolve => {
      const url = APP_HOME_PAGE + "get_app_hoteldeals";
      this.http.get(url).subscribe(data => {
        let  hoteldeals = <any[]>data;
        resolve(hoteldeals);
      });
    });
  }

  getBestSightseeingDeals():Promise<any[]> {
    return new Promise(resolve => {
      const url = APP_HOME_PAGE + "get_app_popular_destinations";
      this.http.get(url).subscribe(data => {
        let  SightseeingDeals = <any[]>data;
        resolve(SightseeingDeals);
      });
    });
  }


}


