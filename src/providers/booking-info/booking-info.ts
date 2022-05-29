import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PROD_TRAWEX_BASE_URL, USER_ID, USER_PASSWORD, ACCESS, IP_ADDRESS, TARGET } from '../constants/constants';
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the BookingInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BookingInfoProvider {

  constructor(public http: HttpClient, public nativeHttp:HTTP) {
    console.log('Hello BookingInfoProvider Provider');
  }

  getMyBookings(jsonObj):Promise<any>{
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + "my_bookings";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp
          .post(url, jsonObj, headers)
          .then(data => {
            if (data.status == 200) {
              console.log(data.data);
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
    
  }

  getTransactions(jsonObj):Promise<any>{
    
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + "get_transactions";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp
          .post(url, jsonObj, headers)
          .then(data => {
            if (data.status == 200) {
              console.log(data.data);
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  getHotelBookingVoucher(bookingId){
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + bookingId;
        this.nativeHttp.get(url,{},{}).then(data => {
          if (data.status == 200) {
            resolve(JSON.parse(data.data));
          } else {
            reject(data.error);
          }
        }).catch(err=>{
          reject(err)
        })
      } catch (err) {
        reject(err);
      }
    });
  }

  getFlightBookingVoucher(sessionId,uniqueId){
    return new Promise((resolve, reject) => {
      try {
        const url = PROD_TRAWEX_BASE_URL + "trip_details?user_id="+USER_ID+"&user_password="+USER_PASSWORD+"&access="+ACCESS+"&ip_address="+IP_ADDRESS+"&target="+TARGET+"&session_id="+sessionId+"&UniqueID="+uniqueId;
        this.nativeHttp.get(url,{},{}).then(data => {
          if (data.status == 200) {
            resolve(JSON.parse(data.data));
          } else {
            reject(data.error);
          }
        }).catch(err=>{
          reject(err)
        })
      } catch (err) {
        reject(err);
      }
    });
  }
}
