import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/';
import { HOTEL_BASE_URL,HOTEL_DEST_URL, APP_HOME_PAGE,HOTEL_MARKUP_URL, HOTEL_BOOKING, HOTEL_USER_ID, HOTEL_USER_PASSWORD, Hotel_ACCESS, HOTEL_IP_ADDRESS } from '../constants/constants';

/*
  Generated class for the HotelsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HotelsProvider {

  constructor(public http: HttpClient, public nativeHttp:HTTP) {
    console.log('Hello HotelsProvider Provider');
  }


  getHotelCitySeach(term): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_DEST_URL + "hotel_dest_check?dest=" + term;
        console.log(url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            console.log(data)
            if (data.status == 200) {
              // console.log(data.data)
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getHotelResults(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL + "hotel_search";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers)
          .then(data => {
            console.log(data)
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
      } catch (err) {
        reject(err);
      }
    });
  }

  sortHotels(jsonObj): Promise<any> {
    console.log(jsonObj)
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL + "filterResults";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp .post(url, jsonObj, headers).then(data => {
            console.log(data)
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
      } catch (err) {
        reject(err);
      }
    });
  }

  moreHotelSearch(sessionId, nextToken,maxResult): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL +"moreResults?user_id=" + HOTEL_USER_ID +
        "&user_password=" +  HOTEL_USER_PASSWORD +
        "&access=" + Hotel_ACCESS +
        "&ip_address=" + HOTEL_IP_ADDRESS +
        "&sessionId=" + sessionId +
        "&nextToken=" + nextToken +
        "&maxResult=" + maxResult;
        this.nativeHttp.get(url, {}, {}).then(data => {
            let data1 = <any>data;
            if (data1 && data1.status == 200) {
              if (JSON.parse(data.data).status.errors) {
                reject(JSON.parse(data.data).status.errors.errorMessage[0]);
              } else {
                resolve(JSON.parse(data.data));
              }
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getSpecificHotelContent(sessionId, hotelId, productId, tokenId): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL + "hotelDetails?sessionId=" + sessionId +
          "&hotelId=" + hotelId + "&productId=" + productId + "&tokenId=" + tokenId;
          console.log(url)
        this.nativeHttp.get(url, {}, {}) .then(data => {
          //  console.log(data.data)
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getRoomOptios(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL + "get_room_rates";
        let headers = {
          "Content-Type": "application/json"
          
        };
        console.log(url,jsonObj)
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log(data.data)
            if (data.status == 200) {
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

  getBookingTerms(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL + "get_rate_rules";
        let headers = {
          "Content-Type": "application/json"
        };
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            if (data.status == 200) {
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

 

  staticContent(from,To, cityName, countryName):Promise<any>{
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL + "static_content?from=" + from +
        "&to=" + To +
        "&user_id=" + HOTEL_USER_ID +
        "&user_password=" + HOTEL_USER_PASSWORD +
        "&access=" +  Hotel_ACCESS +
        "&ip_address=" +  HOTEL_IP_ADDRESS +
        "&city_name=" + cityName +
        "&country_name" + countryName;
        this.nativeHttp.get(url, {}, {}).then(data => {
            if (data.status == 200) {
              console.log(data.data)
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
  getFilterMetaData(sessionId):Promise<any>{
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BASE_URL + "filtersMetaData?sessionId=" + sessionId;
        console.log("filter-hotel",url)
        this.nativeHttp.get(url, {}, {}).then(data => {
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getBooking(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
          const url = HOTEL_BASE_URL + "hotel_book";
        let headers = {
          "Content-Type": "application/json"
        };
        console.log(url,jsonObj)
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log(data.data)
            if (data.status == 200) {
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

 
  getBookingInfo(jsonObj): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = HOTEL_BOOKING + "book";
        let headers = {
          "Content-Type": "application/json"
        };
        console.log(url,jsonObj)
        this.nativeHttp.setDataSerializer("json");
        this.nativeHttp.post(url, jsonObj, headers).then(data => {
            console.log(data.data)
            if (data.status == 200) {
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

 
  getAdminBalance(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const url = APP_HOME_PAGE + "admin_balance" 
          console.log(url)
          this.nativeHttp.get(url, {}, {}) .then(data => {
            console.log(data.data)
            if (data.status == 200) {
              resolve(JSON.parse(data.data));
            } else {
              reject(data.error);
            }
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
  
  // getMarkup(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const url = HOTEL_MARKUP_URL + "hotel_markup" 
  //         console.log(url)
  //         this.nativeHttp.get(url, {}, {}) .then(data => {
  //           console.log(data.data)
  //           if (data.status == 200) {
  //             resolve(JSON.parse(data.data));
  //           } else {
  //             reject(data.error);
  //           }
  //         })
  //         .catch(err => {
  //           reject(err);
  //         });
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  getMarkup():Promise<any[]> {
    return new Promise((resolve) => {
      const url = HOTEL_MARKUP_URL + "hotel_markup";
      console.log('hotel-markup-url',url)
      this.http.get(url).subscribe(data=>{
        let  hotdeals = <any[]>data;
        resolve(hotdeals);       
     });
   });
  }


}



