import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ConstantsProvider {
  constructor(public http: HttpClient) {
    console.log("Hello ConstantsProvider Provider");
  }
}

export const APP_DOWNLOAD_LINK ="https://play.google.com/store/apps/details?id=com.booking.travels";
//export const APP_DOWNLOAD_LINK ="https://apps.apple.com/us/app/24x7booking/id1597882041";

export const PRIVACY_POLICY = "https://24x7booking.com.au/privacy-policy";
export const PROD_TRAWEX_LOGIN_URL ="https://24x7booking.com.au/flights/";
export const PROD_PROFILE_IMG_BASE_URL = {
  image: "assets/imgs/other/user.svg"
}

export const PROD_TRAWEX_CURRENCY_URL = "https://24x7booking.com.au/home/";
export const PROD_TRAWEX_MY_PAYMENT_URL = "https://www.walztravels.com/payment/paymentCharge";
export const token = "https://maqqtravel.com/trawex_ios/";

//export const PROD_TRAWEX_BASE_URL = "https://travelnext.works/api/aero/";
export const PROD_TRAWEX_BASE_URL = "https://travelnext.works/api/aero/"
export const FLIGHT_BOOKING_URL ="https://24x7booking.com.au/flights/";
export const FLIGHT_MARKUP_URL ="https://24x7booking.com.au/flights/";
export const IP_ADDRESS: string = "106.51.139.16";
export const ACCESS: string = "Test";
export const TARGET = "Test";
export const USER_ID = "muneerAPI_test";
export const USER_PASSWORD = "muneerAPI_2021";





export const HOTEL_BASE_URL ="https://travelnext.works/api/hotel_trawexv6/";
export const HOTEL_DEST_URL ="https://travelnext.works/api/hotel_projectv6/";
export const HOTEL_USER_ID = "mobileApi234";
export const HOTEL_USER_PASSWORD = "mobileapppwd429";
export const HOTEL_IP_ADDRESS = "106.51.139.16";
export const Hotel_ACCESS: string = "Test";
export const CLIENT_NATIONALITY = "IN";
export const CURRENCY = "EUR";
export const HOTEL_BOOKING = "https://24x7booking.com.au/hotels/";
export const HOTEL_MARKUP_URL ="https://24x7booking.com.au/home/";

export const TRANSFER_IMAGE_BASE ="https://www.hoppa.com/images/vehicle_images/"
export const TRANSFER_BASE_URL ="https://travelnext.works/api/transfer/";
export const TRANSFER_DEST_URL ="https://24x7booking.com.au/transfers_web/";
export const TRANSFER_IP_ADDRESS = "106.51.139.16";
export const TRANSFER_ACCESS = "Test";
export const TRANSFER_USER_ID = "muneer_TestAPI";
export const TRANSFER_USER_PASSWORD = "muneer_TestAPIpwd";


export const CAR_SEARCH_BASE_URL ="https://24x7booking.com.au/cars_trawex/";
export const CAR_BASE_URL= "https://24x7booking.com.au/cars_trawex/";
export const CAR_USER_ID = "muneer_TestAPI";
export const CAR_USER_PASSWORD = "muneer_TestAPIpwd";

export const HOLIDAY_BASE_URL = "https://24x7booking.com.au/holidays_web/";
export const HOLIDAY_DESTINATIONS = "https://24x7booking.com.au/holidays_web/";
export const HOLIDAY_IMG_BASE_URL="http://192.168.1.19/joseph/";
export const HOLIDAY_USER_ID = "muneer_TestAPI";
export const HOLIDAY_USER_PASSWORD = "muneer_TestAPIpwds";
export const HOLIDAY_IP_ADDRESS = "106.51.139.16";



export const Hotel_Image  = "https://travelnext.works/api/public/images/fac_icons_svg/";
export const Home = "https://24x7booking.com.au/home/"
export const APP_HOME_PAGE = "https://24x7booking.com.au/home/"

export const CRUISE_BASE_URL = "https://www.walztravels.com/cruise_web/";
export const CRUISE_USER_ID = "muneer_TestAPI";
export const CRUISE_USER_PASSWORD = "muneer_TestAPIpwd";
export const CRUISE_IP_ADDRESS = "106.51.139.16";
export const CRUISE_ACCESS = "Test";

export const SIGHT_SEEING_BASE_URL = "https://24x7booking.com.au/activity_web/"
export const SIGHT_SEEING_USER_ID = "muneer_TestAPI";
export const SIGHT_SEEING_USER_PASSWORD = "muneer_TestAPIpwd";
export const SIGHT_SEEING_IP_ADDRESS = "106.51.139.16";
export const SIGHT_SEEING_ACCESS = "Test";
export const SIGHT_SEEING_CURRENCY = "EUR";
export const addres = {
  emial:"info@24x7booking.com.au",
  mobile:"+611800958477",
  projectName:"24x7booking"
}