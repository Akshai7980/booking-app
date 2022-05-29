import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HotelContantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HotelContantsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HotelContantsProvider Provider');
  }

}
// export const ACCESS: string = "Test";
// export const HOLIDAY_USER_ID = "mobileApi234";
// export const HOLIDAY_USER_PASSWORD = "mobileapppwd429";
// export const HOLIDAY_IP_ADDRESS = "106.51.139.16";
// export const HOLIDAY_BASE_URL = "https://travelnext.works/api/holidays/";
// export const CLIENT_NATIONALITY = "IN";
// export const AGENT_ID = "0";
// export const CURRENCY = "INR";